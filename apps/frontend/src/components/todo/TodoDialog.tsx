import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { CalendarWithTime } from "@/components/customUI/CalendarWithTime";
import React, { useState } from "react";
import type { TodoItemProps } from "@/types/todo.types";
import { Categories } from "@/constant/category.constant";
import { Button } from "@/components/ui/button";

interface TodoProps {
  onSave: (todo: TodoItemProps) => void;
}

export default function TodoDialog({ onSave }: TodoProps) {
  const defaultTask: TodoItemProps = {
    id: "",
    name: "",
    completed: false,
    description: "",
    categories: Categories,
    deadline: undefined,
  };

  const [task, setTask] = useState<TodoItemProps>(defaultTask);
  const [errors, setErrors] = useState({ name: "" });
  const [open, setOpen] = useState(false);

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "name" && value.trim().length > 0) {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleDateChange = (date: Date) => {
    setTask((prev) => ({
      ...prev,
      deadline: date,
    }));
  };

  const handleSave = () => {
    if (task.name.trim().length === 0) {
      setErrors({ name: "Task name is required" });
      return;
    }
    onSave(task);
    setTask(defaultTask);
    setOpen(false);
  };

  const handleCancel = () => {
    setTask(defaultTask);
    setErrors({ name: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Task</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Fill out the details below to create a new task.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <div>
            <Input
              type="text"
              name="name"
              placeholder="Task name"
              value={task.name}
              onChange={handleTaskChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

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

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Create Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
