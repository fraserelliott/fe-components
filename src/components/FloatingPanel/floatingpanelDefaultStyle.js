import { defaultStyles as S } from "../../styling/defaultStyle";
import { cx, sx, utilities } from "@fraserelliott/fe-utilities";

export const floatingPanelDefaultStyle = {
  inline: {
    Panel: sx(S.inline.Panel, utilities["fe-pos-absolute"], {
      zIndex: "var(--fec-z-floating-panel, 50)",
    }),
    BlurOverlay: S.inline.BlurOverlay,
    Overlay: S.inline.Overlay,
  },
};
