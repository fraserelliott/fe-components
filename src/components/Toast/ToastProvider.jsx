import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useContext,
} from "react";
import { v4 as uuid } from "uuid";

const ToastContext = createContext();

/**
 * Provides toast notification state and controls to descendant components.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components that can access the toast context.
 * @param {number} [props.fadeMs=150] - Duration of the toast fade-out animation in milliseconds.
 * @param {number} [props.defaultDelayMs=2350] - Default time in milliseconds before a toast begins dismissing.
 * @returns {React.JSX.Element}
 */
export function ToastProvider({
  children,
  fadeMs = 150,
  defaultDelayMs = 2350,
}) {
  const [toastMessages, setToastMessages] = useState([]);

  // Track timers by toast id so we can cancel them later (click-to-dismiss)
  const fadeStartTimersRef = useRef(new Map()); // id -> timeoutId
  const removeTimersRef = useRef(new Map()); // id -> timeoutId

  useEffect(() => {
    return () => {
      for (const t of fadeStartTimersRef.current.values())
        window.clearTimeout(t);
      for (const t of removeTimersRef.current.values()) window.clearTimeout(t);
      fadeStartTimersRef.current.clear();
      removeTimersRef.current.clear();
    };
  }, []);

  const clearTimersFor = useCallback((id) => {
    const fadeStartTimer = fadeStartTimersRef.current.get(id);
    if (fadeStartTimer != null) {
      window.clearTimeout(fadeStartTimer);
      fadeStartTimersRef.current.delete(id);
    }

    const removeTimer = removeTimersRef.current.get(id);
    if (removeTimer != null) {
      window.clearTimeout(removeTimer);
      removeTimersRef.current.delete(id);
    }
  }, []);

  const startFadeAndScheduleRemove = useCallback(
    (id) => {
      // Mark fading (idempotent)
      setToastMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, fading: true } : msg)),
      );

      // Schedule removal
      clearTimersFor(id);
      const removeTimer = window.setTimeout(() => {
        setToastMessages((prev) => prev.filter((msg) => msg.id !== id));
        removeTimersRef.current.delete(id);
      }, fadeMs);

      removeTimersRef.current.set(id, removeTimer);
    },
    [fadeMs, clearTimersFor],
  );

  const dismissToast = useCallback(
    (id) => {
      // If already removed, do nothing
      // If present, cancel pending timers and run fade/removal sequence
      startFadeAndScheduleRemove(id);
    },
    [startFadeAndScheduleRemove],
  );

  /**
   * Adds a toast notification with an optional dismissal delay.
   *
   * @param {string} message - Message to display.
   * @param {string} type - Toast type. "success" and "error" have dedicated styling; any other string uses the default appearance.
   * @param {number} [delayMs=defaultDelayMs] - Time in milliseconds before automatic dismissal.
   */
  const addToastMessage = useCallback(
    (message, type, delayMs = defaultDelayMs) => {
      const id = uuid();
      setToastMessages((prev) => [
        ...prev,
        { id, message, type, fading: false },
      ]);

      // Schedule fade start after delay
      clearTimersFor(id);
      const fadeStartTimer = window.setTimeout(() => {
        startFadeAndScheduleRemove(id);
        fadeStartTimersRef.current.delete(id);
      }, delayMs);

      fadeStartTimersRef.current.set(id, fadeStartTimer);

      return id;
    },
    [defaultDelayMs, clearTimersFor, startFadeAndScheduleRemove],
  );

  const value = useMemo(
    () => ({ toastMessages, addToastMessage, dismissToast }),
    [toastMessages, addToastMessage, dismissToast],
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (ctx === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}
