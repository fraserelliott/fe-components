import { cx } from "@fraserelliott/fe-utilities/cx";
import { DefaultStyle } from "@fe-components";

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
