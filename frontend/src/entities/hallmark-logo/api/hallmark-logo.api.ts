import api from "@shared/api";
import { BaseItem } from "@shared/types/base-item.type.ts";

const HallmarkLogoApi = {
  get: async () => {
    return api.get<BaseItem[]>(`/api/v1/hallmark-logos`);
  },
};

export default HallmarkLogoApi;
