import { useState } from "react";
import "./App.css";
import { Category } from "./constant/category.constant";
import { type TaskItemProps } from "./types/task.types";
import TaskList from "./components/todo/TaskList";
import { TaskCreate } from "./components/todo/dialogs/TaskCreate";

function App() {
  const [tasks, setTasks] = useState<TaskItemProps[]>([
    {
      id: "1",
      name: "Buy milk",
      completed: true,
      description: "2 liters of milk",
      deadline: new Date("2026-06-12T09:30"),
      category: Category.Work,
    },
    {
      id: "2",
      name: "Do homework",
      completed: false,
      description: "Math exercises",
      deadline: new Date("2026-06-13T18:45"),
      category: Category.None,
    },
  ]);

  const handleDelete = (id: string) => {
    setTasks((tasks) => tasks.filter((t) => t.id != id));
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
      <div className="flex flex-col gap-4">
        <TaskList
          onDelete={handleDelete}
          onEdit={handleEdit}
          onToggleCompleted={onToggleCompleted}
          tasks={tasks}
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
