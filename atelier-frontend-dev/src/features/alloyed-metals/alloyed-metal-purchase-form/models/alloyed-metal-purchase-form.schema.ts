import { Dayjs } from "dayjs";

export interface AlloyedMetalPurchaseFormSchema {
  balanceDate: Dayjs;
  batchWeight: number;
  priceGram: number;
  alloyId: number;
  alloyedMetalId: number;
}
