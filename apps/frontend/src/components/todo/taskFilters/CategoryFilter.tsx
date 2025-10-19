import { Select } from "@/components/customUI/Select";
import { Category, Categories } from "@/constant/category.constant";

type CategoryFilterProps = {
  value: Category | "All";
  onChange: (value: Category | "All") => void;
};

export default function CategoryFilter({
  value,
  onChange,
}: CategoryFilterProps) {
  return (
    <Select<Category | "All">
      title="Category"
      defaultValue="All"
      elements={["All", ...Categories]}
      value={value}
      onChange={onChange}
    />
  );
}
