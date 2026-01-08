import api from "@shared/api";
import { SearchDiamondUsageDto } from "@entities/diamond/dto/search-diamond-usage.dto.ts";
import { Pageable } from "@shared/types/pageable.model.ts";
import { DiamondUsageMetadata } from "@entities/diamond/models/diamond-usage-metadata.model.ts";
import { DiamondUsageDto } from "@entities/diamond/dto/diamond-usage.dto.ts";
import { DiamondUsageQualityIssueDto } from "@entities/diamond/dto/diamond-usage-quality-issue.dto.ts";
import { DiamondUsageStatistics } from "@entities/diamond/models/diamond-usage-statistics.model.ts";

const DiamondUsageApi = {
  search: async (dto: SearchDiamondUsageDto): Promise<Pageable<DiamondUsageMetadata>> => {
    return api.post("/api/v1/order-diamonds/search", dto);
  },

  addGoodQuality: async (dto: DiamondUsageDto): Promise<DiamondUsageMetadata> => {
    return api.post("/api/v1/order-diamonds/good-quality", dto);
  },

  addQualityIssue: async (dto: DiamondUsageQualityIssueDto): Promise<DiamondUsageMetadata> => {
    return api.post("/api/v1/order-diamonds/quality-issue", dto);
  },

  addBroken: async (dto: DiamondUsageDto): Promise<DiamondUsageMetadata> => {
    return api.post("/api/v1/order-diamonds/broken", dto);
  },

  getStatistics: async (dto: SearchDiamondUsageDto["searchCriteria"]): Promise<DiamondUsageStatistics> => {
    return api.post("/api/v1/order-diamonds/total", dto);
  },

  getOrderDiamond: async (orderDiamondId: number): Promise<DiamondUsageMetadata> => {
    return api.get(`/api/v1/order-diamonds/${orderDiamondId}`);
  },

  updateGoodQuality: async (id: number, dto: Omit<DiamondUsageDto, "orderId">): Promise<DiamondUsageMetadata> => {
    return api.put(`/api/v1/order-diamonds/${id}/good-quality`, dto);
  },

  updateBroken: async (id: number, dto: Omit<DiamondUsageDto, "orderId">): Promise<DiamondUsageMetadata> => {
    return api.put(`/api/v1/order-diamonds/${id}/broken`, dto);
  },

  updateQualityIssue: async (id: number, dto: Omit<DiamondUsageDto, "orderId">): Promise<DiamondUsageMetadata> => {
    return api.put(`/api/v1/order-diamonds/${id}/quality-issue`, dto);
  },

  delete: async (id: number): Promise<void> => {
    return api.delete(`/api/v1/order-diamonds/${id}`);
  },
};

export default DiamondUsageApi;
