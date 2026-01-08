import { AlloyPurchaseDto } from "@entities/alloy/dto/alloy-purchase.dto.ts";
import { SearchAlloyPurchasesDto } from "@entities/alloy/dto/search-alloy-purchases.dto.ts";
import { AlloyPurchase } from "@entities/alloy/models/alloy-purchase.model.ts";
import api from "@shared/api";
import { Pageable } from "@shared/types/pageable.model.ts";

export const AlloyPurchasesApi = {
  search: async (searchAlloyPurchasesDto: SearchAlloyPurchasesDto): Promise<Pageable<AlloyPurchase>> => {
    return api.post<Pageable<AlloyPurchase>>("/api/v1/alloy-purchases/search", searchAlloyPurchasesDto);
  },

  create: async (createAlloyDto: AlloyPurchaseDto): Promise<AlloyPurchase> => {
    return api.post<AlloyPurchase>("/api/v1/alloy-purchases", createAlloyDto);
  },

  update: async (id: number, updateAlloyPurchaseDto: AlloyPurchaseDto): Promise<AlloyPurchase> => {
    return api.put<AlloyPurchase>(`/api/v1/alloy-purchases/${id}`, updateAlloyPurchaseDto);
  },

  delete: async (id: number): Promise<void> => {
    return api.delete(`/api/v1/alloy-purchases/${id}`);
  },

  getById: async (alloyPurchaseId: number): Promise<AlloyPurchase> => {
    return api.get(`/api/v1/alloy-purchases/${alloyPurchaseId}`);
  },
};
