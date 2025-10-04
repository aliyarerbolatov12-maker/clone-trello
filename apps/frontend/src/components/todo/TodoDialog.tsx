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

export default function TodoDialog() {
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

  const handleSave = () => {
    console.log("Saving task:", task);
  };

  return (
    <Dialog>
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
          <Input
            type="text"
            name="name"
            placeholder="Task name"
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

        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave}>Create Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
