import { useMemo } from "react";
import { useTasksStore } from "@/store/task/useTasks.store";
import { useFilterStore } from "@/store/task/useTaskFilter.store";
import { Category } from "../constant/category.constant";
import { CompletedSelect } from "../constant/completed.constant";
import { type TaskItemProps } from "../types/task.types";

export const useFilteredTasks = (): TaskItemProps[] => {
  const tasks = useTasksStore((state) => state.tasks);

  const { categorySelect, completedSelect } = useFilterStore();

  const selectedTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchCategory =
        categorySelect === Category.All || task.category === categorySelect;

      const matchCompleted =
        completedSelect === CompletedSelect.All ||
        task.completed === completedSelect;

      return matchCategory && matchCompleted;
    });
  }, [tasks, categorySelect, completedSelect]);

  return selectedTasks;
};
