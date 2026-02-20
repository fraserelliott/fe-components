import { useToast } from "./ToastProvider";
import { ToastDefaultStyle } from "../styles/toastDefaults";
import { cx } from "@fraserelliott/fe-utilities";
import { mergeStyle } from "../util/styleUtil";
import "../styles/fe-components.css";

export function ToastMessageDisplay(props) {
  const { toastMessages, dismissToast } = useToast();

  const userStyle = props.style ?? {};
  const style = mergeStyle(ToastDefaultStyle, userStyle, "ToastDefaultStyle");

  const calculateStyle = (toast) => {
    const base =
      toast.type === "success"
        ? style.Success
        : toast.type === "error"
          ? style.Error
          : style.Panel;

    return cx(base, toast.fading && style.Fading);
  };

  return (
    <div className={style.StackingContainer()}>
      {toastMessages.map((toast) => {
        return (
          <p
            key={toast.id}
            className={calculateStyle(toast)}
            onClick={() => props.clearOnClick && dismissToast(toast.id)}
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
