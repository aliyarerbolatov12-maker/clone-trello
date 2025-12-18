import { create } from "zustand";
import { persist } from "zustand/middleware";
import { arrayMove } from "@dnd-kit/sortable";
import type { TasksState } from "@/types/store/taskStore.types";

export const useTasksStore = create<TasksState>()(
  persist(
    (set) => ({
      tasks: [],

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

      reorderTasks: (fromIndex, toIndex) =>
        set((state) => ({
          tasks: arrayMove(state.tasks, fromIndex, toIndex),
        })),
    }),
    {
      name: "tasks-storage",
    }
  )
);
