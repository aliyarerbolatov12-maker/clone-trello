import { useState, useEffect } from "react";
import {
  Select as SelectScadnc,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SelectProps } from "@/types/select.types";

export function Select<T>({
  value,
  defaultValue,
  options,
  title,
  onChange,
}: SelectProps<T>) {
  const [selectedValue, setSelectedValue] = useState<T>(value ?? defaultValue);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleChange = (label: string) => {
    const selected = options.find((o) => o.label === label);
    if (selected) {
      setSelectedValue(selected.value);
      onChange(selected.value);
    }
  };

  const selectedLabel =
    options.find((o) => o.value === selectedValue)?.label ?? "";

  return (
    <SelectScadnc value={selectedLabel} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select element" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {options.map((opt) => (
            <SelectItem key={String(opt.value)} value={opt.label}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectScadnc>
  );
}
