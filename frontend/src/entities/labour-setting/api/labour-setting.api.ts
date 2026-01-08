import api from "@shared/api";
import { LabourSetting } from "@entities/labour-setting/models/labour-setting.model.ts";

const LabourSettingApi = {
  get: async (): Promise<LabourSetting> => {
    return api.get<LabourSetting>("/api/v1/settings/labours");
  },

  saveHourlyRate: async (labour: Pick<LabourSetting, "hourlyRate">): Promise<LabourSetting> => {
    return api.put<LabourSetting>("/api/v1/settings/labours/hourly-rate", labour);
  },

  saveSettingCost: async (labour: Omit<LabourSetting, "hourlyRate">): Promise<LabourSetting> => {
    return api.put<LabourSetting>("/api/v1/settings/labours/costs", labour);
  },
};

export default LabourSettingApi;
