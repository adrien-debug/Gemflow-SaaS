import { PageRequestModel } from "@shared/types/page-request.model.ts";

export interface SearchAlloysCriteria {
  searchInput?: string;
  metalIds?: number[];
}

export interface SearchAlloysDto extends PageRequestModel {
  searchCriteria: SearchAlloysCriteria;
}
