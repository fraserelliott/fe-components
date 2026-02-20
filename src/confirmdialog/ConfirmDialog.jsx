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
  const userStyle = props.style ?? {};

  const style = { ...ConfirmDialogDefaultStyle };
  for (const key of Object.keys(userStyle)) {
    style[key] = cx(ConfirmDialogDefaultStyle[key], userStyle[key]);
  }

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
    <div className={style.Overlay()}>
      <div className={style.Panel()}>
        {heading !== undefined && <h1 classList={style.Header()}>{heading}</h1>}
        {text !== undefined && <p>{text}</p>}
        <div classList={style.ContainerBtn()}>
          <button
            onClick={() => handleCancel()}
            classList={style.BtnDanger()}
            disabled={pending}
            aria-busy={pending}
          >
            Cancel
          </button>
          <button
            onClick={() => handleConfirm()}
            classList={style.BtnConfirm()}
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
