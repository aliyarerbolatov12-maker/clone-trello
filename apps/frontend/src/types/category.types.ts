import type { Category } from "@/constant/category.constant";

export type CategorySelectProps = {
  value: Category;
  onChange: (value: Category) => void;
  exclude?: Category[];
};
