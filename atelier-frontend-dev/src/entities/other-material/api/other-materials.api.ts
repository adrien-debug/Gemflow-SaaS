import api from "@shared/api";
import { Pageable } from "@shared/types/pageable.model.ts";
import { PageRequestModel } from "@shared/types/page-request.model.ts";
import { OtherMaterial } from "../model/other-material.model";

const OtherMaterialsApi = {
  search: async (pageRequest: PageRequestModel): Promise<Pageable<OtherMaterial>> => {
    return api.post("/api/v1/other-materials/search", pageRequest);
  },

  create: async (dto: { name: string }): Promise<OtherMaterial> => {
    return api.post("/api/v1/other-materials", dto);
  },

  update: async (id: number, dto: { name: string }): Promise<OtherMaterial> => {
    return api.put(`/api/v1/other-materials/${id}`, dto);
  },

  delete: async (id: number): Promise<void> => {
    return api.delete(`/api/v1/other-materials/${id}`);
  },

  getById: async (id: number): Promise<OtherMaterial> => {
    return api.get<OtherMaterial>(`/api/v1/other-materials/${id}`);
  },
};

export default OtherMaterialsApi;
