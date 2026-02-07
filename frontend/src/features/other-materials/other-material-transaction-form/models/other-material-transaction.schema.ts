import { Dayjs } from "dayjs";

export interface OtherMaterialTransactionSchema {
  description: string;
  balanceDate: Dayjs;
  batchWeight: number;
}
