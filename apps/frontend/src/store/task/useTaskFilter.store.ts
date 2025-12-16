import { create } from "zustand";
import { Category } from "@/constant/category.constant";
import type { FilterState } from "@/types/store/taskFilterStore.types";
import {
  CompletedSelect,
  completedOptions,
} from "@/constant/completed.constant";

export const useFilterStore = create<FilterState>((set) => ({
  categorySelect: Category.All,
  completedSelect: CompletedSelect.All,
  completedOptions,

  setCategorySelect: (category) => set({ categorySelect: category }),
  setCompletedSelect: (completed) => set({ completedSelect: completed }),
}));
