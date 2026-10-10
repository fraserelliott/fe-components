import {
  utilities,
  sx,
  cx,
  FEPresetsInline,
  FEPresetsClasses,
} from "@fraserelliott/fe-utilities";

const styles = {
  BgPrimary: {
    backgroundColor: "var(--fec-bg-primary, #f6f6f3)",
  },

  BgSecondary: {
    backgroundColor: "var(--fec-bg-secondary, #ecece7)",
  },

  BgActive: {
    backgroundColor: "var(--fec-bg-active, #cfd8e3)",
  },

  BtnPrimary: {
    backgroundColor: "var(--fec-btn-primary, #f6f6f3)",
  },

  BgPanel: {
    backgroundColor: "var(--fec-bg-panel, #ffffff)",
  },

  TextPrimary: {
    color: "var(--fec-text-primary, #1f1f1f)",
  },

  TextSecondary: {
    color: "var(--fec-text-secondary, #5a5a5a)",
  },

  BgConfirm: {
    backgroundColor: "var(--fec-confirm, #4caf50)",
  },

  TextConfirm: {
    color: "var(--fec-confirm, #4caf50)",
  },

  BgDanger: {
    backgroundColor: "var(--fec-danger, #d9534f)",
  },

  TextDanger: {
    color: "var(--fec-danger, #d9534f)",
  },

  Border: {
    borderWidth: "var(--fec-border-width, 1px)",
    borderStyle: "var(--fec-border-style, solid)",
    borderColor: "var(--fec-border-color, #d6d6d0)",
  },

  ShadowSoft: {
    boxShadow:
      "var(--fec-shadow-soft, 0 1px 2px rgba(0, 0, 0, 0.05), 0 3px 6px rgba(0, 0, 0, 0.06))",
  },

  ShadowMedium: {
    boxShadow:
      "var(--fec-shadow-medium, 0 4px 8px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.06))",
  },
};

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

export const defaultStyles = {
  inline: {
    Panel: sx(
      utilities["fe-d-flex"],
      utilities["fe-flex-column"],
      utilities["fe-p-em-3"],
      utilities["fe-rounded-2"],
      utilities["fe-p-em-2"],
      styles.BgPanel,
      styles.TextPrimary,
      styles.Border,
      styles.ShadowSoft,
    ),
    Btn: sx(FEPresetsInline.Btn),
    BtnPrimary: sx(FEPresetsInline.Btn),
    BtnDanger: sx(FEPresetsInline.Btn, styles.BgDanger),
    BtnConfirm: sx(FEPresetsInline.Btn, styles.BgConfirm),
    Heading: sx(utilities["fe-fw-bold"]),
    BlurOverlay: sx(overlayBase, {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(4px)",
    }),
    Overlay: overlayBase,
    TextPrimary: styles.TextPrimary,
  },

  anim: {
    anim: {
      Btn: "fec-btn fe-pressable",
      BtnPrimary: "fec-btn fec-btn-primary fe-pressable",
      BtnConfirm: "fec-btn fec-btn-confirm fe-pressable",
      BtnDanger: "fec-btn fec-btn-danger fe-pressable",
    },

    noAnim: {
      BtnPrimary: styles.BtnPrimary,
      BtnDanger: styles.BgDanger,
      BtnConfirm: styles.BgConfirm,
    },
  },
};
