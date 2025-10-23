import "./App.css";
import TaskList from "./components/todo/TaskList";
import { TaskCreate } from "./components/todo/dialogs/TaskCreate";
import TaskFilters from "./components/todo/TaskFilters";
import { useTaskStore } from "./store/taskStore";

function App() {
  const {
    getFilteredTasks,
    addTask,
    deleteTask,
    editTask,
    toggleCompleted,
    filterCategory,
    filterCompleted,
    completedOptions,
    setFilterCategory,
    setFilterCompleted,
  } = useTaskStore();

  const tasks = getFilteredTasks();

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
