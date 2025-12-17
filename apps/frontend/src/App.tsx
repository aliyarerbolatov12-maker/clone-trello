import "./App.css";
import TaskList from "./components/todo/TaskList";
import { TaskCreate } from "./components/todo/dialogs/TaskCreate";
import TaskFilters from "./components/todo/TaskFilters";

import { useTasksStore } from "@/store/task/useTasks.store";
import { useFilterStore } from "@/store/task/useTaskFilter.store";
import { useFilteredTasks } from "@/hooks/useFilteredTasks";
import ProgressBar from "./components/customUI/ProgressBar";

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

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="App p-6">
      <h1 className="text-2xl font-bold mb-6">My Tasks</h1>

      <div className="w-full max-w-lg mx-auto mb-4">
        <div className="font-medium mb-1 text-gray-700">Progress</div>
        <ProgressBar progress={progress} />
      </div>

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

      <div className="flex flex-col gap-4 mb-8">
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
