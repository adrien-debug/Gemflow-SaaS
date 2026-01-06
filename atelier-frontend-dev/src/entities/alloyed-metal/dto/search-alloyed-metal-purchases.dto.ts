import { PageRequestModel } from "@shared/types/page-request.model.ts";

export interface SearchAlloyedMetalPurchasesDto extends PageRequestModel {
  searchCriteria: {
    searchInput?: string;
    balanceDate?: string;
    alloyIds?: number[];
    alloyedMetalIds?: number[];
  };
}
