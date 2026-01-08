import api from "@shared/api";
import { SupplyType } from "@entities/supply-types/model/supply-type.model";

const SupplyTypesApi = {
  getSupplyTypes: async (): Promise<SupplyType[]> => {
    return api.get(`/api/v1/settings/supply-types`);
  },
};

export default SupplyTypesApi;
