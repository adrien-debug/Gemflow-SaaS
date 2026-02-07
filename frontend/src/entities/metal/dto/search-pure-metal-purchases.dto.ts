import { PageRequestModel } from "@shared/types/page-request.model.ts";

export interface SearchPureMetalPurchasesDto extends PageRequestModel {
  searchCriteria: {
    searchInput?: string;
    supplierIds?: number[];
    metalPriceNameIds?: number[]; // PureMetal ids
    balanceDate?: string; // YYYY-MM-DD
  };
}
