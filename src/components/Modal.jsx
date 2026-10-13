import { FloatingPanel } from "./FloatingPanel";
import { useFEStyles } from "../styling/FEStyle";
import { defaultStyles } from "../styling/defaultStyle";
import { sx, utilities } from "@fraserelliott/fe-utilities";

/**
 * Renders a modal dialog with configurable close buttons, optional overlay,
 * focus trapping, and support for arbitrary React content.
 *
 * @param {Object} props
 * @param {boolean} props.open - Whether the modal is visible.
 * @param {Object} [props.style={}] - Slot-based inline style overrides.
 * @param {Object} [props.className={}] - Slot-based CSS class overrides.
 * @param {boolean|"blur"} [props.overlay="blur"] - Whether to display an overlay.
 *   Use "blur" for a blurred backdrop, true for a transparent blocking overlay,
 *   or false for no overlay.
 * @param {boolean} [props.trapFocus=true] - Whether to trap keyboard focus within the modal.
 * @param {boolean} [props.noAnim=false] - Whether to disable default animations.
 * @param {React.ReactNode} [props.heading] - Modal heading.
 * @param {boolean} [props.closeOnEscape=false] - Whether pressing Escape requests closure.
 * @param {boolean} [props.closeOnOverlayClick=false] - Whether clicking the overlay requests closure.
 * @param {(open: boolean) => void} [props.onOpenChange] - Called when the modal requests
 *   a change to its open state.
 * @param {false|"corner"|"bottom"|"both"} [props.showCloseButtons="both"] -
 *   Determines which close buttons are displayed, or false to hide both.
 * @param {boolean} [props.disableCloseButtons=false] - Whether to disable the
 *   close buttons without hiding them. Does not disable Escape or overlay dismissal.
 * @param {React.ReactNode} [props.children] - Content rendered inside the modal body.
 */
export function Modal({
  open,
  style = {},
  className = {},
  overlay = "blur",
  trapFocus = true,
  noAnim = false,
  heading,
  closeOnEscape = false,
  closeOnOverlayClick = false,
  onOpenChange,
  showCloseButtons = "both",
  disableCloseButtons = false,
  draggable = false,
  children,
}) {
  const { styleComponent } = useFEStyles(
    defaultStyles,
    style,
    className,
    noAnim,
  );

  const noOverlayPosition = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const modalZIndex = "var(--fec-z-modal, 100)";

  const overrides = {
    inline: {
      Overlay: { zIndex: modalZIndex },
      BlurOverlay: { zIndex: modalZIndex },
      Panel: sx(
        utilities["fe-p-2"],
        {
          width: "var(--fec-modal-w, clamp(320px, 80vw, 1536px))",
          height: "var(--fec-modal-h, clamp(240px, 80vh, 864px))",
          maxWidth: "90vw",
          maxHeight: "90vh",
          zIndex: modalZIndex,
        },
        !overlay && noOverlayPosition,
      ),
    },
  };

  const renderCornerBtn =
    showCloseButtons === "both" || showCloseButtons === "corner";
  const renderBottomBtn =
    showCloseButtons === "both" || showCloseButtons === "bottom";

  return (
    <FloatingPanel
      open={open}
      defaultStyle={overrides}
      style={style}
      className={className}
      overlay={overlay}
      trapFocus={trapFocus}
      onOpenChange={onOpenChange}
      closeOnEscape={closeOnEscape}
      closeOnOverlayClick={closeOnOverlayClick}
      draggable={draggable}
    >
      <div
        style={sx(
          utilities["fe-d-flex"],
          utilities["fe-justify-between"],
          utilities["fe-w-100"],
        )}
      >
        <div />
        {heading != null && <h1 {...styleComponent("Heading")}>{heading}</h1>}
        <div>
          {renderCornerBtn && (
            <button
              {...styleComponent("BtnPrimary")}
              onClick={() => onOpenChange?.(false)}
              disabled={disableCloseButtons}
            >
              X
            </button>
          )}
        </div>
      </div>
      <div
        style={{ flex: "1 1 auto", minWidth: 0, minHeight: 0, width: "100%" }}
      >
        <div {...styleComponent("ModalInner")}>{children}</div>
      </div>
      {renderBottomBtn && (
        <div style={sx(utilities["fe-d-flex"], utilities["fe-justify-center"])}>
          <button
            {...styleComponent("BtnPrimary")}
            onClick={() => onOpenChange?.(false)}
            disabled={disableCloseButtons}
          >
            Close
          </button>
        </div>
      )}
    </FloatingPanel>
  );
}
