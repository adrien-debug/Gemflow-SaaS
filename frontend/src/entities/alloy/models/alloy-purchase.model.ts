import { BaseItem } from "@shared/types/base-item.type.ts";
import { FileMetadata } from "@shared/types/file-metadata.model.ts";
import { Alloy } from "./alloy.model";

export interface AlloyPurchase {
  id: number;
  balanceDate: string;
  priceGram: number;
  batchWeight: number;
  remainingWeight: number;
  batchPrice: number;
  remainingPrice: number;
  alloy: Alloy;
  supplier: BaseItem;
  invoice: FileMetadata;
}
