import api from "@shared/api";
import { BaseItem } from "@shared/types/base-item.type.ts";

const LocationApi = {
  getAll: (): Promise<BaseItem[]> => api.get("/api/v1/settings/locations"),
};

export default LocationApi;
