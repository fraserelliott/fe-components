import { useState, useRef, useEffect } from "react";
import { sx, utilities } from "@fraserelliott/fe-utilities";
import { useFEStyles } from "../styling/FEStyle";
import { defaultStyles } from "../styling/defaultStyle";

/**
 * Renders a context menu with configurable items and styling.
 *
 * The menu is displayed in a portal and positioned relative to the viewport.
 * Its z-index can be adjusted relative to the owning element to ensure it
 * appears above that element without interfering with higher-priority dialogs.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Element that triggers the context menu.
 * @param {Array<{label: string, onClick: Function}>} props.items - Menu items to display.
 * @param {Object} [props.style={}] - Slot-based inline style overrides.
 * @param {Object} [props.className={}] - Slot-based CSS class overrides.
 * @param {number|string} [props.ownerZIndex] - Z-index of the owning element. The menu renders 10 levels above this value, or uses the default context menu z-index when omitted.
 * @returns {React.JSX.Element} The context menu component.
 */
export default function ContextMenu({
  children,
  items,
  style,
  className,
  ownerZIndex,
}) {
  const [contextMenu, setContextMenu] = useState(null);
  const menuRef = useRef(null);

  const menuZIndex =
    ownerZIndex == null
      ? "var(--fec-z-context-menu, 25)"
      : `calc(${ownerZIndex} + 10)`;

  const overrides = {
    inline: {
      Menu: sx(
        utilities["fe-d-flex"],
        utilities["fe-flex-column"],
        utilities["fe-pos-fixed"],
        {
          zIndex: menuZIndex,
        },
      ),
    },
  };

  const { styleComponent } = useFEStyles(
    sx(defaultStyles, overrides),
    style,
    className,
  );

  useEffect(() => {
    if (!contextMenu) return;

    const handleOutsideClick = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setContextMenu(null);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setContextMenu(null);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [contextMenu]);

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setContextMenu({
          x: e.clientX,
          y: e.clientY,
        });
      }}
    >
      {children}
      {contextMenu && items && (
        <div
          ref={menuRef}
          {...styleComponent("Menu", {
            left: contextMenu.x,
            top: contextMenu.y,
          })}
        >
          {items.map((item) => (
            <span
              key={item.label}
              onClick={() => {
                item.onClick?.();
                setContextMenu(null);
              }}
              style={{ padding: "0.5em" }}
            >
              {item.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
