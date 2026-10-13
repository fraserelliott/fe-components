import { createContext, useContext } from "react";
import { feStyle } from "@fraserelliott/fe-utilities";

const FEStyleContext = createContext({
  theme: {},
});

/**
 * Provides a shared theme configuration to descendant components using useFEStyles.
 *
 * @param {Object} props
 * @param {Object} [props.theme={}] - Theme configuration containing slot-based inline styles and animation settings.
 * @param {React.ReactNode} props.children - Components that can access the theme context.
 * @returns {React.JSX.Element}
 */
export function FEStyleProvider({ theme = {}, children }) {
  return (
    <FEStyleContext.Provider value={{ theme }}>
      {children}
    </FEStyleContext.Provider>
  );
}

/**
 * Provides a slot-based styling function that merges component defaults,
 * provider themes, consumer overrides, and element-level styles.
 *
 * Styles are applied in the following precedence order (lowest to highest):
 * 1. Component default styles
 * 2. Animation-disabled styles (when `noAnim` is true)
 * 3. FEStyleProvider theme styles
 * 4. Consumer-provided base styles
 * 5. Element-level styles passed to `styleComponent`
 *
 * CSS classes are combined from the applicable animation, theme,
 * consumer, and element-level class definitions.
 *
 * @param {Object} [defaultStyles={}] - Component styling definitions, including
 *   `inline` slot styles and optional `anim` / `noAnim` definitions.
 * @param {Object<string, Object>} [baseStyle={}] - Consumer inline style overrides,
 *   keyed by styling slot.
 * @param {Object<string, string>} [baseClassName={}] - Consumer CSS class names,
 *   keyed by styling slot.
 * @param {boolean} [noAnim=false] - Disables default animation classes and applies
 *   animation-disabled style overrides where defined.
 *
 * @returns {{
 *   styleComponent: (
 *     slot: string,
 *     style?: Object,
 *     className?: string
 *   ) => { style: Object, className: string }
 * }} A styling function that returns props suitable for spreading onto a JSX element.
 *
 * @example
 * const { styleComponent } = useFEStyles(
 *   defaultStyles,
 *   style,
 *   className,
 *   noAnim
 * );
 *
 * return <div {...styleComponent("Panel")}>Content</div>;
 *
 * @example
 * // Apply element-level overrides.
 * <button
 *   {...styleComponent("BtnPrimary", { width: "100%" }, "custom-button")}
 * >
 *   Submit
 * </button>
 */
export function useFEStyles(
  defaultStyles = {},
  baseStyle = {},
  baseClassName = {},
  noAnim = false,
) {
  const { theme } = useContext(FEStyleContext);

  const styleComponent = (slot, style = {}, className = "") => {
    const styles = [];
    const classes = [];

    styles.push(defaultStyles.inline?.[slot]);

    const animClass =
      theme.anim?.anim?.[slot] ?? defaultStyles.anim?.anim?.[slot] ?? "";

    if (noAnim) {
      styles.push(defaultStyles.anim?.noAnim?.[slot]);
    } else {
      classes.push(animClass);
    }

    styles.push(theme?.inline?.[slot], baseStyle?.[slot], style);

    classes.push(theme?.classes?.[slot], baseClassName?.[slot], className);

    return feStyle(styles, classes);
  };

  return { styleComponent };
}
