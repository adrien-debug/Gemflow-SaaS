import { BaseItem } from "@shared/types/base-item.type.ts";

export interface Alloy {
  id: number;
  name: string;
  totalCost: number;
  remainingWeight: number;
  metal: BaseItem;
}
