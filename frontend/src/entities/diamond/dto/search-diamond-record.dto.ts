import { PageRequestModel } from "@shared/types/page-request.model.ts";
import { DiamondQuality } from "@entities/diamond/constants/diamond-quality.enum.ts";

export interface SearchDiamondRecordDto extends PageRequestModel {
  searchCriteria: {
    searchInput?: string;
    qualityTypes?: DiamondQuality[];
    diamondShapeIds?: number[];
    supplierIds?: number[];
  };
}
