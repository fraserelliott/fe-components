import { useToast } from "./ToastProvider";
import { ToastDefaultStyle } from "../styles/toastDefaults";
import { cx } from "@fraserelliott/fe-utilities";
import { mergeStyle } from "../util/styleUtil";
import "../styles/fe-components.css";

const validDirections = new Set([
  "row",
  "row-reverse",
  "column",
  "column-reverse",
]);

const positionClassMap = {
  "bottom-right": "fec-toast-pos-br",
  "bottom-left": "fec-toast-pos-bl",
  "top-right": "fec-toast-pos-tr",
  "top-left": "fec-toast-pos-tl",
};

export function ToastMessageDisplay({
  style: userStyle = {},
  direction = "column-reverse",
  position = "bottom-right",
  clearOnClick = false,
}) {
  const { toastMessages, dismissToast } = useToast();

  const resolvedDirection = validDirections.has(direction)
    ? direction
    : "column-reverse";

  const resolvedPosition =
    positionClassMap[position] ?? positionClassMap["bottom-right"];

  const mergedStyle = mergeStyle(
    ToastDefaultStyle,
    userStyle,
    "ToastDefaultStyle",
  );

  const calculateStyle = (toast) => {
    const base =
      toast.type === "success"
        ? mergedStyle.Success
        : toast.type === "error"
          ? mergedStyle.Error
          : mergedStyle.Panel;

    return cx(base, toast.fading && mergedStyle.Fading);
  };

  return (
    <div
      className={mergedStyle.StackingContainer(resolvedPosition)}
      style={{ flexDirection: resolvedDirection }}
    >
      {toastMessages.map((toast) => {
        return (
          <p
            key={toast.id}
            className={calculateStyle(toast)}
            onClick={() => clearOnClick && dismissToast(toast.id)}
            role="button"
            tabIndex={0}
          >
            {toast.message}
          </p>
        );
      })}
    </div>
  );
}
