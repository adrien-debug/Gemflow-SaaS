import api from "@shared/api";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { BatchUpdateDto } from "@shared/types/batch-update.dto.ts";

const GemsApi = {
  get: async (): Promise<Record<string, BaseItem[]>> => {
    return api.get<Record<string, BaseItem[]>>("/api/v1/settings/gems");
  },

  updateGems: async (updateDto: Record<string, BatchUpdateDto<BaseItem>>): Promise<Record<string, BaseItem[]>> => {
    return api.put<Record<string, BaseItem[]>>("/api/v1/settings/gems", updateDto);
  },
};

export default GemsApi;
