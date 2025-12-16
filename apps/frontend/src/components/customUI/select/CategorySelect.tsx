import { Select } from "@/components/customUI/select/Select";
import { Category, Categories } from "@/constant/category.constant";
import type { CategorySelectProps } from "@/types/category.types";

export default function CategorySelect({
  value,
  onChange,
  exclude = [],
}: CategorySelectProps) {
  const options: { value: Category; label: string }[] = Categories.filter(
    (e) => !exclude.includes(e)
  ).map((e) => ({ value: e, label: e }));

  return (
    <Select<Category>
      title="Category"
      options={options}
      value={value}
      defaultValue={options[0]?.value ?? Categories[0]}
      onChange={onChange}
    />
  );
}
