import api from "@shared/api";
import { BaseItem } from "@shared/types/base-item.type.ts";

const SegmentApi = {
  get: async (): Promise<BaseItem[]> => {
    return api.get<BaseItem[]>(`/api/v1/settings/segments`);
  },
};

export default SegmentApi;
