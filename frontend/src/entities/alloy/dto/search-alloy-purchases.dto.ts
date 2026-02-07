import { PageRequestModel } from "@shared/types/page-request.model.ts";

export interface SearchAlloyPurchasesDto extends PageRequestModel {
  searchCriteria: {
    searchInput?: string;
    balanceDate?: string;
    alloyIds?: number[];
    supplierIds?: number[];
  };
}
