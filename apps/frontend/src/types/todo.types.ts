import { Category } from "@/constant/category.constant";

export interface TodoItemProps {
  id: string;
  name: string;
  completed: boolean;
  categories: Category[];
  description?: string;
  deadline?: Date;
}

export interface TodoItemFunctionsProps {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleCompleted: (id: string) => void;
}

export interface TodoListProps extends TodoItemFunctionsProps {
  tasks: TodoItemProps[];
}
