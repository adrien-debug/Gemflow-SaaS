import { GemstoneStatus } from "@entities/gemstone/constants/gemstone-status.enum.ts";
import { Gemstone } from "@entities/gemstone/models/gemstone.model.ts";
import { Pageable } from "@shared/types/pageable.model.ts";
import api from "@shared/api";
import { CreateGemstoneDto } from "@entities/gemstone/dto/create-gemstone.dto";
import { BaseItem } from "@shared/types/base-item.type";
import { SearchGemstoneDto } from "@entities/gemstone/dto/search-gemstone.dto.ts";
import { GemstoneStatistics } from "@entities/gemstone/models/gemstone-statistics.model.ts";
import { AddGemstoneToOrderDto } from "@entities/gemstone/dto/add-gemstone-to-order.dto.ts";

const GemstoneApi = {
  search: async (pageRequest: SearchGemstoneDto): Promise<Pageable<Gemstone>> => {
    return api.post("/api/v1/gemstones/search", pageRequest);
  },

  create: async (dto: CreateGemstoneDto): Promise<Gemstone> => {
    return api.post("/api/v1/gemstones", dto);
  },

  getById: async (id: number): Promise<Gemstone> => {
    return api.get(`/api/v1/gemstones/${id}`);
  },

  delete: async (id: number): Promise<void> => {
    return api.delete(`/api/v1/gemstones/${id}`);
  },

  update: async (gemstoneId: number, dto: CreateGemstoneDto): Promise<Gemstone> => {
    return api.put(`/api/v1/gemstones/${gemstoneId}`, dto);
  },

  updateStatus: async (id: number, status: GemstoneStatus): Promise<GemstoneStatus> => {
    return api.patch(`/api/v1/gemstones/${id}/status`, { status }).then(() => status);
  },

  getPaymentStatuses: async (): Promise<BaseItem[]> => {
    return api.get("/api/v1/settings/gems/payments");
  },

  updateGemstonePaymentStatus: async (gemstoneId: number, paymentStatusId: number): Promise<Gemstone> => {
    return api.patch(`/api/v1/gemstones/${gemstoneId}/payment-status`, { paymentStatusId });
  },

  getOrderUsageStatistics: async (criteria: SearchGemstoneDto["searchCriteria"]): Promise<GemstoneStatistics> => {
    return api.post("/api/v1/gemstones/total", criteria);
  },

  addGemstoneToOrder: async (orderId: number, dto: AddGemstoneToOrderDto): Promise<void> => {
    return api.patch(`/api/v1/orders/${orderId}/gemstones`, dto);
  },

  deleteGemstoneFromOrder: async (orderId: number, gemstoneId: number): Promise<void> => {
    return api.delete(`/api/v1/orders/${orderId}/gemstones/${gemstoneId}`);
  },
};

export default GemstoneApi;
