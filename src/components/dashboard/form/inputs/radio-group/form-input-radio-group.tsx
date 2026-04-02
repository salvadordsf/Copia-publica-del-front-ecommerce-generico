import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ControllerRenderProps } from "react-hook-form";

interface IUiRadioGroup {
	field: ControllerRenderProps;
	items: {
		value: string,
		label: string,
	}[]
}

export default function UiRadioGroup({field, items}: IUiRadioGroup) {
  return (
    <Label>
      <RadioGroup value={field.value} onValueChange={field.onChange} defaultValue={items[0].value}>
        {items.map((item) => (
          <div key={item.value} className="flex items-center space-x-2">
            <RadioGroupItem value={item.value} id={item.value} />
            <Label htmlFor={item.value}>{item.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </Label>
  );
}