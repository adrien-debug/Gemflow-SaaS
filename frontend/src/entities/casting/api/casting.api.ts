import api from "@shared/api";
import { CastingDto } from "@entities/casting/dto/casting.dto.ts";
import { CastingMetadata } from "@entities/casting/models/casting.model.ts";
import { CastingListItem } from "@entities/casting/models/casting-list-item.model.ts";
import { Pageable } from "@shared/types/pageable.model.ts";
import { CastingSearchDto } from "@entities/casting/dto/casting-search.dto.ts";

const CastingApi = {
  create: (dto: CastingDto): Promise<CastingMetadata> => {
    return api.post("/api/v1/castings", dto);
  },

  delete: (id: number): Promise<void> => {
    return api.delete(`/api/v1/castings/${id}`);
  },

  search: (dto: CastingSearchDto): Promise<Pageable<CastingListItem>> => {
    return api.post("/api/v1/castings/search", dto);
  },

  getById: (id: number): Promise<CastingMetadata> => {
    return api.get(`/api/v1/castings/${id}`);
  },

  update: (id: number, dto: Omit<CastingDto, "cylinderId" | "metalId">): Promise<CastingMetadata> => {
    return api.put(`/api/v1/castings/${id}`, dto);
  },

  finish: (id: number, alloyedMetalId: number): Promise<CastingMetadata> => {
    return api.post(`/api/v1/castings/${id}/finish`, { alloyedMetalId });
  },
};

export default CastingApi;
