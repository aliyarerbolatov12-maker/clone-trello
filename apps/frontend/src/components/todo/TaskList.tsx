import type { TaskListProps } from "@/types/task.types";
import TaskItem from "./TaskItem";

export default function TaskList({
  onDelete,
  onEdit,
  onToggleCompleted,
  tasks,
}: TaskListProps) {
  return (
    <>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          name={task.name}
          completed={task.completed}
          description={task.description}
          deadline={task.deadline}
          category={task.category}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleCompleted={onToggleCompleted}
        />
      ))}
    </>
  );
}
