import { Textarea } from "@/components/ui/textarea"
import { ControllerRenderProps } from "react-hook-form";
 
interface ITextarea {
  field: ControllerRenderProps<any, any>;
  placeholder: string;
}

export default function UiTextarea({ placeholder, field }: ITextarea) {
  return (
    <div className="grid w-full gap-1.5">
      <Textarea value={field.value} onChange={field.onChange} placeholder={placeholder} id="text-area-message" />
    </div>
  )
}