import { BaseItem } from "@shared/types/base-item.type.ts";
import { TaskStatus } from "@entities/task/constants/task-status.ts";
import { ImageMetadata } from "@shared/types/image-metadata.ts";

export interface Task {
  id: number;
  createdAt: string;
  cylinder: BaseItem;
  stlCount: number;
  status: TaskStatus;
  order: BaseItem;
  metals: BaseItem[];
  orderTaskImages: ImageMetadata[];
}
