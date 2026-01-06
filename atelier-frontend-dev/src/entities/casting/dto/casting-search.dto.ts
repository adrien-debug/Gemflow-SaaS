import { PageRequestModel } from "@shared/types/page-request.model.ts";
import { CastingStatus } from "@entities/casting/constants/casting-status.enum.ts";

export interface CastingSearchDto extends PageRequestModel {
  searchCriteria: {
    searchInput?: string;
    statuses?: CastingStatus[];
  };
}
