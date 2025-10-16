import TaskDialog from "./TaskDialog";
import { type TaskItemProps } from "@/types/task.types";

export function TaskCreate({
  onSave,
}: {
  onSave: (todo: TaskItemProps) => void;
}) {
  return <TaskDialog onSave={onSave} mode="create" />;
}
