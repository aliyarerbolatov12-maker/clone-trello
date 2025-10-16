import { type TaskItemProps } from "@/types/task.types";
import TaskDialog from "./TaskDialog";

export function TaskEdit({
  onSave,
  task,
}: {
  onSave: (todo: TaskItemProps) => void;
  task: TaskItemProps;
}) {
  return <TaskDialog onSave={onSave} mode="edit" initialTask={task} />;
}
