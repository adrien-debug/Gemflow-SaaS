import { FileMetadata } from "@shared/types/file-metadata.model.ts";
import { Dayjs } from "dayjs";

export interface AlloyPurchaseFormSchema {
  balanceDate: Dayjs;
  batchWeight: number;
  priceGram: number;
  supplierId: number;
  invoiceFiles?: FileMetadata[];
  createInvoiceIds?: number[];
  deleteInvoiceIds?: number[];
  alloyId: number;
}
