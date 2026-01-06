import { AddMaterialUsageDto } from "@entities/metals-usage/dto/add-material-usage.dto.ts";
import { MetalsUsageProductionsMetadata } from "@entities/metals-usage/models/metals-usage-productions-metadata.model.ts";
import api from "@shared/api";
import { ReturnMaterialToInventoryDto } from "@entities/metals-usage/dto/return-material-to-inventory.dto.ts";

const MetalsUsageApi = {
  getMetalProductions: async (orderId: number): Promise<MetalsUsageProductionsMetadata[]> => {
    return api.get(`/api/v1/orders/${orderId}/metal-productions/summaries`);
  },

  addMaterialUsage: async (orderId: number, dto: AddMaterialUsageDto): Promise<any> => {
    return api.post<any>(`/api/v1/orders/${orderId}/usage`, dto);
  },

  returnMaterialToInventory: async (orderId: number, dto: ReturnMaterialToInventoryDto): Promise<any> => {
    return api.post(`/api/v1/orders/${orderId}/return`, dto);
  },
};

export default MetalsUsageApi;
