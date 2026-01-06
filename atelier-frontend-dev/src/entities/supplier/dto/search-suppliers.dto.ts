import { PageRequestModel } from "@shared/types/page-request.model.ts";

export interface SearchSuppliersDto extends PageRequestModel {
  searchCriteria: {
    searchInput?: string;
    supplyTypeIds?: number[];
  };
}
