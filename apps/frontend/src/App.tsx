import { useState } from "react";
import "./App.css";
import { type TaskItemProps } from "./types/task.types";
import TaskList from "./components/todo/TaskList";
import { TaskCreate } from "./components/todo/dialogs/TaskCreate";
import { Category } from "./constant/category.constant";
import TaskFilters from "./components/todo/TaskFilters";

function App() {
  const [tasks, setTasks] = useState<TaskItemProps[]>([]);

  const [filterCategory, setFilterCategory] = useState<Category | "All">("All");

  const completedOptions = [
    { label: "All", value: "All" as const },
    { label: "Done", value: true },
    { label: "Not done", value: false },
  ] as const;
  type CompletedFilter = (typeof completedOptions)[number]["value"];
  const [filterCompleted, setFilterCompleted] =
    useState<CompletedFilter>("All");

  const filterTasks = (task: TaskItemProps) => {
    const matchCategory =
      filterCategory === "All" || task.category === filterCategory;
    const matchCompleted =
      filterCompleted === "All" || task.completed === filterCompleted;
    return matchCategory && matchCompleted;
  };

  const handleDelete = (id: string) => {
    setTasks((tasks) => tasks.filter((t) => t.id !== id));
  };

  const handleEdit = (updatedTodo: TaskItemProps) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
    );
  };

  const onToggleCompleted = (id: string) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      <TaskFilters
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterCompleted={filterCompleted}
        setFilterCompleted={setFilterCompleted}
        completedOptions={completedOptions}
      />

      <div className="flex flex-col gap-4">
        <TaskList
          onDelete={handleDelete}
          onEdit={handleEdit}
          onToggleCompleted={onToggleCompleted}
          tasks={tasks.filter(filterTasks)}
        />
      </div>

      <TaskCreate
        onSave={(newTask) => {
          setTasks((prev) => [
            ...prev,
            { ...newTask, id: crypto.randomUUID() },
          ]);
        }}
      />
    </div>
  );
}

export default App;
