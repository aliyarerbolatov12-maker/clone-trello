import { useState } from "react";
import "./App.css";
import { Categories } from "./constant/category.constant";
import { type TodoItemProps } from "./types/todo.types";
import TodoList from "./components/todo/TodoList";
import TodoDialog from "./components/todo/TodoDialog";

function App() {
  const [tasks, setTasks] = useState<TodoItemProps[]>([
    {
      id: "1",
      name: "Buy milk",
      completed: true,
      description: "2 liters of milk",
      deadline: new Date("2026-06-12T09:30"),
      categories: Categories,
    },
    {
      id: "2",
      name: "Do homework",
      completed: false,
      description: "Math exercises",
      deadline: new Date("2026-06-13T18:45"),
      categories: Categories,
    },
  ]);

  const handleDelete = (id: string) => {
    setTasks((tasks) => tasks.filter((t) => t.id != id));
  };

  const handleEdit = (id: string) => {
    console.log(id);
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
        <TodoList
          onDelete={handleDelete}
          onEdit={handleEdit}
          onToggleCompleted={onToggleCompleted}
          tasks={tasks}
        />
      </div>
      <TodoDialog
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
