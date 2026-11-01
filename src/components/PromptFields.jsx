import { defaultStyles } from "../styling/defaultStyle";
import { useFEStyles } from "../styling/FEStyle";
import { useState } from "react";

/**
 * Renders a collection of form fields with optional on-blur validation feedback.
 *
 * Each field is registered using the supplied register function. Validation
 * callbacks return an object containing a validity flag and an optional reason,
 * displayed as green or red feedback text.
 *
 * Validation feedback is independent of form submission, which remains the
 * responsibility of the parent form.
 *
 * @param {Object} props
 * @param {Array<{name: string, label: string, showErrorBorder: boolean, validate?: (value: string) => {valid: boolean, reason?: string}}>} props.fields
 *   Configuration for the fields to render.
 * @param {Function} props.register
 *   Function used to register each field with the parent form (e.g. React Hook Form's register).
 */
export function PromptFields({ fields, register, style, className }) {
  const { styleComponent } = useFEStyles(defaultStyles, style, className);
  const [validation, setValidation] = useState({});

  const styleValidation = (field) => {
    const valid = validation[field.name]?.valid ?? null;

    if (!field.validate || valid == null) return {};
    if (valid) return styleComponent("TextConfirm");
    return styleComponent("TextDanger");
  };

  return (
    <div {...styleComponent("FormFields")}>
      {fields.map((field) => (
        <label {...styleComponent("FormLabel")} key={field.name}>
          {field.label}
          <input
            {...styleComponent(
              "InputPrimary",
              field.showErrorBorder && validation[field.name]?.valid === false
                ? { border: "1px solid var(--fec-danger, #d9534f)" }
                : {},
            )}
            {...register(field.name, {
              onBlur: (event) => {
                if (!field.validate) return;
                setValidation((prev) => ({
                  ...prev,
                  [field.name]: field.validate(event.target.value),
                }));
              },
              onChange: () =>
                field.validate &&
                setValidation((prev) => ({ ...prev, [field.name]: null })),
            })}
          />
          {field.validate && (
            <div {...styleComponent("FieldValidation")}>
              {validation[field.name]?.valid != null && (
                <p {...styleValidation(field)}>
                  {validation[field.name]?.reason ?? ""}
                </p>
              )}
            </div>
          )}
        </label>
      ))}
    </div>
  );
}
