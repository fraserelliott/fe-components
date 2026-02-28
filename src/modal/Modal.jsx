import { ModalDefaultStyle } from "../styles/modalDefaults";
import { mergeStyle } from "../util/styleUtil";
import "../styles/fe-components.css";
import { useEffect } from "react";

export function Modal({
  open,
  onOpenChange,
  heading,
  style,
  keepMounted,
  children,
  closeOnEscape = true,
  closeOnBackdropClick = true,
}) {
  const userStyle = style ?? {};
  const mergedStyle = mergeStyle(
    ModalDefaultStyle,
    userStyle,
    "ModalDefaultStyle",
  );

  useEffect(() => {
    if (!open || !closeOnEscape) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onOpenChange?.(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, closeOnEscape, onOpenChange]);

  if (!open && !keepMounted) return null;

  return (
    <div
      className={mergedStyle.Overlay()}
      onClick={(e) => {
        if (!closeOnBackdropClick) return;

        if (e.target === e.currentTarget) {
          onOpenChange?.(false);
        }
      }}
    >
      <div className={mergedStyle.Panel()}>
        <div className="fe-d-flex fe-justify-between fe-w-100">
          <div></div>
          {heading !== undefined && (
            <h1 className={mergedStyle.Heading()}>{heading}</h1>
          )}
          <button
            onClick={() => onOpenChange?.(false)}
            className={mergedStyle.BtnPrimary()}
          >
            X
          </button>
        </div>
        <div className="fec-modal-body">
          <div className="fec-modal-body-inner">{children}</div>
        </div>

        <div className="fe-d-flex fe-justify-center">
          <button
            className={mergedStyle.BtnPrimary()}
            onClick={() => onOpenChange?.(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
