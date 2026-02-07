import { PageRequestModel } from "@shared/types/page-request.model.ts";
import { GemstoneStatus } from "@entities/gemstone/constants/gemstone-status.enum";

export interface SearchGemstoneDto extends PageRequestModel {
  searchCriteria: {
    searchInput?: string;
    statuses?: GemstoneStatus[];
    paymentStatusIds?: number;
    locationIds?: number[];
    alwaysIncludeUsedInOrder?: boolean;
    orderIds?: number[];
  };
}
