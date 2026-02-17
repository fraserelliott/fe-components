import { DefaultStyle as S } from "./defaultStyle";
import { cx } from "@fraserelliott/fe-utilities/cx";

export const ConfirmDialogDefaultStyle = {
  Panel: (...extra) => cx(S.Panel, "fec-z-top fec-w-200", ...extra),
  BtnConfirm: S.BtnConfirm,
  BtnDanger: S.BtnDanger,
  Heading: S.Header,
  ContainerBtn: (...extra) => cx("fe-d-flex fe-justify-between", ...extra),
  Overlay: (...extra) =>
    cx(
      "fe-pos-fixed fe-d-flex fe-justify-center fe-items-center fec-z-top fec-overlay",
      ...extra,
    ),
};
