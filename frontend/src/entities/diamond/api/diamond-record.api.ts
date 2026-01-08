import { Pageable } from "@shared/types/pageable.model.ts";
import { DiamondRecord } from "@entities/diamond/models/diamond-record.model.ts";
import { DiamondRecordDto } from "@entities/diamond/dto/diamond-record.dto.ts";
import { ChangeDiamondQuantityDto } from "@entities/diamond/dto/change-diamond-quantity.dto.ts";
import api from "@shared/api";
import { SearchDiamondRecordDto } from "@entities/diamond/dto/search-diamond-record.dto.ts";
import { DiamondsTotalValue } from "@entities/diamond/models/diamonds-total-value.model.ts";

const DiamondRecordApi = {
  search: async (dto: SearchDiamondRecordDto): Promise<Pageable<DiamondRecord>> => {
    return api.post(`/api/v1/diamonds/search`, dto);
  },

  create: async (dto: DiamondRecordDto): Promise<DiamondRecord> => {
    return api.post("/api/v1/diamonds", dto);
  },

  delete: async (id: number): Promise<void> => {
    return api.delete(`/api/v1/diamonds/${id}`);
  },

  update: async (id: number, dto: DiamondRecordDto): Promise<DiamondRecord> => {
    return api.put(`/api/v1/diamonds/${id}`, dto);
  },

  getTotalValue: async (): Promise<DiamondsTotalValue> => {
    return api.post(`/api/v1/diamonds/total`, {});
  },

  addDiamondQuantity: async (id: number, dto: ChangeDiamondQuantityDto): Promise<DiamondRecord> => {
    return api.patch(`/api/v1/diamonds/${id}/quantity/add`, dto);
  },

  deductDiamondQuantity: async (id: number, dto: ChangeDiamondQuantityDto): Promise<DiamondRecord> => {
    return api.patch(`/api/v1/diamonds/${id}/quantity/reduce`, dto);
  },
};

export default DiamondRecordApi;
