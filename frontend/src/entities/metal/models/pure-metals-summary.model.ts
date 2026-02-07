import { BaseItem } from "@shared/types/base-item.type.ts";

export interface PureMetalSummary {
  currentTotalCost: number;
  id: number;
  currentCostPercentageDifference: number;
  priceGram: number;
  priceMetalName: BaseItem;
  remainingWeight: number;
  totalCost: number;
}
