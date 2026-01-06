import { BaseItem } from "@shared/types/base-item.type";
import { Nullable } from "@shared/types/nullable.type.ts";

export interface AlloyedMetalPurchase {
  id: number;
  balanceDate: string;
  priceGram: number;
  batchWeight: number;
  remainingWeight: number;
  batchPrice: number;
  remainingPrice: number;
  alloy: BaseItem;
  alloyedMetal: BaseItem;
  castingId: Nullable<number>;
}
