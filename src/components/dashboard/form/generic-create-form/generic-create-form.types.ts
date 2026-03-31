import { OrderStatus } from "@/types/resources/order-types";
import { TUserRoles } from "@/types/roles/users-roles.types";
import { FieldValues, SubmitHandler } from "react-hook-form";

export interface GenericFormField {
  name: string;
  label: string;
  selectLabel?: string;
  placeholder?: string;
  type:
    | "text"
    | "number"
    | "select"
    | "slider"
    | "textarea"
    | "radio group"
    | "toggle tag";
  options?: {
    value: string | boolean;
    label: string;
    categoryId?: string;
    disabled?: boolean;
  }[];
  ux?: {
    uxMinMax?: boolean;
    uxSteps?: boolean;
  };
  defaultValue?: 
    // for ToggleCreateTagInput input in GenericForm
    (string[] | undefined) | 
    // for UiSlider input in GenericForm
    number | 
    // for OrderStatus input in UpdateOrderDialog + Relevance input in CreateProductForm
    OrderStatus | 
    // for User Role input in UpdateUserDialog
    TUserRoles | 
    // for CategoryId and SubcategoryId inputs in UpdateProductDialog + User name in UpdateUserDialog 
    string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  dependsOn?: string;
  className?: string;
};

export interface IGenericFormProps<TFormValues> {
  fields: GenericFormField[];
  submitButtonText: string;
  submitButtonType: "search" | "create" | "update" | "delete";
  btnClassName?: string;
  onSubmitAction: SubmitHandler<FieldValues> | ((data: TFormValues) => void) | (() => void);
  isError?: boolean;
  serverError?: { status: number } | unknown;
  className?: string;
}