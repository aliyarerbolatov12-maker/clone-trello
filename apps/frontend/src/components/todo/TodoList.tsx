import type { TodoListProps } from "@/types/todo.types";
import TodoItem from "./TodoItem";

export default function TodoList({
  onDelete,
  onEdit,
  onToggleCompleted,
  tasks,
}: TodoListProps) {
  return (
    <>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          id={task.id}
          name={task.name}
          completed={task.completed}
          description={task.description}
          deadline={task.deadline}
          categories={task.categories}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleCompleted={onToggleCompleted}
        />
      ))}
    </>
  );
}
