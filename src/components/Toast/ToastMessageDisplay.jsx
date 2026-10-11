import { useToast } from "./ToastProvider";
import { useFEStyles } from "../../styling/FEStyle";
import { defaultStyles } from "../../styling/defaultStyle";
import { sx, utilities } from "@fraserelliott/fe-utilities";

const positionStyleMap = {
  "bottom-right": {
    bottom: "var(--fec-toast-inset-y, 3rem)",
    right: "var(--fec-toast-inset-x, 1rem)",
    top: "auto",
    left: "auto",
    alignItems: "flex-end",
  },
  "bottom-left": {
    bottom: "var(--fec-toast-inset-y, 3rem)",
    left: "var(--fec-toast-inset-x, 1rem)",
    top: "auto",
    right: "auto",
    alignItems: "flex-start",
  },
  "top-right": {
    top: "var(--fec-toast-inset-y, 3rem)",
    right: "var(--fec-toast-inset-x, 1rem)",
    bottom: "auto",
    left: "auto",
    alignItems: "flex-end",
  },
  "top-left": {
    top: "var(--fec-toast-inset-y, 3rem)",
    left: "var(--fec-toast-inset-x, 1rem)",
    bottom: "auto",
    right: "auto",
    alignItems: "flex-start",
  },
};

export function ToastMessageDisplay({
  style = {},
  className = {},
  position = "bottom-right",
  direction = "column-reverse",
  clearOnClick = false,
  noAnim,
}) {
  const { styleComponent } = useFEStyles(
    sx(defaultStyles, {
      inline: {
        ToastContainer: sx(
          utilities["fe-pos-fixed"],
          positionStyleMap[position],
          {
            flexDirection: direction,
          },
        ),
      },
    }),
    style,
    className,
    noAnim,
  );

  const { toastMessages, dismissToast } = useToast();

  return (
    <div {...styleComponent("ToastContainer")}>
      {toastMessages &&
        toastMessages.map((toast) => {
          const slot =
            toast.type === "success"
              ? "ToastSuccess"
              : toast.type === "error"
                ? "ToastError"
                : "Toast";

          return (
            <p
              key={toast.id}
              onClick={() => clearOnClick && dismissToast(toast.id)}
              {...styleComponent(slot)}
            >
              {toast.message}
            </p>
          );
        })}
    </div>
  );
}
