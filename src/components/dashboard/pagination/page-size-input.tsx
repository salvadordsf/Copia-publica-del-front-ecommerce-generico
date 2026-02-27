"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IUiPageSize {
  className?: string;
  pageSize: number;
  onPageSizeAction: (pageSize: number) => void;
}

export default function UiPageSize({
  pageSize,
  onPageSizeAction,
  className = "",
}: IUiPageSize) {
  return (
    <Label className={className}>
      Cant. de resultados
      <Select
        onValueChange={(val) => onPageSizeAction(Number(val))}
        defaultValue={String(pageSize)}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Cant. de resultados</SelectLabel>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Label>
  );
}
