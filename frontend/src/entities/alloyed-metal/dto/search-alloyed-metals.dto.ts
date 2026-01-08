import { PageRequestModel } from "@shared/types/page-request.model.ts";

export interface SearchAlloyedMetalsDto extends PageRequestModel {
  searchCriteria: {
    searchInput?: string;
    metalIds?: number[];
    metalPurityIds?: number[];
  };
}
