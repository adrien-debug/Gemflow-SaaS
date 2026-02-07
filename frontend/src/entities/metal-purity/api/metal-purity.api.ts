import { GetMetalPuritiesDto } from "@entities/metal-purity/dto/get-metal-purities.dto.ts";
import { MetalPurity } from "@entities/metal-purity/models/metal-purity.model.ts";
import api from "@shared/api";

export const MetalPurityApi = {
  getAll: async (params: GetMetalPuritiesDto): Promise<MetalPurity[]> => {
    return api.get<MetalPurity[]>("/api/v1/settings/caratages/metal-purities", { params });
  },
};
