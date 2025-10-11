import { PrismaClient } from "@prisma/client";
import { TaskDto, UpdateTaskDto } from "@todo/shared";

export class TaskService {
  constructor(private readonly prisma: PrismaClient) {}

  async getTask(id: string) {
    return this.prisma.task.findUnique({ where: { id: id } });
  }

  async getAllTasksForUser(userId: string) {
    return this.prisma.task.findMany({ where: { userId } });
  }

  async deleteTask(id: string) {
    return this.prisma.task.delete({ where: { id: id } });
  }

  async createTask(data: TaskDto) {
    return this.prisma.task.create({ data });
  }

  async updateTask(id: string, data: UpdateTaskDto) {
    return this.prisma.task.update({ where: { id: id }, data });
  }
}
