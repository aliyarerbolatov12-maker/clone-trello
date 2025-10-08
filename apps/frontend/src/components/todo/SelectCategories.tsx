"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Categories, Category } from "@/constant/category.constant";

type Props = {
  onChange: (category: Category) => void;
};

export function SelectCategories({ onChange }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    Category.None
  );

  const handleChange = (value: Category) => {
    setSelectedCategory(value);
    onChange(value);
  };

  return (
    <Select value={selectedCategory} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {Categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
