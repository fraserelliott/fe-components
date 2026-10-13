import { useForm } from "react-hook-form";
import {
  useToast,
  defaultStyles,
  useFEStyles,
} from "@fraserelliott/fe-components";
import { utilities, sx } from "@fraserelliott/fe-utilities";

export function ToastForm({ title, type }) {
  const { addToastMessage } = useToast();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { message: "" },
  });
  const { styleComponent } = useFEStyles(defaultStyles);

  const onSubmit = ({ message }) => {
    addToastMessage(message, type);
    reset();
  };

  return (
    <div>
      <h2>{title}</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={sx(
          utilities["fe-d-flex"],
          utilities["fe-flex-column"],
          utilities["fe-gap-1"],
        )}
      >
        <label>Message:</label>
        <textarea
          {...styleComponent("InputPrimary", { width: "300px" })}
          {...register("message", { required: true })}
          rows="4"
        />
        <input type="submit" value="Submit" {...styleComponent("BtnPrimary")} />
      </form>
    </div>
  );
}
