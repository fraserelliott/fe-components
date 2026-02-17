import { createContext, useState, useCallback, useMemo, useRef } from "react";
import { v4 as uuid } from "uuid";

const ToastContext = createContext();

export function ToastProvider({
  children,
  fadeMs = 150,
  defaultDelayMs = 2350,
}) {
  const [toastMessages, setToastMessages] = useState([]);

  // Track timers by toast id so we can cancel them later (click-to-dismiss)
  const fadeStartTimersRef = useRef(new Map()); // id -> timeoutId
  const removeTimersRef = useRef(new Map()); // id -> timeoutId

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
