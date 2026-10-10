import { floatingPanelDefaultStyle } from "./floatingpanelDefaultStyle";
import { useFEStyles } from "../../styling/FEStyle";
import { useRef, useEffect } from "react";
import { useFocusManager } from "../FocusManager";

export function FloatingPanel({
  open,
  style,
  className,
  overlay = false,
  trapFocus = false,
  children,
}) {
  const { styleComponent } = useFEStyles(floatingPanelDefaultStyle);

  if (!open) return null;

  const panel = (
    <FloatingPanelInner
      open={open}
      style={style}
      className={className}
      trapFocus={trapFocus}
    >
      {children}
    </FloatingPanelInner>
  );

  if (!overlay) return panel;

  return (
    <div
      {...styleComponent(
        overlay === "blur" ? "BlurOverlay" : "Overlay",
        style,
        className,
      )}
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
}) {
  const { styleComponent } = useFEStyles(floatingPanelDefaultStyle);
  const { trapComponent, untrapComponent } = useFocusManager();
  const panelRef = useRef(null);

  useEffect(() => {
    if (!trapFocus) return;

    const element = panelRef.current;

    trapComponent(element);

    return () => untrapComponent(element);
  }, [trapFocus, trapComponent, untrapComponent, open]);

  return (
    <div
      ref={panelRef}
      tabIndex={trapFocus ? -1 : undefined}
      {...styleComponent("Panel", style, className)}
    >
      {children}
    </div>
  );
}
