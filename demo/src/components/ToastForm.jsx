import { useForm } from "react-hook-form";
import { useToast } from "@fraserelliott/fe-components";
import { UI } from "@styles";

export function ToastForm({ title, type }) {
  const { addToastMessage } = useToast();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { message: "" },
  });

  const onSubmit = ({ message }) => {
    addToastMessage(message, type);
    reset();
  };

  return (
    <div>
      <h2>{title}</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fe-d-flex fe-flex-column fe-gap-1"
      >
        <label>Message:</label>
        <textarea
          {...register("message", { required: true })}
          style={{ width: "300px" }}
          rows="4"
        />
        <input type="submit" value="Submit" className={UI.BtnPrimary()} />
      </form>
    </div>
  );
}
