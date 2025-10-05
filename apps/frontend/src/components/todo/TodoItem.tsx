import type { TodoItemFunctionsProps, TodoItemProps } from "@/types/todo.types";

interface TodoProps extends TodoItemProps, TodoItemFunctionsProps {}

export default function TodoItem({
  id,
  name,
  description,
  deadline,
  category: category,
  completed,
  onDelete,
  onEdit,
  onToggleCompleted,
}: TodoProps) {
  return (
    <article className="shadow-[0px_5px_10px_2px_rgba(0,0,0,0.2)] flex items-center justify-between min-h-[4rem] p-4">
      <div className="flex gap-y-2 gap-x-4">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggleCompleted(id)}
        />
        <div>
          <h3 className={`font-semibold ${completed ? "line-through" : ""}`}>
            {name}
          </h3>
          {description && (
            <p className="text-sm text-gray-700">{description}</p>
          )}
          <div className="flex gap-x-8 text-sm text-gray-600">
            {deadline && <p>Deadline: {deadline.toLocaleString()}</p>}
            {category.length > 0 && <p>Categories: {category}</p>}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded"
          onClick={() => onEdit(id)}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
