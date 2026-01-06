import { Task } from "@entities/task/models/task.model.ts";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { MetalPurity } from "@entities/metal-purity/models/metal-purity.model.ts";

export interface MetalCastingMetadata {
  id: number;
  cost: number;
  createdAt: string;
  casting: {
    id: number;
    metal: BaseItem;
    metalPurity: MetalPurity;
  };
  orderTask: Task & { weight: number };
}
