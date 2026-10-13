import { useCallback, createContext, useContext, useMemo } from "react";

const ApiContext = createContext(undefined);

/**
 * Provides API request helpers and centralised error handling to descendant components.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components that can access the API context.
 * @param {(err: any, fallbackMsg?: string) => void} [props.onError] - Default error handler when a request has no error override.
 * @param {(err: any) => void} [props.onUnauthorised] - Handles HTTP 401 errors, taking precedence over other error handlers unless explicitly disabled.
 * @returns {React.JSX.Element}
 */
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

  /**
   * Executes an API request and invokes callbacks based on its result.
   *
   * @param {Promise<{data: any}>} promise - API request promise.
   * @param {(data: any) => void} [onSuccess] - Callback invoked with the response data on success.
   * @param {string} [fallbackMsg] - Fallback error message passed to the provider's default error handler.
   * @param {(err: any) => void} [onErrorOverride] - Request-specific error handler that overrides the provider's default handler, but not its 401 handler.
   * @returns {Promise<any|null>} Response data on success, or null on failure.
   */
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

  /**
   * Executes an API request and transforms its success or error result.
   *
   * @param {Promise<{data: any}>} promise - API request promise.
   * @param {(data: any) => any} [successTransform] - Transforms the response data on success.
   * @param {(err: any) => any} [errorTransform] - Transforms the error on failure. Defaults to returning the original error.
   * @param {boolean} [handleUnauthorised=true] - Whether to invoke the provider's 401 handler when available.
   * @returns {Promise<any>} The transformed result, original data or error, or null if a 401 was handled.
   */
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
