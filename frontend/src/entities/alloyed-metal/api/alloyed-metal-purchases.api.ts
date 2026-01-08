import { CreateAlloyedMetalPurchaseDto } from "@entities/alloyed-metal/dto/create-alloyed-metal-purchase.dto.ts";
import { SearchAlloyedMetalPurchasesDto } from "@entities/alloyed-metal/dto/search-alloyed-metal-purchases.dto.ts";
import { UpdateAlloyedMetalPurchaseDto } from "@entities/alloyed-metal/dto/update-alloyed-metal-purchase.dto.ts";
import api from "@shared/api";
import { Pageable } from "@shared/types/pageable.model.ts";
import { AlloyedMetalPurchase } from "../models/alloyed-metal-purchase.model";

export const AlloyedMetalPurchasesApi = {
  search: async (
    searchAlloyedMetalPurchasesDto: SearchAlloyedMetalPurchasesDto,
  ): Promise<Pageable<AlloyedMetalPurchase>> => {
    return api.post<Pageable<AlloyedMetalPurchase>>(
      "/api/v1/alloyed-metal-purchases/search",
      searchAlloyedMetalPurchasesDto,
    );
  },

  create: async (alloyedMetalPurchaseDto: CreateAlloyedMetalPurchaseDto): Promise<AlloyedMetalPurchase> => {
    return api.post<AlloyedMetalPurchase>("/api/v1/alloyed-metal-purchases", alloyedMetalPurchaseDto);
  },

  update: async (
    id: number,
    updateAlloyedMetalPurchaseDto: UpdateAlloyedMetalPurchaseDto,
  ): Promise<AlloyedMetalPurchase> => {
    return api.put<AlloyedMetalPurchase>(`/api/v1/alloyed-metal-purchases/${id}`, updateAlloyedMetalPurchaseDto);
  },

  delete: async (id: number): Promise<void> => {
    return api.delete(`/api/v1/alloyed-metal-purchases/${id}`);
  },
};
