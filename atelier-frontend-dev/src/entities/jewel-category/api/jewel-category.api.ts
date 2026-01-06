import api from "@shared/api";
import { BaseItem } from "@shared/types/base-item.type.ts";

const JewelCategoryApi = {
  get: async () => {
    return api.get<BaseItem[]>(`/api/v1/settings/items/categories`);
  },
};

export default JewelCategoryApi;
