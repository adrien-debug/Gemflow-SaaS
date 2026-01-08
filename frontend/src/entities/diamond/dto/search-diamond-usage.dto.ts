import { PageRequestModel } from "@shared/types/page-request.model.ts";
import { DiamondUsageStatus } from "@entities/diamond/constants/diamond-usage-status.enum.ts";

export interface SearchDiamondUsageDto extends PageRequestModel {
  searchCriteria: {
    searchInput?: string;
    statuses?: DiamondUsageStatus[];
    orderIds?: number[];
  };
}
