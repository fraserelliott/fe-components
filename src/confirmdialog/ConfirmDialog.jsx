import { ConfirmDialogDefaultStyle } from "../styles/confirmDialogDefaults";
import { useState } from "react";

export function ConfirmDialog({
  open,
  onConfirm,
  onCancel,
  onOpenChange,
  heading,
  text,
  onError,
  style,
  keepMounted,
}) {
  if (!open && !keepMounted) return null;

  const [pending, setPending] = useState(false);
  const mergedStyle = { ...ConfirmDialogDefaultStyle, ...(style ?? {}) };

  const handleCancel = async () => {
    try {
      setPending(true);
      await Promise.resolve(onCancel?.());
      setPending(false);
      onOpenChange?.(false, "cancel");
    } catch (err) {
      setPending(false);
      onError?.({ source: "cancel", err });
    }
  };

  const handleConfirm = async () => {
    try {
      setPending(true);
      await Promise.resolve(onConfirm?.());
      setPending(false);
      onOpenChange?.(false, "confirm");
    } catch (err) {
      setPending(false);
      onError?.({ source: "confirm", err });
    }
  };

  return (
    <div className={mergedStyle.Overlay()}>
      <div className={mergedStyle.Panel()}>
        {heading !== undefined && (
          <h1 classList={mergedStyle.Header()}>{heading}</h1>
        )}
        {text !== undefined && <p>{text}</p>}
        <div classList={mergedStyle.ContainerBtn()}>
          <button
            onClick={() => handleCancel()}
            classList={mergedStyle.BtnDanger()}
            disabled={pending}
            aria-busy={pending}
          >
            Cancel
          </button>
          <button
            onClick={() => handleConfirm()}
            classList={mergedStyle.BtnConfirm()}
            disabled={pending}
            aria-busy={pending}
          >
            {pending ? "Working..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
