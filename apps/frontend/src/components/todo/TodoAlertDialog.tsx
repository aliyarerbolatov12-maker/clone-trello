import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { CalendarWithTime } from "@/components/customUI/CalendarWithTime";
import React, { useState } from "react";
import type { TodoItemProps } from "@/types/todo.types";
import { Categories } from "@/constant/category.constant";

export default function TodoAlertDialog() {
  const [task, setTask] = useState<TodoItemProps>({
    id: "",
    name: "",
    completed: false,
    description: "",
    categories: Categories,
    deadline: undefined,
  });

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date) => {
    setTask((prev) => ({
      ...prev,
      deadline: date,
    }));
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-6">Create Task</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                name="name"
                placeholder="Name task"
                value={task.name}
                onChange={handleTaskChange}
              />
              <Input
                type="text"
                name="description"
                placeholder="Description"
                value={task.description}
                onChange={handleTaskChange}
              />
              <div className="flex flex-col gap-2">
                <span className="text-black text-lg font-medium text-center">
                  Deadline
                </span>
                <CalendarWithTime
                  value={task.deadline}
                  onChange={handleDateChange}
                />
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
