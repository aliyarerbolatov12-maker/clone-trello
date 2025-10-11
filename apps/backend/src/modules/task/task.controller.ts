import { createTaskSchema, updateTaskSchema } from "@todo/shared";
import { TaskService } from "./task.service";
import { Request, Response } from "express";
import { z, ZodType } from "zod";

const uuidSchema = z.uuid();

export class TaskController {
  constructor(private taskService: TaskService) {}

  private parseUUID(
    id: string | undefined,
    res: Response,
    name = "ID"
  ): string | null {
    if (!id) {
      res.status(400).json({ message: `${name} is required` });
      return null;
    }

    const parsed = uuidSchema.safeParse(id);
    if (!parsed.success) {
      res.status(400).json({ message: `Invalid ${name} format` });
      return null;
    }

    return parsed.data;
  }

  private parseBody<T extends ZodType<any>>(
    schema: T,
    body: any,
    res: Response
  ): z.infer<T> | null {
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      res.status(400).json({
        message: "Invalid request data",
        errors: parsed.error.issues.map((issue) => issue.message),
      });
      return null;
    }
    return parsed.data;
  }

  private handleError(res: Response, err: unknown) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }

  async getTaskById(req: Request, res: Response) {
    const taskId = this.parseUUID(req.params.id, res);
    if (!taskId) return;

    try {
      const task = await this.taskService.getTask(taskId);
      if (!task) return res.status(404).json({ message: "Task not found" });

      return res.json(task);
    } catch (err) {
      this.handleError(res, err);
    }
  }

  async getAllTasks(req: Request, res: Response) {
    const userId = this.parseUUID(req.params.userId, res, "User ID");
    if (!userId) return;

    try {
      const tasks = await this.taskService.getAllTasksForUser(userId);
      return res.json(tasks);
    } catch (err) {
      this.handleError(res, err);
    }
  }

  async deleteTaskById(req: Request, res: Response) {
    const taskId = this.parseUUID(req.params.id, res);
    if (!taskId) return;

    try {
      const deletedTask = await this.taskService.deleteTask(taskId);
      if (!deletedTask)
        return res.status(404).json({ message: "Task not found" });

      return res.status(204).send();
    } catch (err) {
      this.handleError(res, err);
    }
  }

  async createTask(req: Request, res: Response) {
    const taskData = this.parseBody(createTaskSchema, req.body, res);
    if (!taskData) return;

    try {
      const task = await this.taskService.createTask(taskData);
      return res.status(201).json(task);
    } catch (err) {
      this.handleError(res, err);
    }
  }

  async updateTask(req: Request, res: Response) {
    const taskId = this.parseUUID(req.params.id, res);
    if (!taskId) return;

    const taskData = this.parseBody(updateTaskSchema, req.body, res);
    if (!taskData) return;

    try {
      const task = await this.taskService.updateTask(taskId, taskData);
      if (!task) return res.status(404).json({ message: "Task not found" });

      return res.status(200).json(task);
    } catch (err) {
      this.handleError(res, err);
    }
  }
}
