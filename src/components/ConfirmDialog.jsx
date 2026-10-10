import { FloatingPanel } from "./FloatingPanel/FloatingPanel";
import { useFEStyles } from "../styling/FEStyle";
import { defaultStyles } from "../styling/defaultStyle";
import { sx, utilities } from "@fraserelliott/fe-utilities";
import { useState } from "react";

export function ConfirmDialog({
  open,
  style = {},
  className = {},
  overlay = "blur",
  trapFocus = true,
  noAnim = false,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  heading,
  text,
  onConfirm,
  onCancel,
  onOpenChange,
  closeOnEscape,
}) {
  const { styleComponent } = useFEStyles(
    defaultStyles,
    style,
    className,
    noAnim,
  );

  const [pending, setPending] = useState(false);

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

  const overrides = {
    Overlay: { zIndex: "var(--fec-z-dialog, 200)" },
    BlurOverlay: { zIndex: "var(--fec-z-dialog, 200)" },
    Panel: utilities["fe-gap-3"],
  };

  return (
    <FloatingPanel
      open={open}
      style={sx(overrides, style)}
      className={className}
      overlay={overlay}
      trapFocus={trapFocus}
      onOpenChange={() => handleCancel()}
      closeOnEscape={closeOnEscape}
    >
      {heading && (
        <h1 {...styleComponent("Heading", utilities["fe-text-center"])}>
          {heading}
        </h1>
      )}
      {text && (
        <p {...styleComponent("TextPrimary", utilities["fe-grow-1"])}>{text}</p>
      )}
      <div
        style={sx(
          utilities["fe-d-flex"],
          utilities["fe-justify-around"],
          utilities["fe-w-100"],
        )}
      >
        <button
          {...styleComponent("BtnDanger")}
          onClick={() => handleCancel()}
          disabled={pending}
        >
          {cancelLabel}
        </button>
        <button
          {...styleComponent("BtnConfirm")}
          onClick={() => handleConfirm()}
          disabled={pending}
        >
          {pending ? "Working..." : confirmLabel}
        </button>
      </div>
    </FloatingPanel>
  );
}
