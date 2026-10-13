import { useCallback, createContext, useContext, useMemo } from "react";

const ApiContext = createContext(undefined);

export function ApiProvider({ children, onError, onUnauthorised }) {
  const tryHandleUnauthorised = useCallback(
    (err) => {
      if (err?.response?.status !== 401 || !onUnauthorised) {
        return false;
      }

      onUnauthorised(err);
      return true;
    },
    [onUnauthorised],
  );

  const runApiCallback = useCallback(
    async (promise, onSuccess, fallbackMsg, onErrorOverride) => {
      let data;

      try {
        ({ data } = await promise);
      } catch (err) {
        if (tryHandleUnauthorised(err)) return null;
        if (onErrorOverride) {
          onErrorOverride(err);
        } else {
          onError?.(err, fallbackMsg);
        }

        return null;
      }

      onSuccess?.(data);
      return data;
    },
    [tryHandleUnauthorised],
  );

  const runApiTransform = useCallback(
    async (
      promise,
      successTransform,
      errorTransform,
      handleUnauthorised = true,
    ) => {
      let data;

      try {
        ({ data } = await promise);
      } catch (err) {
        if (handleUnauthorised && tryHandleUnauthorised(err)) return null;
        return errorTransform ? errorTransform(err) : err;
      }

      return successTransform ? successTransform(data) : data;
    },
    [tryHandleUnauthorised],
  );

  const value = useMemo(
    () => ({
      runApiCallback,
      runApiTransform,
    }),
    [runApiCallback, runApiTransform],
  );

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export function useApi() {
  const ctx = useContext(ApiContext);
  if (ctx === undefined) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return ctx;
}
