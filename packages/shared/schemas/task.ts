import { z } from "zod";

export const createTaskSchema = z.object({
  name: z.string().trim().nonempty("Task name is required"),
  description: z.string().optional(),
  isCompleted: z.boolean().optional().default(false),
  deadline: z
    .date()
    .optional()
    .refine((d) => !d || d > new Date(), {
      message: "Deadline must be a future date",
    }),
  categoryId: z.string().uuid().optional(),
  userId: z.string().uuid().nonempty("User ID is required"),
});

export type TaskDto = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = createTaskSchema.partial();
export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
