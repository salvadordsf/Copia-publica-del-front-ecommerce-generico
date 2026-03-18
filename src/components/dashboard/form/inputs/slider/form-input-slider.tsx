"use client";

import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

interface UiSliderProps {
  field: ControllerRenderProps<any, any>;
  defaultValue: number;
  min: number;
  max: number;
  step?: number;
  uxMinMax?: boolean;
  uxSteps?: boolean;
}

export default function UiSlider({
  field,
  defaultValue,
  min,
  max,
  step = 1,
  uxMinMax = true,
  uxSteps = false,
}: UiSliderProps) {
  const [value, setValue] = useState(defaultValue);

  const totalSteps = Math.floor((max - min) / step) + 1;
  const marks = Array.from({ length: totalSteps }, (_, i) => min + i * step);

  return (
    <div className="w-full space-y-2">
      {/* MIN MAX VALUES */}
      {uxMinMax && <div className="flex justify-between text-sm text-muted-foreground">
        <span>{min}</span>
        <span>{max}</span>
      </div>}

      <Slider
        className="cursor-pointer"
        value={[field.value]}
        onValueChange={(val) => {
          setValue(val[0]);
          field.onChange(val[0]);
        }}
        defaultValue={[defaultValue]}
        min={min}
        max={max}
        step={step}
      />

      {/* Dynamic marks */}
      {uxSteps && <div className="flex justify-between text-xs text-muted-foreground px-1">
        {marks.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>}
      
      {/* Selected value */}
      <div className="text-center text-sm text-muted-foreground">
        Valor seleccionado:{" "}
        <span className="font-medium text-foreground">{value}</span>
      </div>
    </div>
  );
}
