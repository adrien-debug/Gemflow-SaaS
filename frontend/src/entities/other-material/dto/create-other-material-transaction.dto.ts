import { Nullable } from "@shared/types/nullable.type.ts";

export interface CreateOtherMaterialTransactionDto {
  description: string;
  balanceDate: string;
  otherMaterialId: Nullable<number>;
  batchWeight: number;
  orderId?: Nullable<number>;
}
