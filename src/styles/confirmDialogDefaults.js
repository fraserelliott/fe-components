import { DefaultStyle as S } from "./defaultStyle";
import { cx } from "@fraserelliott/fe-utilities/cx";

export const ConfirmDialogDefaultStyle = {
  Panel: (...extra) =>
    cx(
      S.Panel,
      "fe-d-flex fe-flex-column fe-justify-center fe-items-center fec-z-top fec-confirm-dialog fe-p-em-3",
      ...extra,
    ),
  BtnConfirm: S.BtnConfirm,
  BtnDanger: S.BtnDanger,
  Heading: S.Heading,
  ContainerBtn: (...extra) =>
    cx("fe-d-flex fe-justify-around fe-w-100", ...extra),
  Overlay: (...extra) =>
    cx(
      "fe-pos-fixed fe-d-flex fe-justify-center fe-items-center fec-z-top fec-overlay",
      ...extra,
    ),
};
