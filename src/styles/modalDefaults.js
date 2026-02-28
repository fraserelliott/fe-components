import { DefaultStyle as S } from "./defaultStyle";
import { cx } from "@fraserelliott/fe-utilities/cx";

export const ModalDefaultStyle = {
  Panel: (...extra) =>
    cx(
      S.Panel,
      "fe-d-flex fe-flex-column fe-justify-center fec-z-top fec-modal fe-p-em-3",
      ...extra,
    ),
  BtnPrimary: S.BtnPrimary,
  Overlay: S.Overlay,
  Heading: (...extra) => cx("fe-fw-bold", ...extra),
};
