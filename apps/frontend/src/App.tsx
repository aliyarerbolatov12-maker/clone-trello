import "./App.css";
import TaskList from "./components/todo/TaskList";
import { TaskCreate } from "./components/todo/dialogs/TaskCreate";
import TaskFilters from "./components/todo/TaskFilters";
import { useTaskStore } from "./store/taskStore";

function App() {
  const {
    tasks,
    filterCategory,
    filterCompleted,
    completedOptions,
    addTask,
    deleteTask,
    editTask,
    toggleCompleted,
    setFilterCategory,
    setFilterCompleted,
  } = useTaskStore();

  const filterTasks = (task: (typeof tasks)[number]) => {
    const matchCategory =
      filterCategory === "All" || task.category === filterCategory;
    const matchCompleted =
      filterCompleted === "All" || task.completed === filterCompleted;
    return matchCategory && matchCompleted;
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
          onDelete={deleteTask}
          onEdit={editTask}
          onToggleCompleted={toggleCompleted}
          tasks={tasks.filter(filterTasks)}
        />
      </div>

      <TaskCreate onSave={addTask} />
    </div>
  );
}

export default App;
