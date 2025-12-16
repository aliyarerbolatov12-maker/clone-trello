import { Category } from "@/constant/category.constant";
import type { CompletedSelectProps } from "./completed.types";
import type { CategorySelectProps } from "./category.types";

export interface TaskItemProps {
  id: string;
  name: string;
  completed: boolean;
  category: Category;
  description?: string;
  deadline?: Date;
}

export interface TaskItemFunctionsProps {
  onEdit: (todo: TaskItemProps) => void;
  onDelete: (id: string) => void;
  onToggleCompleted: (id: string) => void;
}

export interface TaskListProps extends TaskItemFunctionsProps {
  tasks: TaskItemProps[];
}

export interface TaskFiltersProps<T> {
  category: CategorySelectProps;
  completed: CompletedSelectProps<T>;
}

export interface TaskDialogProps {
  onSave: (todo: TaskItemProps) => void;
  initialTask?: TaskItemProps;
  mode?: "create" | "edit";
}
