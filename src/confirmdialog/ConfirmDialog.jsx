import { ConfirmDialogDefaultStyle } from "../styles/confirmDialogDefaults";
import { useState } from "react";
import { mergeStyle } from "../util/styleUtil";
import "@fraserelliott/fe-components/stylesheet";

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

  const userStyle = style ?? {};
  const mergedStyle = mergeStyle(
    ConfirmDialogDefaultStyle,
    userStyle,
    "ConfirmDialogDefaultStyle",
  );

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
          <h1 className={mergedStyle.Heading()}>{heading}</h1>
        )}
        <p className="fe-grow-1">{text !== undefined && <span>{text}</span>}</p>
        <div className={mergedStyle.ContainerBtn()}>
          <button
            onClick={() => handleCancel()}
            className={mergedStyle.BtnDanger()}
            disabled={pending}
            aria-busy={pending}
          >
            Cancel
          </button>
          <button
            onClick={() => handleConfirm()}
            className={mergedStyle.BtnConfirm()}
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
