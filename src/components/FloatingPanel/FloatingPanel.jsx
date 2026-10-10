import { floatingPanelDefaultStyle } from "./floatingpanelDefaultStyle";
import { useFEStyles } from "../../styling/FEStyle";
import { useRef, useEffect } from "react";
import { useFocusManager } from "../FocusManager";

/**
 * Renders a floating panel with optional overlay, focus trapping,
 * and dismissal behaviour.
 *
 * @param {object} props
 * @param {boolean} props.open - Whether the panel is visible.
 * @param {object} [props.style] - Inline style overrides keyed by
 * component slot (e.g. Panel, Overlay, BlurOverlay).
 * @param {object} [props.className] - CSS class overrides keyed by
 * component slot.
 * @param {boolean | "blur"} [props.overlay=false] - Whether to render
 * an overlay. Use true for a transparent overlay or "blur" to blur
 * and darken the background.
 * @param {boolean} [props.trapFocus=false] - Restricts keyboard focus
 * to the panel while open. Supports nested focus traps.
 * @param {React.ReactNode} props.children - Content rendered inside
 * the panel.
 * @param {boolean} [props.closeOnEscape=false] - Requests closure
 * when Escape is pressed. Requires trapFocus to be enabled and
 * the panel to own the active focus trap.
 * @param {boolean} [props.closeOnOverlayClick=false] - Requests
 * closure when the overlay itself is clicked. Has no effect
 * when overlay is false.
 * @param {(open: boolean) => void} [props.onOpenChange] - Called
 * when the panel requests a change to its open state.
 * The parent is responsible for updating the open prop.
 */
export function FloatingPanel({
  open,
  style,
  className,
  overlay = false,
  trapFocus = false,
  children,
  closeOnEscape = false,
  closeOnOverlayClick = false,
  onOpenChange,
}) {
  const { styleComponent } = useFEStyles(
    floatingPanelDefaultStyle,
    style,
    className,
  );

  if (!open) return null;

  const panel = (
    <FloatingPanelInner
      open={open}
      style={style}
      className={className}
      trapFocus={trapFocus}
      closeOnEscape={closeOnEscape}
      onOpenChange={onOpenChange}
    >
      {children}
    </FloatingPanelInner>
  );

  if (!overlay) return panel;

  return (
    <div
      {...styleComponent(overlay === "blur" ? "BlurOverlay" : "Overlay")}
      onClick={(e) => {
        if (closeOnOverlayClick && e.target === e.currentTarget)
          onOpenChange?.(false);
      }}
    >
      {panel}
    </div>
  );
}

function FloatingPanelInner({
  open,
  style,
  className,
  children,
  trapFocus = false,
  closeOnEscape,
  onOpenChange,
}) {
  const { styleComponent } = useFEStyles(
    floatingPanelDefaultStyle,
    style,
    className,
  );
  const { trapComponent, untrapComponent, isTopmost } = useFocusManager();
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open || !closeOnEscape || !trapFocus) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isTopmost(panelRef.current)) {
        onOpenChange?.(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, closeOnEscape, trapFocus, isTopmost, onOpenChange]);

  useEffect(() => {
    if (!open || !trapFocus) return;

    const element = panelRef.current;
    if (!element) return;

    trapComponent(element);

    return () => untrapComponent(element);
  }, [open, trapFocus, trapComponent, untrapComponent]);

  return (
    <div
      ref={panelRef}
      tabIndex={trapFocus ? -1 : undefined}
      {...styleComponent("Panel")}
    >
      {children}
    </div>
  );
}
