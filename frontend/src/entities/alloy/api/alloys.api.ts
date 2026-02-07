import { CreateAlloyDto } from "@entities/alloy/dto/create-alloy.dto.ts";
import { SearchAlloysDto } from "@entities/alloy/dto/search-alloys.dto.ts";
import { UpdateAlloyDto } from "@entities/alloy/dto/update-alloy.dto.ts";
import { Alloy } from "@entities/alloy/models/alloy.model.ts";
import api from "@shared/api";
import { Pageable } from "@shared/types/pageable.model.ts";

const AlloysApi = {
  search: async (searchAlloyDto: SearchAlloysDto): Promise<Pageable<Alloy>> => {
    return api.post<Pageable<Alloy>>("/api/v1/alloys/search", searchAlloyDto);
  },

  getById: async (id: number): Promise<Alloy> => {
    return api.get<Alloy>(`/api/v1/alloys/${id}`);
  },

  create: async (createAlloyDto: CreateAlloyDto): Promise<Alloy> => {
    return api.post<Alloy>("/api/v1/alloys", createAlloyDto);
  },

  update: async (id: number, updateAlloyDto: UpdateAlloyDto): Promise<Alloy> => {
    return api.put<Alloy>(`/api/v1/alloys/${id}`, updateAlloyDto);
  },

  delete: async (id: number): Promise<void> => {
    return api.delete(`/api/v1/alloys/${id}`);
  },
};

export default AlloysApi;
