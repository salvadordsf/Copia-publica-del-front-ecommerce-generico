import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerRenderProps } from "react-hook-form";

interface UiSelectProps {
  field: ControllerRenderProps<any, any>;
  placeholder?: string;
  label: string;
  items: { value: string | boolean; label: string, disabled?: boolean }[] | undefined;
  disabled?: boolean;
  defaultValue?: string;
  className?: string;
}

export default function UiSelect({
  field,
  placeholder,
  label,
  items,
  disabled = false,
  className,
  defaultValue,
}: UiSelectProps) {
  if (!items) return <div>Error al crear el select</div>;
  return (
    <div className={className}>
      <Select
        value={field.value ?? ""}
        onValueChange={field.onChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {items.map((item) => (
              <SelectItem disabled={item.disabled} key={`${item.value}`} value={`${item.value}`}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
