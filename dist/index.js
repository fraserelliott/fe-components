// src/styling/defaultStyle.js
import {
  utilities,
  sx,
  cx,
  FEPresetsInline,
  FEPresetsClasses
} from "@fraserelliott/fe-utilities";
var styles = {
  BgPrimary: {
    backgroundColor: "var(--fec-bg-primary, #f6f6f3)"
  },
  BgSecondary: {
    backgroundColor: "var(--fec-bg-secondary, #ecece7)"
  },
  BgActive: {
    backgroundColor: "var(--fec-bg-active, #cfd8e3)"
  },
  BtnPrimary: {
    backgroundColor: "var(--fec-btn-primary, #f6f6f3)"
  },
  BgPanel: {
    backgroundColor: "var(--fec-bg-panel, #ffffff)"
  },
  TextPrimary: {
    color: "var(--fec-text-primary, #1f1f1f)"
  },
  TextSecondary: {
    color: "var(--fec-text-secondary, #5a5a5a)"
  },
  BgConfirm: {
    backgroundColor: "var(--fec-confirm, #4caf50)"
  },
  TextConfirm: {
    color: "var(--fec-confirm, #4caf50)"
  },
  BgDanger: {
    backgroundColor: "var(--fec-danger, #d9534f)"
  },
  TextDanger: {
    color: "var(--fec-danger, #d9534f)"
  },
  Border: {
    borderWidth: "var(--fec-border-width, 1px)",
    borderStyle: "var(--fec-border-style, solid)",
    borderColor: "var(--fec-border-color, #d6d6d0)"
  },
  ShadowSoft: {
    boxShadow: "var(--fec-shadow-soft, 0 1px 2px rgba(0, 0, 0, 0.05), 0 3px 6px rgba(0, 0, 0, 0.06))"
  },
  ShadowMedium: {
    boxShadow: "var(--fec-shadow-medium, 0 4px 8px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.06))"
  }
};
var overlayBase = sx(
  utilities["fe-pos-fixed"],
  utilities["fe-d-flex"],
  utilities["fe-justify-center"],
  utilities["fe-items-center"],
  {
    inset: 0,
    width: "100%",
    height: "100%",
    zIndex: "var(--fec-z-overlay, 100)"
  }
);
var defaultStyles = {
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
      styles.ShadowSoft
    ),
    Btn: sx(FEPresetsInline.Btn),
    BtnPrimary: sx(FEPresetsInline.Btn),
    BtnDanger: sx(FEPresetsInline.Btn, styles.BgDanger),
    BtnConfirm: sx(FEPresetsInline.Btn, styles.BgConfirm),
    Heading: sx(utilities["fe-fw-bold"]),
    BlurOverlay: sx(overlayBase, {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(4px)"
    }),
    Overlay: overlayBase,
    TextPrimary: styles.TextPrimary
  },
  anim: {
    anim: {
      Btn: "fec-btn fe-pressable",
      BtnPrimary: "fec-btn fec-btn-primary fe-pressable",
      BtnConfirm: "fec-btn fec-btn-confirm fe-pressable",
      BtnDanger: "fec-btn fec-btn-danger fe-pressable"
    },
    noAnim: {
      BtnPrimary: styles.BtnPrimary,
      BtnDanger: styles.BgDanger,
      BtnConfirm: styles.BgConfirm
    }
  }
};

// src/styling/FEStyle.jsx
import { createContext, useContext } from "react";
import { feStyle } from "@fraserelliott/fe-utilities";
import { jsx } from "react/jsx-runtime";
var FEStyleContext = createContext({
  theme: {}
});
function FEStyleProvider({ theme = {}, children }) {
  return /* @__PURE__ */ jsx(FEStyleContext.Provider, { value: { theme }, children });
}
function useFEStyles(defaultStyles2 = {}, baseStyle = {}, baseClassName = {}, noAnim = false) {
  const { theme } = useContext(FEStyleContext);
  const styleComponent = (slot, style = {}, className = "") => {
    var _a, _b, _c, _d, _e, _f, _g;
    const styles2 = [];
    const classes = [];
    styles2.push((_a = defaultStyles2.inline) == null ? void 0 : _a[slot]);
    if (noAnim) {
      styles2.push((_c = (_b = defaultStyles2.anim) == null ? void 0 : _b.noAnim) == null ? void 0 : _c[slot]);
    } else {
      classes.push((_e = (_d = defaultStyles2.anim) == null ? void 0 : _d.anim) == null ? void 0 : _e[slot]);
    }
    styles2.push((_f = theme == null ? void 0 : theme.inline) == null ? void 0 : _f[slot], baseStyle == null ? void 0 : baseStyle[slot], style);
    classes.push((_g = theme == null ? void 0 : theme.classes) == null ? void 0 : _g[slot], baseClassName == null ? void 0 : baseClassName[slot], className);
    return feStyle(styles2, classes);
  };
  return { styleComponent };
}

// src/components/OptionalPortal.jsx
import { createPortal } from "react-dom";
function OptionalPortal({ children, portalTarget }) {
  if (!portalTarget) return children;
  const target = portalTarget === true ? typeof document !== "undefined" ? document.body : null : portalTarget;
  if (!target) return children;
  return createPortal(children, target);
}

// src/components/FocusManager.jsx
import {
  createContext as createContext2,
  useContext as useContext2,
  useEffect,
  useRef,
  useCallback
} from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var FocusManagerContext = createContext2(void 0);
var focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])"
].join(", ");
function FocusManagerProvider({ children }) {
  const stack = useRef([]);
  const getTopmost = useCallback(() => {
    return stack.current.at(-1);
  }, []);
  const isTopmost = useCallback(
    (element) => {
      var _a;
      return ((_a = getTopmost()) == null ? void 0 : _a.element) === element;
    },
    [getTopmost]
  );
  const trapComponent = useCallback((element) => {
    if (!element) return;
    if (stack.current.some((entry) => entry.element === element)) {
      return;
    }
    const previousFocus = document.activeElement;
    stack.current.push({ element, previousFocus });
    const first = element.querySelector(focusableSelector);
    (first ?? element).focus();
  }, []);
  const untrapComponent = useCallback((element) => {
    var _a;
    const index = stack.current.findIndex((entry2) => entry2.element === element);
    if (index === -1) return;
    const [entry] = stack.current.splice(index, 1);
    if (index === stack.current.length) {
      if ((_a = entry.previousFocus) == null ? void 0 : _a.isConnected) {
        entry.previousFocus.focus();
      }
    }
  }, []);
  useEffect(() => {
    function getFocusable(element) {
      return [...element.querySelectorAll(focusableSelector)].filter(
        (el) => el.getClientRects().length > 0 && !el.closest("[inert]")
      );
    }
    function handleKeyDown(event) {
      if (event.key !== "Tab") return;
      const topmost = getTopmost();
      if (!topmost) return;
      const { element } = topmost;
      const focusable = getFocusable(element);
      if (!focusable.length) {
        event.preventDefault();
        element.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable.at(-1);
      const active = document.activeElement;
      if (event.shiftKey) {
        if (active === first || !element.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !element.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    }
    function handleFocusIn(event) {
      const topmost = getTopmost();
      if (!topmost) return;
      const { element } = topmost;
      if (!element.contains(event.target)) {
        const first = getFocusable(element)[0];
        (first ?? element).focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocusIn);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, [getTopmost]);
  return /* @__PURE__ */ jsx2(
    FocusManagerContext.Provider,
    {
      value: { trapComponent, untrapComponent, isTopmost },
      children
    }
  );
}
function useFocusManager() {
  const ctx = useContext2(FocusManagerContext);
  if (ctx === void 0) {
    throw new Error(
      "useFocusManager must be used within a FocusManagerProvider"
    );
  }
  return ctx;
}

// src/components/FloatingPanel/floatingpanelDefaultStyle.js
import { cx as cx2, sx as sx2, utilities as utilities2 } from "@fraserelliott/fe-utilities";
var floatingPanelDefaultStyle = {
  inline: {
    Panel: sx2(defaultStyles.inline.Panel, utilities2["fe-pos-absolute"], {
      zIndex: "var(--fec-z-floating-panel, 50)"
    }),
    BlurOverlay: defaultStyles.inline.BlurOverlay,
    Overlay: defaultStyles.inline.Overlay
  }
};

// src/components/FloatingPanel/FloatingPanel.jsx
import { useRef as useRef2, useEffect as useEffect2 } from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
function FloatingPanel({
  open,
  style,
  className,
  overlay = false,
  trapFocus = false,
  children,
  closeOnEscape = false,
  closeOnOverlayClick = false,
  onOpenChange
}) {
  const { styleComponent } = useFEStyles(
    floatingPanelDefaultStyle,
    style,
    className
  );
  if (!open) return null;
  const panel = /* @__PURE__ */ jsx3(
    FloatingPanelInner,
    {
      open,
      style,
      className,
      trapFocus,
      closeOnEscape,
      onOpenChange,
      children
    }
  );
  if (!overlay) return panel;
  return /* @__PURE__ */ jsx3(
    "div",
    {
      ...styleComponent(overlay === "blur" ? "BlurOverlay" : "Overlay"),
      onClick: (e) => {
        if (closeOnOverlayClick && e.target === e.currentTarget)
          onOpenChange == null ? void 0 : onOpenChange(false);
      },
      children: panel
    }
  );
}
function FloatingPanelInner({
  open,
  style,
  className,
  children,
  trapFocus = false,
  closeOnEscape,
  onOpenChange
}) {
  const { styleComponent } = useFEStyles(
    floatingPanelDefaultStyle,
    style,
    className
  );
  const { trapComponent, untrapComponent, isTopmost } = useFocusManager();
  const panelRef = useRef2(null);
  useEffect2(() => {
    if (!open || !closeOnEscape || !trapFocus) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isTopmost(panelRef.current)) {
        onOpenChange == null ? void 0 : onOpenChange(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, closeOnEscape, trapFocus, isTopmost, onOpenChange]);
  useEffect2(() => {
    if (!open || !trapFocus) return;
    const element = panelRef.current;
    if (!element) return;
    trapComponent(element);
    return () => untrapComponent(element);
  }, [open, trapFocus, trapComponent, untrapComponent]);
  return /* @__PURE__ */ jsx3(
    "div",
    {
      ref: panelRef,
      tabIndex: trapFocus ? -1 : void 0,
      ...styleComponent("Panel"),
      children
    }
  );
}

// src/components/ConfirmDialog.jsx
import { sx as sx3, utilities as utilities3 } from "@fraserelliott/fe-utilities";
import { useState } from "react";
import { jsx as jsx4, jsxs } from "react/jsx-runtime";
function ConfirmDialog({
  open,
  style = {},
  className = {},
  overlay = "blur",
  trapFocus = true,
  noAnim = false,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  heading,
  text,
  onConfirm,
  onCancel,
  onOpenChange,
  closeOnEscape
}) {
  const { styleComponent } = useFEStyles(
    defaultStyles,
    style,
    className,
    noAnim
  );
  const [pending, setPending] = useState(false);
  const handleCancel = async () => {
    try {
      setPending(true);
      await Promise.resolve(onCancel == null ? void 0 : onCancel());
      setPending(false);
      onOpenChange == null ? void 0 : onOpenChange(false, "cancel");
    } catch (err) {
      setPending(false);
      onError == null ? void 0 : onError({ source: "cancel", err });
    }
  };
  const handleConfirm = async () => {
    try {
      setPending(true);
      await Promise.resolve(onConfirm == null ? void 0 : onConfirm());
      setPending(false);
      onOpenChange == null ? void 0 : onOpenChange(false, "confirm");
    } catch (err) {
      setPending(false);
      onError == null ? void 0 : onError({ source: "confirm", err });
    }
  };
  const overrides = {
    Overlay: { zIndex: "var(--fec-z-dialog, 200)" },
    BlurOverlay: { zIndex: "var(--fec-z-dialog, 200)" },
    Panel: utilities3["fe-gap-3"]
  };
  return /* @__PURE__ */ jsxs(
    FloatingPanel,
    {
      open,
      style: sx3(overrides, style),
      className,
      overlay,
      trapFocus,
      onOpenChange: () => handleCancel(),
      closeOnEscape,
      children: [
        heading && /* @__PURE__ */ jsx4("h1", { ...styleComponent("Heading", utilities3["fe-text-center"]), children: heading }),
        text && /* @__PURE__ */ jsx4("p", { ...styleComponent("TextPrimary", utilities3["fe-grow-1"]), children: text }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: sx3(
              utilities3["fe-d-flex"],
              utilities3["fe-justify-around"],
              utilities3["fe-w-100"]
            ),
            children: [
              /* @__PURE__ */ jsx4(
                "button",
                {
                  ...styleComponent("BtnDanger"),
                  onClick: () => handleCancel(),
                  disabled: pending,
                  children: cancelLabel
                }
              ),
              /* @__PURE__ */ jsx4(
                "button",
                {
                  ...styleComponent("BtnConfirm"),
                  onClick: () => handleConfirm(),
                  disabled: pending,
                  children: pending ? "Working..." : confirmLabel
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  ConfirmDialog,
  FEStyleProvider,
  FloatingPanel,
  FocusManagerProvider,
  OptionalPortal,
  defaultStyles,
  floatingPanelDefaultStyle,
  useFEStyles,
  useFocusManager
};
//# sourceMappingURL=index.js.map