import { BaseItem } from "@shared/types/base-item.type.ts";
import { StockItemStatus } from "@entities/stock/constants/stock-item-status.enum.ts";
import { Client } from "@entities/client/model/client.model.ts";

export interface StockItemMetadata {
  id: number;
  status: StockItemStatus;
  saleDate: string;
  totalCost: number;
  location: BaseItem;
  createdAt: string;
  labourTotalCost: number;
  labourTotalMinutes: number;
  gemstonesTotalCost: number;
  gemstonesTotalWeight: number;
  gemstonesTotalWeightGrams: number;
  diamondsTotalQuantity: number;
  diamondsTotalCost: number;
  diamondsTotalMarkupCost: number;
  diamondsTotalWeight: number;
  diamondsTotalWeightGrams: number;
  issueDate: string;
  issueClient: Omit<Client, "country" | "currency">;
}
