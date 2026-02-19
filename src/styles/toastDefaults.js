import { DefaultStyle as S } from "./defaultStyle";
import { cx } from "@fraserelliott/fe-utilities/cx";

const neutralToast =
  "fe-d-flex fe-justify-center fe-items-center fec-opacity-80 fec-z-top fec-opacity-ease-out fec-toast";

export const ToastDefaultStyle = {
  Panel: (...extra) => cx(S.Panel, neutralToast, ...extra),
  Success: (...extra) => cx(S.Panel, neutralToast, "fec-bg-confirm", ...extra),
  Error: (...extra) => cx(S.Panel, neutralToast, "fec-bg-danger", ...extra),
  StackingContainer: (...extra) =>
    cx(
      "fe-d-flex fe-flex-column-reverse fe-gap-1 fec-toast-container",
      ...extra,
    ),
  Fading: (...extra) => cx("fec-opacity-0", ...extra),
};
