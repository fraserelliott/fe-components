import { ToastForm } from "@components/ToastForm";
import {
  ToastMessageDisplay,
  OptionalPortal,
} from "@fraserelliott/fe-components";
import { UI } from "@styles";

export function ToastPage() {
  return (
    <div className={UI.Panel("fe-d-flex fe-gap-5 fe-flex-column")}>
      <h1 className={UI.Heading()}>Toast Demos</h1>

      <ToastForm title="Netural Toast" />
      <ToastForm title="Success Toast" type="success" />
      <ToastForm title="Error Toast" type="error" />

      <OptionalPortal portalTarget={document.body}>
        <ToastMessageDisplay />
      </OptionalPortal>
    </div>
  );
}
