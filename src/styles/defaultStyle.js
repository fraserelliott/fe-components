import { cx, FEComponents } from "@fraserelliott/fe-utilities";

export const DefaultStyle = {
  Panel: (...extra) =>
    cx(
      "fe-rounded-2 fe-p-rem-1 fec-bg-panel fec-text-primary fec-border-subtle fec-shadow-soft",
      ...extra,
    ),
  Btn: (...extra) => cx(FEComponents.Btn),
  BtnPrimary: (...extra) => cx(FEComponents.Btn, "fec-bg-primary", ...extra),
  Btndanger: (...extra) => cx(FEComponents.Btn, "fec-bg-danger", ...extra),
  Heading: (...extra) => cx("fe-fw-bold", ...extra),
};
