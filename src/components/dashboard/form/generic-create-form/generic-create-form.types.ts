export interface GenericFormField {
  name: string;
  label: string;
  selectLabel?: string;
  placeholder?: string;
  type: "text" | "number" | "select" | "slider" | "textarea" | "radio group" | "toggle tag";
  options?: {
    value: string;
    label: string;
    categoryId?: string;
    disabled?: boolean;
  }[];
  ux?: {
    uxMinMax?: boolean;
    uxSteps?: boolean;
  }
  defaultValue?: any;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  dependsOn?: string;
  className?: string;
};

export interface IGenericFormProps {
  fields: GenericFormField[];
  submitButtonText: string;
  submitButtonType: "search" | "create" | "update" | "delete";
  btnClassName?: string;
  onSubmitAction: (data: any) => void;
  isError?: boolean;
  serverError?: { status: number } | any;
  className?: string;
}