import { createPortal } from "react-dom";

export function OptionalPortal({ children, portalTarget }) {
  if (!portalTarget) return children;

  const target =
    portalTarget === true
      ? typeof document !== "undefined"
        ? document.body
        : null
      : portalTarget;

  if (!target) return children;

  return createPortal(children, target);
}
