import { createContext, useContext } from "react";
import { feStyle } from "@fraserelliott/fe-utilities";

const FEStyleContext = createContext({
  theme: {},
});

export function FEStyleProvider({ theme = {}, children }) {
  return (
    <FEStyleContext.Provider value={{ theme }}>
      {children}
    </FEStyleContext.Provider>
  );
}

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

    if (noAnim) {
      styles.push(defaultStyles.anim?.noAnim?.[slot]);
    } else {
      classes.push(defaultStyles.anim?.anim?.[slot]);
    }

    styles.push(theme?.inline?.[slot], baseStyle?.[slot], style);

    classes.push(theme?.classes?.[slot], baseClassName?.[slot], className);

    return feStyle(styles, classes);
  };

  return { styleComponent };
}
