import { DefaultStyle as S } from "./defaultStyle";
import { cx } from "@fraserelliott/fe-utilities/cx";

export const ToastDefaultStyle = {
  Panel: (...extra) =>
    cx(
      S.Panel,
      "fec-opacity-80 fec-z-top fec-opacity-ease-out fec-w-200",
      ...extra,
    ),
  Success: (...extra) =>
    cx(
      S.Panel,
      "fec-opacity-80 fec-bg-confirm fec-z-top fec-opacity-ease-out fec-w-200",
      ...extra,
    ),
  Error: (...extra) =>
    cx(
      S.Panel,
      "fec-opacity-80 fec-bg-danger fec-z-top fec-opacity-ease-out fec-color-secondary fec-w-200",
      ...extra,
    ),
  StackingContainer: (...extra) =>
    cx("fe-d-flex fe-flex-column-reverse", ...extra),
  Fading: (...extra) => cx("fec-opacity-0", ...extra),
};
