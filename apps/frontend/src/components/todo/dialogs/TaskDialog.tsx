"use client";

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
import type { TaskDialogProps, TaskItemProps } from "@/types/task.types";
import CategorySelect from "@/components/customUI/select/CategorySelect";
import { Category } from "@/constant/category.constant";
import { Button } from "@/components/ui/button";

export default function TaskDialog({
  onSave,
  initialTask,
  mode = "create",
}: TaskDialogProps) {
  const defaultTask: TaskItemProps = {
    id: "",
    name: "",
    completed: false,
    description: "",
    category: Category.None,
    deadline: undefined,
  };

  const [task, setTask] = useState<TaskItemProps>(initialTask || defaultTask);
  const [errors, setErrors] = useState({ name: "" });
  const [open, setOpen] = useState(false);

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
    if (name === "name" && value.trim().length > 0) {
      setErrors({ name: "" });
    }
  };

  const handleDateChange = (date: Date) => {
    setTask((prev) => ({ ...prev, deadline: date }));
  };

  const handleSave = () => {
    if (task.name.trim() === "") {
      setErrors({ name: "Task name is required" });
      return;
    }
    onSave(task);
    if (mode === "create") setTask(defaultTask);
    setOpen(false);
  };

  const handleCancel = () => {
    setTask(initialTask || defaultTask);
    setErrors({ name: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{mode === "create" ? "Create Task" : "Edit Task"}</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Task" : "Edit Task"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Fill out the details below to create a new task."
              : "Update the details of your task."}
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

          <CategorySelect
            value={task.category}
            onChange={(category) => setTask((prev) => ({ ...prev, category }))}
            exclude={["All"]}
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
          <Button onClick={handleSave}>
            {mode === "create" ? "Create Task" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
