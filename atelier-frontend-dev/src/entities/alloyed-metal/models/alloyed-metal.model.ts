import { MetalPurity } from "@entities/metal-purity/models/metal-purity.model";
import { BaseItem } from "@shared/types/base-item.type.ts";

export interface AlloyedMetal {
  id: number;
  name: string;
  totalCost: number;
  remainingWeight: number;
  metal: BaseItem;
  metalPurity: MetalPurity;
}
