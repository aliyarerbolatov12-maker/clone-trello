import type { Category } from "@/constant/category.constant";
import {
  completedOptions,
  type CompletedValueSelect,
} from "@/constant/completed.constant";

export interface FilterState {
  categorySelect: Category;
  completedSelect: CompletedValueSelect;
  completedOptions: typeof completedOptions;

  setCategorySelect: (category: Category) => void;
  setCompletedSelect: (completed: CompletedValueSelect) => void;
}
