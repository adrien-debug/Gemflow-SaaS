import api from "@shared/api";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { BatchUpdateDto } from "@shared/types/batch-update.dto.ts";

const DiamondShapesApi = {
  getDiamondShapes: async (): Promise<BaseItem[]> => {
    return api.get<BaseItem[]>("/api/v1/settings/diamonds/shapes");
  },

  updateDiamondShapes: async (updateDto: BatchUpdateDto<BaseItem>): Promise<BaseItem[]> => {
    return api.put<BaseItem[]>("/api/v1/settings/diamonds/shapes", updateDto);
  },
};

export default DiamondShapesApi;
