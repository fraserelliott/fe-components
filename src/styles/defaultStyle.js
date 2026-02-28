import { cx, FEPresets } from "@fraserelliott/fe-utilities";

export const DefaultStyle = {
  Panel: (...extra) =>
    cx(
      "fe-rounded-2 fe-p-em-2 fec-bg-panel fec-text-primary fec-border fec-shadow-soft",
      ...extra,
    ),
  Btn: (...extra) => cx(FEPresets.Btn, "fec-btn fe-pressable", ...extra),
  BtnPrimary: (...extra) =>
    cx(FEPresets.Btn, "fec-bg-primary fec-btn fe-pressable", ...extra),
  BtnDanger: (...extra) =>
    cx(FEPresets.Btn, "fec-bg-danger fec-btn fe-pressable", ...extra),
  BtnConfirm: (...extra) =>
    cx(FEPresets.Btn, "fec-bg-confirm fec-btn fe-pressable", ...extra),
  Heading: (...extra) => cx("fe-fw-bold", ...extra),
};
