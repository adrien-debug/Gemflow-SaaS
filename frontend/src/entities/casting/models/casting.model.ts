import { User } from "@entities/user/models/user.model.ts";
import { Cylinder } from "@entities/cylinder/model/cylinder.model.ts";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { MetalPurity } from "@entities/metal-purity/models/metal-purity.model.ts";
import { CastingStatus } from "@entities/casting/constants/casting-status.enum.ts";
import { CastingTask } from "@entities/casting/models/casting-task.model.ts";

export interface CastingMetadata {
  alloy: BaseItem;
  alloyWeight: number;
  alloyCost: number;
  alloyedMetal: BaseItem;
  alloyedMetalWeight: number;
  alloyedMetalCost: number;
  createdAt: string;
  createdBy: User;
  cylinder: Cylinder;
  id: number;
  metal: BaseItem;
  metalPurity: MetalPurity;
  orderTasks: CastingTask[];
  preliminaryCastWeight: number;
  priceMetalName: BaseItem;
  pureMetalWeight: number;
  pureMetalCost: number;
  reuseWeight: number;
  status: CastingStatus;
  supportWeight: number;
  supportWithWaxTreeWeight: number;
  waxWeight: number;
  totalCost: number;
}
