import api from "@shared/api";
import { PureMetalSummary } from "@entities/metal/models/pure-metals-summary.model.ts";
import { PureMetalPurchaseDto } from "@entities/metal/dto/pure-metal-purchase.dto.ts";
import { PureMetalPurchase } from "@entities/metal/models/pure-metal-purchase.model.ts";
import { Pageable } from "@shared/types/pageable.model.ts";
import { SearchPureMetalPurchasesDto } from "@entities/metal/dto/search-pure-metal-purchases.dto.ts";
import { BaseItem } from "@shared/types/base-item.type.ts";

const PureMetalsApi = {
  getAll: async (): Promise<BaseItem[]> => {
    return api.get<BaseItem[]>("/api/v1/settings/price-metal-names");
  },

  getSummary: async (): Promise<PureMetalSummary[]> => {
    return api.get("/api/v1/pure-metals/summary");
  },

  getSummaryByPureMetalId: async (id: number): Promise<PureMetalSummary> => {
    return api.get<PureMetalSummary>(`/api/v1/pure-metals/summary/${id}`);
  },

  createPurchase: async (dto: PureMetalPurchaseDto): Promise<PureMetalPurchase> => {
    return api.post("/api/v1/pure-metal-purchases", dto);
  },

  updatePurchase: async (purchaseId: number, dto: PureMetalPurchaseDto): Promise<PureMetalPurchase> => {
    return api.put(`/api/v1/pure-metal-purchases/${purchaseId}`, dto);
  },

  deletePurchase: async (purchaseId: number): Promise<void> => {
    return api.delete(`/api/v1/pure-metal-purchases/${purchaseId}`);
  },

  searchPurchases: async (dto: SearchPureMetalPurchasesDto): Promise<Pageable<PureMetalPurchase>> => {
    return api.post("/api/v1/pure-metal-purchases/search", dto);
  },

  getSummaryPurchaseById: async (id: number): Promise<PureMetalPurchase> => {
    return api.get<PureMetalPurchase>(`/api/v1/pure-metal-purchases/${id}`);
  },
};

export default PureMetalsApi;
