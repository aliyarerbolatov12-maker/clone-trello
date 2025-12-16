import { type TaskItemProps } from "@/types/task.types";

export interface TasksState {
  tasks: TaskItemProps[];

  addTask: (task: Omit<TaskItemProps, "id">) => void;
  deleteTask: (id: string) => void;
  editTask: (updatedTask: TaskItemProps) => void;
  toggleCompleted: (id: string) => void;
}
