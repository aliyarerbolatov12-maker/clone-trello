import CategoryFilter from "./taskFilters/CategoryFilter";
import CompletedFilter from "./taskFilters/CompletedFilter";
import { Category } from "@/constant/category.constant";

type TaskFiltersProps<CompletedFilterType> = {
  filterCategory: Category | "All";
  setFilterCategory: (value: Category | "All") => void;
  filterCompleted: CompletedFilterType;
  setFilterCompleted: (value: CompletedFilterType) => void;
  completedOptions: readonly { label: string; value: CompletedFilterType }[];
};

export default function TaskFilters<CompletedFilterType>({
  filterCategory,
  setFilterCategory,
  filterCompleted,
  setFilterCompleted,
  completedOptions,
}: TaskFiltersProps<CompletedFilterType>) {
  return (
    <div className="flex gap-4 mb-6">
      <CategoryFilter value={filterCategory} onChange={setFilterCategory} />
      <CompletedFilter
        value={filterCompleted}
        onChange={setFilterCompleted}
        options={completedOptions}
      />
    </div>
  );
}
