import type { TaskItemProps, TaskItemFunctionsProps } from "@/types/task.types";
import { TaskEdit } from "./dialogs/TaskEdit";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { formatDeadline } from "@/helpers/date";

interface TodoProps extends TaskItemProps, TaskItemFunctionsProps {}

export default function TaskItem({
  id,
  name,
  description,
  deadline,
  category,
  completed,
  onDelete,
  onEdit,
  onToggleCompleted,
}: TodoProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: completed ? 0.5 : 1,
  };

  const task: TaskItemProps = {
    id,
    name,
    description,
    deadline,
    category,
    completed,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className="shadow-[0px_5px_10px_2px_rgba(0,0,0,0.2)] flex flex-col sm:flex-row justify-between min-h-[4rem] p-4 gap-2 sm:gap-4"
    >
      <div className="flex items-start sm:items-center gap-3 sm:gap-4 w-full">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggleCompleted(id)}
          onPointerDown={(e) => e.stopPropagation()}
          className="w-5 h-5 hrink-0 mt-1 sm:mt-0"
        />

        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-base sm:text-lg truncate ${
              completed ? "line-through" : ""
            }`}
          >
            {name}
          </h3>

          {description && (
            <p className="text-sm text-gray-700 mt-1 line-clamp-2">
              {description}
            </p>
          )}

          <div className="flex flex-wrap gap-x-4 text-sm text-gray-600 mt-1">
            {deadline && (
              <p className="truncate">Deadline: {formatDeadline(deadline)}</p>
            )}
            {category.length > 0 && (
              <p className="truncate">Category: {category}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        <TaskEdit task={task} onSave={onEdit} />
        <button
          className="h-9 px-3 sm:px-4 bg-red-500 text-white rounded flex items-center justify-center text-sm sm:text-base"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
        <span
          {...attributes}
          {...listeners}
          style={{ cursor: "grab", touchAction: "none" }}
          className="text-gray-500 select-none text-xl"
        >
          ⠿
        </span>
      </div>
    </article>
  );
}
