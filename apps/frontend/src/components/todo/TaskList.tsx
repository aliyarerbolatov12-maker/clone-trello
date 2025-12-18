import type { TaskListProps } from "@/types/task.types";
import TaskItem from "./TaskItem";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useTasksStore } from "@/store/task/useTasks.store";

export default function TaskList({
  tasks,
  onDelete,
  onEdit,
  onToggleCompleted,
}: TaskListProps) {
  const reorderTasks = useTasksStore((state) => state.reorderTasks);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((t) => t.id === active.id);
    const newIndex = tasks.findIndex((t) => t.id === over.id);

    reorderTasks(oldIndex, newIndex);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks.map((t) => t.id)}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            {...task}
            onDelete={onDelete}
            onEdit={onEdit}
            onToggleCompleted={onToggleCompleted}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
