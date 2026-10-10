import { createContext, useContext } from "react";
import { feStyle } from "@fraserelliott/fe-utilities";

const FEStyleContext = createContext({
  defaultMode: "inline",
  theme: {},
});

export function FEStyleProvider({
  defaultMode = "inline",
  theme = {},
  children,
}) {
  return (
    <FEStyleContext.Provider value={{ defaultMode, theme }}>
      {children}
    </FEStyleContext.Provider>
  );
}

export function useFEStyles(defaultStyles, noAnim = false) {
  const { defaultMode, theme } = useContext(FEStyleContext);

  const styleComponent = (slot, style = {}, className = {}) => {
    const styles = [];
    const classes = [];

    if (defaultMode === "inline") {
      styles.push(defaultStyles.inline?.[slot]);
    } else {
      classes.push(defaultStyles.classes?.[slot]);
    }

    if (noAnim) {
      if (defaultMode === "inline") {
        styles.push(defaultStyles.anim?.noAnim?.inline?.[slot]);
      } else {
        classes.push(defaultStyles.anim?.noAnim?.classes?.[slot]);
      }
    } else {
      classes.push(defaultStyles.anim?.anim?.[slot]);
    }

    if (defaultMode === "inline") {
      styles.push(theme?.[slot]);
    }

    styles.push(theme?.inline?.[slot], style?.[slot]);
    classes.push(theme?.classes?.[slot], className?.[slot]);

    return feStyle(styles, classes);
  };

  return { styleComponent };
}
