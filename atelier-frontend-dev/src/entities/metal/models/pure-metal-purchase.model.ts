import { BaseItem } from "@shared/types/base-item.type.ts";
import { FileMetadata } from "@shared/types/file-metadata.model.ts";

export interface PureMetalPurchase {
  balanceDate: string;
  barNumber: string;
  batchPrice: number;
  batchWeight: number;
  coc: string;
  id: number;
  invoice: FileMetadata;
  priceGram: number;
  priceMetalName: BaseItem;
  remainingPrice: number;
  remainingWeight: number;
  supplier: BaseItem;
}
