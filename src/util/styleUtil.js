import { cx } from "@fraserelliott/fe-utilities";

export function mergeStyle(defaultStyle, userStyle, styleName) {
  const style = {};

  for (const key of Object.keys(defaultStyle)) {
    style[key] = (...extra) => cx(defaultStyle[key], userStyle[key], ...extra);

    if (process.env.NODE_ENV !== "production") {
      for (const key of Object.keys(userStyle)) {
        if (!(key in defaultStyle)) {
          console.warn(`[${styleName}] Unknown style slot: "${key}"`);
        }
      }
    }
  }

  return style;
}
