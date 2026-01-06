import api from "@shared/api";
import { BaseItem } from "@shared/types/base-item.type.ts";

const CollectionApi = {
  get: async (): Promise<BaseItem[]> => {
    return api.get<BaseItem[]>(`/api/v1/settings/collections`);
  },
};

export default CollectionApi;
