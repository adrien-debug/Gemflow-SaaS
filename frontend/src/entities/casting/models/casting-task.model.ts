import { Task } from "@entities/task/models/task.model.ts";

export interface CastingTask extends Omit<Task, "cylinder" | "metals"> {
  castingId: number;
  weight?: number;
}
