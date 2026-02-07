import { PageRequestModel } from "@shared/types/page-request.model.ts";

export interface SearchInfiniteUsersDto extends PageRequestModel {
  searchCriteria: {
    searchInput?: string;
    isActive?: boolean;
  };
}
