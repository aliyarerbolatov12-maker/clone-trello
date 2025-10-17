"use client";

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

type SelectProps<T> = {
  value?: T;
  defaultValue: T;
  elements: T[];
  title: string;
  onChange: (value: T) => void;
};

export function Select<T>({
  value,
  defaultValue,
  elements,
  title,
  onChange,
}: SelectProps<T>) {
  const [selectedValue, setSelectedValue] = useState<T>(value ?? defaultValue);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleChange = (newValue: string) => {
    // преобразуем строку обратно в тип T
    const parsedValue = elements.find((e) => String(e) === newValue) as T;
    setSelectedValue(parsedValue);
    onChange(parsedValue);
  };

  return (
    <SelectScadnc value={String(selectedValue)} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select element" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {elements.map((e) => (
            <SelectItem key={String(e)} value={String(e)}>
              {String(e).charAt(0).toUpperCase() + String(e).slice(1)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectScadnc>
  );
}
