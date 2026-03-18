import { ReactNode } from "react";

export interface GenericFormField {
  className?: string;
  name: string;
  label?: string;
  selectLabel?: string;
  placeholder?: string;
  type: "text" | "number" | "select" | "slider" | "radio group" | "search bar" | "price" | "sorter" | "status";
  options?: {
    value: string;
    label: string;
    disabled?: boolean;
    categoryId?: string;
  }[];
  ux?: {
    uxMinMax?: boolean;
    uxSteps?: boolean;
  };
  defaultValue?: any;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  dependsOn?: string;
}

export interface IGenericSearchFormProps {
  defaultFields: GenericFormField[];
  filtersFields: GenericFormField[];
  className?: string;
  onSubmitAction: (data: any) => void;
  resetFiltersAction: () => void;
  children?: ReactNode;
}
