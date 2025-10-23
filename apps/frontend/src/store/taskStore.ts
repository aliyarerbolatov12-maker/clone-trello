import { create } from "zustand";
import { type TaskItemProps } from "../types/task.types";
import { Category } from "../constant/category.constant";

type CompletedFilter = "All" | true | false;

interface TaskState {
  tasks: TaskItemProps[];
  filterCategory: Category | "All";
  filterCompleted: CompletedFilter;
  completedOptions: { label: string; value: CompletedFilter }[];

  addTask: (task: Omit<TaskItemProps, "id">) => void;
  deleteTask: (id: string) => void;
  editTask: (updatedTask: TaskItemProps) => void;
  toggleCompleted: (id: string) => void;
  setFilterCategory: (category: Category | "All") => void;
  setFilterCompleted: (completed: CompletedFilter) => void;

  getFilteredTasks: () => TaskItemProps[];
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  filterCategory: "All",
  filterCompleted: "All",
  completedOptions: [
    { label: "All", value: "All" },
    { label: "Done", value: true },
    { label: "Not done", value: false },
  ],

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...task, id: crypto.randomUUID() }],
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),

  editTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      ),
    })),

  toggleCompleted: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    })),

  setFilterCategory: (category) => set({ filterCategory: category }),
  setFilterCompleted: (completed) => set({ filterCompleted: completed }),

  getFilteredTasks: () => {
    const { tasks, filterCategory, filterCompleted } = get();
    return tasks.filter((task) => {
      const matchCategory =
        filterCategory === "All" || task.category === filterCategory;
      const matchCompleted =
        filterCompleted === "All" || task.completed === filterCompleted;
      return matchCategory && matchCompleted;
    });
  },
}));
