import { PageRequestModel } from "@shared/types/page-request.model.ts";

export interface OtherMaterialTransactionsSearchCriteria {
  searchInput?: string;
  balanceDate?: string;
  orderIds?: number[];
  otherMaterialIds: number[];
}

export interface SearchOtherMaterialTransactionsDto extends PageRequestModel {
  searchCriteria: OtherMaterialTransactionsSearchCriteria;
}
