import { Controller, FieldError, useFormContext } from "react-hook-form";
import { FormError } from "../form-error-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UiSelect from "../inputs/select/form-input-select";
import UiSlider from "../inputs/slider/form-input-slider";
import { IGenericSearchFormProps } from "./generic-search-form.types";
import { RotateCcw, Search } from "lucide-react";
import { Funnel, FunnelX } from "lucide-react";
import { useState } from "react";
import UiRadioGroup from "../inputs/radio-group/form-input-radio-group";

export default function GenericSearchForm({
  defaultFields,
  filtersFields,
  className,
  children,
  resetFiltersAction,
  onSubmitAction,
}: IGenericSearchFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    setValue,
  } = useFormContext();

  //toggle open filters
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  console.log(filtersFields);
  return (
    <form
      onSubmit={handleSubmit(onSubmitAction)}
      className={className ? className : "flex flex-col gap-4 pb-4 border-b-1"}
    >
      {/*rendering default inputs*/}
      {defaultFields.map((field, i) => (
        <div
          key={`${field.name}-${i}`}
          className={`${field.className ? field.className : ""}`}
        >
          <label className="flex flex-col mt-1 text-sm text-gray-700">
            <span className="font-semibold">{field.label && field.label}</span>

            {/*conditional rendering default inputs by type*/}
            {field.type === "search bar" ? (
              <div className="flex gap-2">
                <Input
                  type="text"
                  {...register(field.name)}
                  placeholder={field.placeholder}
                  min={field.min}
                  max={field.max}
                />
                <Button
                  type="submit"
                  className="cursor-pointer bg-method-get hover:bg-method-get/90"
                >
                  <Search />
                </Button>

                {/*filters btn*/}
                {filtersFields.length > 0 && (
                  <Button
                    variant={!openFilters ? "default" : "destructive"}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      if (openFilters) {
                        resetFiltersAction();
                      }
                      setOpenFilters((prev) => !prev);
                    }}
                  >
                    {!openFilters ? <Funnel /> : <FunnelX />}
                  </Button>
                )}
              </div>
            ) : field.type === "sorter" ? (
              <div className="flex gap-4">
                <label className="w-[58%] max-w-[58%]">
                  <span className="font-semibold">Ordenar por</span>
                  <Controller
                    name="sortBy"
                    control={control}
                    render={({ field: controllerField }) => (
                      <UiSelect
                        field={controllerField}
                        placeholder="Seleccionar"
                        label={field.selectLabel as string}
                        items={field.options?.map((option) => ({
                          value: option.value,
                          label: option.label,
                          disabled: false,
                        }))}
                        disabled={false}
                        defaultValue={field.defaultValue}
                      />
                    )}
                  />
                </label>
                <label className="w-[42%] max-w-[42%]">
                  <span className="font-semibold">Orden</span>
                  <Controller
                    name="sortOrder"
                    control={control}
                    render={({ field: controllerField }) => (
                      <UiSelect
                        field={controllerField}
                        placeholder="Asc - Desc"
                        label={`Asc - Desc`}
                        items={[
                          { value: "asc", label: "Asc", disabled: false },
                          { value: "desc", label: "Desc", disabled: false },
                        ].map((option) => ({
                          value: option.value,
                          label: option.label,
                          disabled: false,
                        }))}
                        disabled={false}
                        defaultValue="desc"
                      />
                    )}
                  />
                </label>
              </div>
            ) : (
              field.type === "status" && (
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: controllerField }) => (
                    <UiSelect
                      field={controllerField}
                      placeholder={field.placeholder}
                      label={field.selectLabel as string}
                      items={field.options?.map((option) => ({
                        value: option.value,
                        label: option.label,
                        disabled: false,
                      }))}
                      disabled={false}
                      defaultValue={field.defaultValue}
                    />
                  )}
                />
              )
            )}
          </label>
        </div>
      ))}

      {/*Children in case you need to add an input/component for greater flexibility and scaling*/}
      {children}

      {/*Field mapping with dependency configuration and respective validations, disabling, error sampling, creating options if necessary + conditional rendering of inputs by type*/}
      {filtersFields.map((field, i) => {
        //Configuring dependent fields + disabling fields + configuring available options based on dependencies
        const dependentValue: string | undefined = field.dependsOn
          ? watch(field.dependsOn)
          : undefined;

        const isDisabled = Boolean(field.dependsOn && !dependentValue);

        //Subcategory depends on category select options filter + validating system
        let fieldOptions = field.options;
        if (field.name === "subcategoryId" && field.dependsOn) {
          fieldOptions = field.options?.filter(
            (option) => option.categoryId === dependentValue
          );

          const currentValue = watch(field.name);
          const stillValid = fieldOptions?.some(
            (option) => option.value === currentValue
          );

          if (!stillValid && currentValue !== undefined) {
            setValue("subcategoryId", undefined);
          }
        }

        //error detection and sampling
        const error = errors[field.name];
        const isFieldError =
          error && typeof error === "object" && "type" in error;

        return (
          <div
            key={`${field.name}-${i}`}
            className={`${
              openFilters
                ? "opacity-100 translate-y max-h-[1000px]"
                : "opacity-0 -translate-y-[20%] max-h-0"
            } ${field.className ? field.className : ""} transition-all`}
          >
            <label
              className={`flex flex-col gap-0.5 mt-1 text-sm text-gray-700 ${
                isDisabled && "opacity-50"
              }`}
            >
              <div className="flex justify-center items-center gap-3 border-1 border-neutral-300 rounded-t-4xl bg-gray-200 font-semibold text-xs">
                {field.label}
                {
                  <RotateCcw
                    width={15}
                    color="green"
                    className="cursor-pointer hover:-rotate-45 transition-all"
                    onClick={() => {
                      let fieldName = field.name;
                      switch (field.name) {
                        case "price":
                          setValue("priceMin", undefined);
                          setValue("priceMax", undefined);
                          break;
                        case "relevance":
                          setValue("relevance", "0");
                          break;
                        default:
                          console.log(field.name, field.defaultValue);
                          setValue(field.name, undefined);
                          break;
                      }
                    }}
                  />
                }
              </div>

              {field.type === "select" ? (
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: controllerField }) => (
                    <UiSelect
                      field={controllerField}
                      placeholder={field.placeholder}
                      label={field.selectLabel as string}
                      items={fieldOptions?.map((option) => ({
                        value: option.value,
                        label: option.label,
                        disabled: false,
                      }))}
                      disabled={isDisabled}
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
              ) : field.type === "slider" ? (
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: controllerField }) => (
                    <UiSlider
                      field={controllerField}
                      defaultValue={field.defaultValue}
                      min={field.min as number}
                      max={field.max as number}
                      step={field.step}
                      uxMinMax={field?.ux?.uxMinMax}
                      uxSteps={field?.ux?.uxSteps}
                    />
                  )}
                />
              ) : field.type === "price" ? (
                <div className="flex gap-2">
                  <Input
                    type="number"
                    {...register("priceMin")}
                    placeholder="Mínimo"
                    disabled={isDisabled}
                    min={0}
                    max={999999998}
                  />
                  <div className="border-2 border-neutral-400 h-0.5 w-8 m-auto rounded-2xl"></div>
                  <Input
                    type="number"
                    {...register("priceMax")}
                    placeholder="Máximo"
                    disabled={isDisabled}
                    min={1}
                    max={999999999}
                  />
                </div>
              ) : (
                <Input
                  type={field.type}
                  {...register(
                    field.name,
                    field.type === "number" ? { valueAsNumber: true } : {}
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
    </form>
  );
}
