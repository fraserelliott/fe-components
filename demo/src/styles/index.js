import { cx } from "@fraserelliott/fe-utilities/cx";

const DefaultStyle = {
  Panel: (...extra) =>
    cx(
      "fe-rounded-2 fe-p-em-2 fec-bg-panel fec-text-primary fec-border fec-shadow-soft",
      ...extra,
    ),
  Btn: (...extra) => cx(FEPresets.Btn, "fec-btn fe-pressable", ...extra),
  BtnPrimary: (...extra) =>
    cx("fec-btn-primary fec-btn fe-pressable", ...extra),
  BtnDanger: (...extra) => cx("fec-bg-danger fec-btn fe-pressable", ...extra),
  BtnConfirm: (...extra) => cx("fec-bg-confirm fec-btn fe-pressable", ...extra),
  Heading: (...extra) => cx("fe-fw-bold", ...extra),
  Overlay: (...extra) =>
    cx(
      "fe-pos-fixed fe-d-flex fe-justify-center fe-items-center fec-z-modal fec-overlay",
      ...extra,
    ),
};

export const UI = {
  Navbar: (...extra) =>
    cx(
      "fe-d-flex fe-flex-row list-style-none fec-bg-secondary fe-w-100 fe-justify-center",
      ...extra,
    ),
  NavItem: (...extra) =>
    cx("fe-d-flex fe-items-center fe-p-em-2 fec-btn", ...extra),
  Btn: DefaultStyle.Btn,
  BtnPrimary: DefaultStyle.BtnPrimary,
  Heading: DefaultStyle.Heading,
  Panel: DefaultStyle.Panel,
};
