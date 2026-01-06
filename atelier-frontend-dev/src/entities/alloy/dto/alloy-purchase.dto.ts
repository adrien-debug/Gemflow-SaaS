import { Nullable } from "@shared/types/nullable.type.ts";

export interface AlloyPurchaseDto {
  balanceDate: string;
  batchWeight: number;
  priceGram: number;
  supplierId: number;
  invoiceId?: Nullable<number>;
  alloyId: number;
}
