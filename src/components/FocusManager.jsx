import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";

const FocusManagerContext = createContext(undefined);

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

export function FocusManagerProvider({ children }) {
  const stack = useRef([]);

  const getTopmost = useCallback(() => {
    return stack.current.at(-1);
  }, []);

  const isTopmost = useCallback(
    (element) => {
      return getTopmost()?.element === element;
    },
    [getTopmost],
  );

  /**
   * Registers an element with the focus manager to trap keyboard focus within it.
   *
   * @param {HTMLElement} element - DOM element within which focus should be trapped.
   */
  const trapComponent = useCallback((element) => {
    if (!element) return;

    // Prevent duplicate registrations.
    if (stack.current.some((entry) => entry.element === element)) {
      return;
    }

    const previousFocus = document.activeElement;

    stack.current.push({ element, previousFocus });

    const first = element.querySelector(focusableSelector);
    (first ?? element).focus();
  }, []);

  /**
   * Removes an element from the focus manager's keyboard focus trapping.
   *
   * @param {HTMLElement} element - DOM element within which focus should no longer be trapped.
   */
  const untrapComponent = useCallback((element) => {
    const index = stack.current.findIndex((entry) => entry.element === element);

    if (index === -1) return;

    const [entry] = stack.current.splice(index, 1);

    // Only restore focus when removing the active trap.
    if (index === stack.current.length) {
      if (entry.previousFocus?.isConnected) {
        entry.previousFocus.focus();
      }
    }
  }, []);

  useEffect(() => {
    function getFocusable(element) {
      return [...element.querySelectorAll(focusableSelector)].filter(
        (el) => el.getClientRects().length > 0 && !el.closest("[inert]"),
      );
    }

    function handleKeyDown(event) {
      if (event.key !== "Tab") return;

      const topmost = getTopmost();
      if (!topmost) return;

      const { element } = topmost;
      const focusable = getFocusable(element);

      if (!focusable.length) {
        event.preventDefault();
        element.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable.at(-1);
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !element.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !element.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    }

    function handleFocusIn(event) {
      const topmost = getTopmost();
      if (!topmost) return;

      const { element } = topmost;

      if (!element.contains(event.target)) {
        const first = getFocusable(element)[0];
        (first ?? element).focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocusIn);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, [getTopmost]);

  return (
    <FocusManagerContext.Provider
      value={{ trapComponent, untrapComponent, isTopmost }}
    >
      {children}
    </FocusManagerContext.Provider>
  );
}

export function useFocusManager() {
  const ctx = useContext(FocusManagerContext);
  if (ctx === undefined) {
    throw new Error(
      "useFocusManager must be used within a FocusManagerProvider",
    );
  }
  return ctx;
}
