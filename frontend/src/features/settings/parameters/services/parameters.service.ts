import api from "@shared/api";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { BatchUpdateDto } from "@shared/types/batch-update.dto.ts";

const ParametersService = {
  get: async (): Promise<Record<string, BaseItem[]>> => {
    return api.get<Record<string, BaseItem[]>>("/api/v1/settings/parameters");
  },

  updateParameters: async (
    updateDto: Record<string, BatchUpdateDto<BaseItem>>,
  ): Promise<Record<string, BaseItem[]>> => {
    return api.put<Record<string, BaseItem[]>>("/api/v1/settings/parameters", updateDto);
  },

  getSegments: async (): Promise<BaseItem[]> => {
    return api.get<BaseItem[]>(`/api/v1/settings/segments`);
  },

  getClientCategories: async () => {
    return api.get<BaseItem[]>(`/api/v1/settings/clients/categories`);
  },

  getItemCategories: async () => {
    return api.get<BaseItem[]>(`/api/v1/settings/items/categories`);
  },
};

export default ParametersService;
