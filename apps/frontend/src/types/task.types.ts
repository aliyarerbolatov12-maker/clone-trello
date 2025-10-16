import { Category } from "@/constant/category.constant";

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
