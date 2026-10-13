import { FloatingPanel } from "./FloatingPanel";
import { useFEStyles } from "../styling/FEStyle";
import { defaultStyles } from "../styling/defaultStyle";
import { sx, utilities } from "@fraserelliott/fe-utilities";
import { useState } from "react";

/**
 * Renders a confirmation dialog with configurable actions, optional overlay,
 * and focus trapping. Supports asynchronous confirm and cancel callbacks,
 * keeping the dialog open while an action is pending.
 *
 * @param {Object} props
 * @param {boolean} props.open - Whether the dialog is visible.
 * @param {Object} [props.style={}] - Slot-based inline style overrides.
 * @param {Object} [props.className={}] - Slot-based CSS class overrides.
 * @param {boolean|"blur"} [props.overlay="blur"] - Whether to display an overlay.
 *   Use "blur" for a blurred backdrop, true for a transparent blocking overlay,
 *   or false for no overlay.
 * @param {boolean} [props.trapFocus=true] - Whether to trap keyboard focus within the dialog.
 * @param {boolean} [props.noAnim=false] - Whether to disable default animations.
 * @param {string} [props.cancelLabel="Cancel"] - Label for the cancel button.
 * @param {string} [props.confirmLabel="Confirm"] - Label for the confirm button.
 * @param {React.ReactNode} [props.heading] - Dialog heading.
 * @param {React.ReactNode} [props.text] - Dialog message or description.
 * @param {() => void|Promise<void>} [props.onConfirm] - Called when confirmation is requested.
 *   Supports asynchronous operations.
 * @param {() => void|Promise<void>} [props.onCancel] - Called when cancellation is requested.
 *   Supports asynchronous operations.
 * @param {(open: boolean, reason?: string) => void} [props.onOpenChange] - Called when
 *   the dialog requests a change to its open state.
 * @param {boolean} [props.closeOnEscape=false] - Whether pressing Escape
 *   requests cancellation.
 * @param {boolean} [props.closeOnOverlayClick=false] - Whether clicking
 *   the overlay requests cancellation.
 */
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
  closeOnOverlayClick,
  draggable = false,
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

  const noOverlayPosition = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const dialogZIndex = "var(--fec-z-dialog, 200)";

  const overrides = {
    inline: {
      Overlay: { zIndex: dialogZIndex },
      BlurOverlay: { zIndex: dialogZIndex },
      Panel: sx(
        utilities["fe-gap-3"],
        { zIndex: dialogZIndex },
        !overlay && noOverlayPosition,
      ),
    },
  };

  return (
    <FloatingPanel
      open={open}
      style={style}
      defaultStyle={overrides}
      className={className}
      overlay={overlay}
      trapFocus={trapFocus}
      onOpenChange={() => handleCancel()}
      closeOnEscape={closeOnEscape}
      closeOnOverlayClick={closeOnOverlayClick}
      draggable={draggable}
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
