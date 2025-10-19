import { Select } from "@/components/customUI/Select";

type CompletedFilterProps<CompletedFilterType> = {
  value: CompletedFilterType;
  onChange: (value: CompletedFilterType) => void;
  options: readonly { label: string; value: CompletedFilterType }[];
};

export default function CompletedFilter<CompletedFilterType>({
  value,
  onChange,
  options,
}: CompletedFilterProps<CompletedFilterType>) {
  return (
    <Select<string>
      title="Completed"
      defaultValue="All"
      elements={options.map((o) => o.label)}
      value={options.find((o) => o.value === value)?.label ?? "All"}
      onChange={(label) => {
        const selected = options.find((o) => o.label === label);
        if (selected) onChange(selected.value);
      }}
    />
  );
}
