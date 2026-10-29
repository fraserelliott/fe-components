import { useFEStyles } from "../styling/FEStyle";

export function ToggleButton({
  children,
  inactiveStyleSlot = "BtnPrimary",
  activeStyleSlot = "ToggleBtnPrimary",
  onToggle,
  style = {},
  className = "",
  active,
  disabled = false,
}) {
  const { styleComponent } = useFEStyles();

  const toggle = () => {
    onToggle?.(!active);
  };

  return (
    <button
      onClick={toggle}
      {...styleComponent(
        active ? activeStyleSlot : inactiveStyleSlot,
        style,
        className,
      )}
      disabled={disabled}
      aria-pressed={active}
      type="button"
    >
      {children}
    </button>
  );
}
