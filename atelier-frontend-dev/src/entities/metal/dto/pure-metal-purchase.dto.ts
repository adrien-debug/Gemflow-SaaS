import { Nullable } from "@shared/types/nullable.type.ts";

export interface PureMetalPurchaseDto {
  balanceDate: string;
  barNumber?: string;
  priceGram: number;
  batchWeight: number; // YYYY-MM-DD
  coc?: string;
  invoiceId?: Nullable<number>;
  priceMetalNameId: number;
  supplierId: number;
}
