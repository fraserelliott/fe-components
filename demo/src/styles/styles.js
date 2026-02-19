import { cx } from "@fraserelliott/fe-utilities/cx";

export const UI = {
  Navbar: (...extra) =>
    cx("fe-d-flex fe-flex-row list-style-none fe-gap-1", ...extra),
  NavItem: (...extra) => cx("fe-d-flex fe-items-center fe-p-em-1", ...extra),
};
