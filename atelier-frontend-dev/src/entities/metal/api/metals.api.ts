import api from "@shared/api";
import { AlloyParameters } from "@entities/metal/models/alloy-parameters.model.ts";
import { UpdateAlloysDto } from "@entities/metal/dto/update-alloys.dto.ts";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { BatchUpdateDto } from "@shared/types/batch-update.dto.ts";

const MetalsApi = {
  getMetals: async (): Promise<BaseItem[]> => {
    return api.get<BaseItem[]>("/api/v1/settings/metals").catch(() => []);
  },

  updateMetals: async (updateDto: BatchUpdateDto<BaseItem>): Promise<BaseItem[]> => {
    return api.put<BaseItem[]>("/api/v1/settings/metals", updateDto);
  },

  getAlloyParameters: async (): Promise<AlloyParameters[]> => {
    return api.get<AlloyParameters[]>("/api/v1/settings/caratages");
  },

  getAlloyParametersByMaterialId: (id: number): Promise<AlloyParameters> => {
    return api.get<AlloyParameters>("/api/v1/settings/caratages", { params: { metalId: id } });
  },

  updateAlloyParameters: async (updateDto: BatchUpdateDto<UpdateAlloysDto>): Promise<AlloyParameters[]> => {
    return api.put<AlloyParameters[]>("/api/v1/settings/caratages", updateDto);
  },
};

export default MetalsApi;
