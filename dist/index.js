// src/toast/ToastProvider.jsx
import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useContext
} from "react";
import { v4 as uuid } from "uuid";
import { jsx } from "react/jsx-runtime";
var ToastContext = createContext();
function ToastProvider({
  children,
  fadeMs = 150,
  defaultDelayMs = 2350
}) {
  const [toastMessages, setToastMessages] = useState([]);
  const fadeStartTimersRef = useRef(/* @__PURE__ */ new Map());
  const removeTimersRef = useRef(/* @__PURE__ */ new Map());
  useEffect(() => {
    return () => {
      for (const t of fadeStartTimersRef.current.values())
        window.clearTimeout(t);
      for (const t of removeTimersRef.current.values()) window.clearTimeout(t);
      fadeStartTimersRef.current.clear();
      removeTimersRef.current.clear();
    };
  }, []);
  const clearTimersFor = useCallback((id) => {
    const fadeStartTimer = fadeStartTimersRef.current.get(id);
    if (fadeStartTimer != null) {
      window.clearTimeout(fadeStartTimer);
      fadeStartTimersRef.current.delete(id);
    }
    const removeTimer = removeTimersRef.current.get(id);
    if (removeTimer != null) {
      window.clearTimeout(removeTimer);
      removeTimersRef.current.delete(id);
    }
  }, []);
  const startFadeAndScheduleRemove = useCallback(
    (id) => {
      setToastMessages(
        (prev) => prev.map((msg) => msg.id === id ? { ...msg, fading: true } : msg)
      );
      clearTimersFor(id);
      const removeTimer = window.setTimeout(() => {
        setToastMessages((prev) => prev.filter((msg) => msg.id !== id));
        removeTimersRef.current.delete(id);
      }, fadeMs);
      removeTimersRef.current.set(id, removeTimer);
    },
    [fadeMs, clearTimersFor]
  );
  const dismissToast = useCallback(
    (id) => {
      startFadeAndScheduleRemove(id);
    },
    [startFadeAndScheduleRemove]
  );
  const addToastMessage = useCallback(
    (message, type, delayMs = defaultDelayMs) => {
      const id = uuid();
      setToastMessages((prev) => [
        ...prev,
        { id, message, type, fading: false }
      ]);
      clearTimersFor(id);
      const fadeStartTimer = window.setTimeout(() => {
        startFadeAndScheduleRemove(id);
        fadeStartTimersRef.current.delete(id);
      }, delayMs);
      fadeStartTimersRef.current.set(id, fadeStartTimer);
      return id;
    },
    [defaultDelayMs, clearTimersFor, startFadeAndScheduleRemove]
  );
  const value = useMemo(
    () => ({ toastMessages, addToastMessage, dismissToast }),
    [toastMessages, addToastMessage, dismissToast]
  );
  return /* @__PURE__ */ jsx(ToastContext.Provider, { value, children });
}
function useToast() {
  const ctx = useContext(ToastContext);
  if (ctx === void 0) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}

// src/styles/defaultStyle.js
import { cx, FEPresets } from "@fraserelliott/fe-utilities";
var DefaultStyle = {
  Panel: (...extra) => cx(
    "fe-rounded-2 fe-p-em-2 fec-bg-panel fec-text-primary fec-border-subtle fec-shadow-soft",
    ...extra
  ),
  Btn: (...extra) => cx(FEPresets.Btn, "fec-btn fe-pressable", ...extra),
  BtnPrimary: (...extra) => cx(FEPresets.Btn, "fec-bg-primary fec-btn fe-pressable", ...extra),
  BtnDanger: (...extra) => cx(FEPresets.Btn, "fec-bg-danger fec-btn fe-pressable", ...extra),
  BtnConfirm: (...extra) => cx(FEPresets.Btn, "fec-bg-confirm fec-btn fe-pressable", ...extra),
  Heading: (...extra) => cx("fe-fw-bold", ...extra)
};

// src/styles/toastDefaults.js
import { cx as cx2 } from "@fraserelliott/fe-utilities/cx";
var neutralToast = "fe-d-flex fe-justify-center fe-items-center fec-opacity-80 fec-z-top fec-opacity-ease-out fec-toast";
var ToastDefaultStyle = {
  Panel: (...extra) => cx2(DefaultStyle.Panel, neutralToast, ...extra),
  Success: (...extra) => cx2(DefaultStyle.Panel, neutralToast, "fec-bg-confirm", ...extra),
  Error: (...extra) => cx2(DefaultStyle.Panel, neutralToast, "fec-bg-danger", ...extra),
  StackingContainer: (...extra) => cx2(
    "fe-d-flex fe-flex-column-reverse fe-gap-1 fec-toast-container",
    ...extra
  ),
  Fading: (...extra) => cx2("fec-opacity-0", ...extra)
};

// src/toast/ToastMessageDisplay.jsx
import { cx as cx4 } from "@fraserelliott/fe-utilities";

// src/util/styleUtil.js
import { cx as cx3 } from "@fraserelliott/fe-utilities";
function mergeStyle(defaultStyle, userStyle, styleName) {
  const style = {};
  for (const key of Object.keys(defaultStyle)) {
    style[key] = (...extra) => cx3(defaultStyle[key], userStyle[key], ...extra);
    if (process.env.NODE_ENV !== "production") {
      for (const key2 of Object.keys(userStyle)) {
        if (!(key2 in defaultStyle)) {
          console.warn(`[${styleName}] Unknown style slot: "${key2}"`);
        }
      }
    }
  }
  return style;
}

// src/toast/ToastMessageDisplay.jsx
import { jsx as jsx2 } from "react/jsx-runtime";
function ToastMessageDisplay(props) {
  const { toastMessages, dismissToast } = useToast();
  const userStyle = props.style ?? {};
  const style = mergeStyle(ToastDefaultStyle, userStyle, "ToastDefaultStyle");
  const calculateStyle = (toast) => {
    const base = toast.type === "success" ? style.Success : toast.type === "error" ? style.Error : style.Panel;
    return cx4(base, toast.fading && style.Fading);
  };
  return /* @__PURE__ */ jsx2("div", { className: style.StackingContainer(), children: toastMessages.map((toast) => {
    return /* @__PURE__ */ jsx2(
      "p",
      {
        className: calculateStyle(toast),
        onClick: () => props.clearOnClick && dismissToast(toast.id),
        role: "button",
        tabIndex: 0,
        children: toast.message
      },
      toast.id
    );
  }) });
}

// src/styles/confirmDialogDefaults.js
import { cx as cx5 } from "@fraserelliott/fe-utilities/cx";
var ConfirmDialogDefaultStyle = {
  Panel: (...extra) => cx5(
    DefaultStyle.Panel,
    "fe-d-flex fe-flex-column fe-justify-center fe-items-center fec-z-top fec-confirm-dialog fe-p-em-3",
    ...extra
  ),
  BtnConfirm: DefaultStyle.BtnConfirm,
  BtnDanger: DefaultStyle.BtnDanger,
  Heading: DefaultStyle.Heading,
  ContainerBtn: (...extra) => cx5("fe-d-flex fe-justify-around fe-w-100", ...extra),
  Overlay: (...extra) => cx5(
    "fe-pos-fixed fe-d-flex fe-justify-center fe-items-center fec-z-top fec-overlay",
    ...extra
  )
};

// src/confirmdialog/ConfirmDialog.jsx
import { useState as useState2 } from "react";
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function ConfirmDialog({
  open,
  onConfirm,
  onCancel,
  onOpenChange,
  heading,
  text,
  onError,
  style,
  keepMounted
}) {
  if (!open && !keepMounted) return null;
  const [pending, setPending] = useState2(false);
  const userStyle = style ?? {};
  const mergedStyle = mergeStyle(
    ConfirmDialogDefaultStyle,
    userStyle,
    "ConfirmDialogDefaultStyle"
  );
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
  return /* @__PURE__ */ jsx3("div", { className: mergedStyle.Overlay(), children: /* @__PURE__ */ jsxs("div", { className: mergedStyle.Panel(), children: [
    heading !== void 0 && /* @__PURE__ */ jsx3("h1", { className: mergedStyle.Heading(), children: heading }),
    /* @__PURE__ */ jsx3("p", { className: "fe-grow-1", children: text !== void 0 && /* @__PURE__ */ jsx3("span", { children: text }) }),
    /* @__PURE__ */ jsxs("div", { className: mergedStyle.ContainerBtn(), children: [
      /* @__PURE__ */ jsx3(
        "button",
        {
          onClick: () => handleCancel(),
          className: mergedStyle.BtnDanger(),
          disabled: pending,
          "aria-busy": pending,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx3(
        "button",
        {
          onClick: () => handleConfirm(),
          className: mergedStyle.BtnConfirm(),
          disabled: pending,
          "aria-busy": pending,
          children: pending ? "Working..." : "Confirm"
        }
      )
    ] })
  ] }) });
}

// src/optionalportal/OptionalPortal.jsx
import { createPortal } from "react-dom";
function OptionalPortal({ children, portalTarget }) {
  if (!portalTarget) return children;
  const target = portalTarget === true ? typeof document !== "undefined" ? document.body : null : portalTarget;
  if (!target) return children;
  return createPortal(children, target);
}
export {
  ConfirmDialog,
  ConfirmDialogDefaultStyle,
  DefaultStyle,
  OptionalPortal,
  ToastDefaultStyle,
  ToastMessageDisplay,
  ToastProvider,
  useToast
};
//# sourceMappingURL=index.js.map