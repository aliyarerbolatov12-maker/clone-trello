import type { TaskFiltersProps } from "@/types/task.types";
import CategorySelect from "../customUI/select/CategorySelect";
import CompletedSelect from "../customUI/select/CompletedSelect";

export default function TaskFilters<CompletedFilterType>({
  category,
  completed,
}: TaskFiltersProps<CompletedFilterType>) {
  return (
    <div className="flex gap-4 mb-6">
      <CategorySelect {...category} />
      <CompletedSelect {...completed} />
    </div>
  );
}
