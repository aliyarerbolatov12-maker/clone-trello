import express from "express";
import cors from "cors";
import helmet from "helmet";
import taskRoutes from "./modules/task/task.routes";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: ["http://localhost:5174"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/tasks", taskRoutes);

export default app;
