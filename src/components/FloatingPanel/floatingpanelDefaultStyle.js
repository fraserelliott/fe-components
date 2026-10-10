import { defaultStyles as S } from "../../styling/defaultStyle";
import { cx, sx, utilities } from "@fraserelliott/fe-utilities";

const overlayBase = sx(
  utilities["fe-pos-fixed"],
  utilities["fe-d-flex"],
  utilities["fe-justify-center"],
  utilities["fe-items-center"],
  {
    inset: 0,
    width: "100%",
    height: "100%",
    zIndex: "var(--fec-z-overlay, 100)",
  },
);

const overlayBaseClasses =
  "fe-pos-fixed fe-d-flex fe-justify-center fe-items-center fec-z-overlay fec-overlay";

export const floatingPanelDefaultStyle = {
  inline: {
    Panel: sx(S.inline.Panel, utilities["fe-pos-absolute"], {
      zIndex: "var(--fec-z-floating-panel, 50)",
    }),
    BlurOverlay: sx(overlayBase, {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(4px)",
    }),
    Overlay: overlayBase,
  },
  classes: {
    Panel: cx(S.classes.Panel, "fec-z-floating-panel"),
    BlurOverlay: cx(overlayBaseClasses, "fec-blur"),
    Overlay: overlayBaseClasses,
  },
};
