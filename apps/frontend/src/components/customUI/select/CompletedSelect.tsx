import { Select } from "@/components/customUI/select/Select";
import type { CompletedSelectProps } from "@/types/completed.types";

export default function CompletedSelect<T>({
  value,
  onChange,
  options,
}: CompletedSelectProps<T>) {
  return (
    <Select<T>
      title="Completed"
      defaultValue={options[0].value}
      options={options}
      value={value}
      onChange={onChange}
    />
  );
}
