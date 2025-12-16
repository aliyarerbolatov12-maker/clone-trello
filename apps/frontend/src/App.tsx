import "./App.css";
import TaskList from "./components/todo/TaskList";
import { TaskCreate } from "./components/todo/dialogs/TaskCreate";
import TaskFilters from "./components/todo/TaskFilters";

import { useTasksStore } from "@/store/task/useTasks.store";
import { useFilterStore } from "@/store/task/useTaskFilter.store";
import { useFilteredTasks } from "@/hooks/useFilteredTasks";

function App() {
  const tasks = useFilteredTasks();

  const addTask = useTasksStore((state) => state.addTask);
  const deleteTask = useTasksStore((state) => state.deleteTask);
  const editTask = useTasksStore((state) => state.editTask);
  const toggleCompleted = useTasksStore((state) => state.toggleCompleted);

  const {
    categorySelect,
    completedSelect,
    completedOptions,
    setCategorySelect,
    setCompletedSelect,
  } = useFilterStore();

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      <TaskFilters
        category={{
          value: categorySelect,
          onChange: setCategorySelect,
        }}
        completed={{
          value: completedSelect,
          onChange: setCompletedSelect,
          options: completedOptions,
        }}
      />

      <div className="flex flex-col gap-4">
        <TaskList
          onDelete={deleteTask}
          onEdit={editTask}
          onToggleCompleted={toggleCompleted}
          tasks={tasks}
        />
      </div>

      <TaskCreate onSave={addTask} />
    </div>
  );
}

export default App;
