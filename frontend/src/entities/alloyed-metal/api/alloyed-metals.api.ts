import { CreateAlloyedMetalDto } from "@entities/alloyed-metal/dto/create-alloyed-metal.dto.ts";
import { SearchAlloyedMetalsDto } from "@entities/alloyed-metal/dto/search-alloyed-metals.dto.ts";
import { UpdateAlloyedMetalDto } from "@entities/alloyed-metal/dto/update-alloyed-metal.dto.ts";
import { AlloyedMetal } from "@entities/alloyed-metal/models/alloyed-metal.model.ts";
import { Pageable } from "@shared/types/pageable.model.ts";
import api from "@shared/api";

export const AlloyedMetalsApi = {
  search: async (searchAlloyedMetalsDto: SearchAlloyedMetalsDto): Promise<Pageable<AlloyedMetal>> => {
    return api.post<Pageable<AlloyedMetal>>("/api/v1/alloyed-metals/search", searchAlloyedMetalsDto);
  },

  getById: async (id: number): Promise<AlloyedMetal> => {
    return api.get<AlloyedMetal>(`/api/v1/alloyed-metals/${id}`);
  },

  create: async (createAlloyedMetalDto: CreateAlloyedMetalDto): Promise<AlloyedMetal> => {
    return api.post<AlloyedMetal>("/api/v1/alloyed-metals", createAlloyedMetalDto);
  },

  update: async (id: number, updateAlloyedMetalDto: UpdateAlloyedMetalDto): Promise<AlloyedMetal> => {
    return api.put<AlloyedMetal>(`/api/v1/alloyed-metals/${id}`, updateAlloyedMetalDto);
  },

  delete: async (id: number): Promise<void> => {
    return api.delete(`/api/v1/alloyed-metals/${id}`);
  },

  total: async (searchAlloyedMetalsDto: SearchAlloyedMetalsDto): Promise<Pick<AlloyedMetal, "totalCost">> => {
    return api.post(`/api/v1/alloyed-metals/total`, searchAlloyedMetalsDto);
  },
};
