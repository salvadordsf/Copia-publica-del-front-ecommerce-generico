import {
  Controller,
  FieldError,
  FieldValues,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";
import { IGenericFormProps } from "./generic-create-form.types";
import UiSelect from "../inputs/select/form-input-select";
import UiTextarea from "../inputs/textarea/form-input-textarea";
import UiRadioGroup from "../inputs/radio-group/form-input-radio-group";
import UiSlider from "../inputs/slider/form-input-slider";
import { Input } from "@/components/ui/input";
import { FormError } from "../form-error-input";
import MethodsBtns from "../../btns/btn-request-method";
import ToggleCreateTagInput from "@/features/admin/tags/components/create/tags-toggle-create-input";

export default function GenericForm<TFormValues>({
  fields,
  submitButtonText,
  submitButtonType,
  btnClassName,
  onSubmitAction,
  className,
}: IGenericFormProps<TFormValues>) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <form
      onSubmit={handleSubmit(onSubmitAction as SubmitHandler<FieldValues>)}
      className={className ? className : `flex flex-col gap-4 max-w-2xl`}
    >
      {fields.map((field, i) => {
        const dependentValue: string | undefined = field.dependsOn
          ? watch(field.dependsOn)
          : undefined;
        const isDisabled = Boolean(field.dependsOn && !dependentValue);

        const error = errors[field.name];
        const isFieldError =
          error && typeof error === "object" && "type" in error;

        //Subcategory depends on category select options filter system
        let fieldOptions = field.options;
        if (field.name === "subcategoryId" && field.dependsOn) {
          fieldOptions = field.options?.filter(
            (option) => option?.categoryId === dependentValue,
          );
        }

        return (
          <div
            key={`${field.name}-${i}`}
            className={`${
              field.className ? field.className : ""
            } flex flex-col`}
          >
            <label className="flex flex-col gap-2 mt-1 text-sm text-gray-700">
              <span className="font-semibold">{field.label}</span>

              {field.type === "select" ? (
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: controllerField }) => (
                    <UiSelect
                      disabled={isDisabled}
                      field={controllerField}
                      placeholder={field.placeholder}
                      label={field.selectLabel as string}
                      items={fieldOptions?.map((option) => ({
                        value: option.value,
                        label: option.label,
                        disabled: option.disabled ?? false,
                      }))}
                    />
                  )}
                />
              ) : field.type === "textarea" ? (
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: controllerField }) => (
                    <UiTextarea
                      field={controllerField}
                      placeholder={field.placeholder || "Escribir aquí..."}
                    />
                  )}
                />
              ) : field.type === "radio group" ? (
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: controllerField }) => (
                    <UiRadioGroup
                      field={controllerField}
                      items={
                        field.options as { value: string; label: string }[]
                      }
                    />
                  )}
                />
              ) : field.type === "toggle tag" ? (
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: controllerField }) => (
                    <ToggleCreateTagInput
                      initialValue={(field.defaultValue as string[] | undefined) ?? []}
                      value={controllerField.value ?? []}
                      onChangeAction={controllerField.onChange}
                    />
                  )}
                />
              ) : field.type === "slider" ? (
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: controllerField }) => (
                    <UiSlider
                      field={controllerField}
                      defaultValue={field.defaultValue as number}
                      min={field.min as number}
                      max={field.max as number}
                      step={field.step}
                      uxMinMax={field?.ux?.uxMinMax}
                      uxSteps={field?.ux?.uxSteps}
                    />
                  )}
                />
              ) : (
                <Input
                  type={field.type}
                  {...register(
                    field.name,
                    field.type === "number" ? { valueAsNumber: true } : {},
                  )}
                  placeholder={field.placeholder}
                  disabled={isDisabled}
                  min={field.min}
                  max={field.max}
                />
              )}
            </label>

            {isFieldError && <FormError error={error as FieldError} />}
          </div>
        );
      })}
      <div className={btnClassName}>
        <div className="flex justify-between space-x-4">
          {submitButtonText && (
            <MethodsBtns selectedType={submitButtonType}>
              {submitButtonText}
            </MethodsBtns>
          )}
        </div>
      </div>
    </form>
  );
}
