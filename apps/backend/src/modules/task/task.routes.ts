import { Router } from "express";
import { prisma } from "@config/db";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";

const router = Router();
const taskService = new TaskService(prisma);
const taskController = new TaskController(taskService);

router.get("/user/:userId", (req, res) => taskController.getAllTasks(req, res));

router.get("/:id", (req, res) => taskController.getTaskById(req, res));

router.post("/", (req, res) => taskController.createTask(req, res));

router.put("/:id", (req, res) => taskController.updateTask(req, res));

router.delete("/:id", (req, res) => taskController.deleteTaskById(req, res));

export default router;
