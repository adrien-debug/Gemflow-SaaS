import { FileMetadata } from "@shared/types/file-metadata.model.ts";
import { Dayjs } from "dayjs";

export interface MetalPurchaseSchema {
  metalId: number;
  supplierId: number;
  weight: number;
  barNumber: string;
  coc: string;
  balanceDate: Dayjs;
  pricePerGram: number;
  invoiceFiles: FileMetadata[];
  createInvoiceFileIds: number[];
  deletedInvoiceFileIds: number[];
}
