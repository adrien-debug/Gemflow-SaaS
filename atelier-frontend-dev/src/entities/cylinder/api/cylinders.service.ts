import { Cylinder } from "@entities/cylinder/model/cylinder.model.ts";
import api from "@shared/api";
import { BatchUpdateDto } from "@shared/types/batch-update.dto.ts";

const CylindersService = {
  get: async (): Promise<Cylinder[]> => {
    return api.get<Cylinder[]>("/api/v1/settings/cylinders");
  },

  updateCylinders: async (cylinders: BatchUpdateDto<Cylinder>): Promise<Cylinder[]> => {
    return api.put<Cylinder[]>("/api/v1/settings/cylinders", cylinders);
  },
};

export default CylindersService;
