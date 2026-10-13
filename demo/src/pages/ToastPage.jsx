import { ToastForm } from "@components/ToastForm";
import {
  ToastMessageDisplay,
  OptionalPortal,
  defaultStyles,
  useFEStyles,
} from "@fraserelliott/fe-components";
import { utilities } from "@fraserelliott/fe-utilities";

export function ToastPage() {
  const { styleComponent } = useFEStyles(defaultStyles);

  return (
    <div {...styleComponent("Panel", utilities["fe-gap-5"])}>
      <h1 {...styleComponent("Heading")}>Toast Demos</h1>

      <ToastForm title="Netural Toast" />
      <ToastForm title="Success Toast" type="success" />
      <ToastForm title="Error Toast" type="error" />

      <OptionalPortal portalTarget={document.body}>
        <ToastMessageDisplay clearOnClick />
      </OptionalPortal>
    </div>
  );
}
