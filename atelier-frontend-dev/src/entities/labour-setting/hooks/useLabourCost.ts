import { LabourSetting } from "@entities/labour-setting/models/labour-setting.model.ts";
import { useEffect, useState } from "react";
import LabourSettingApi from "@entities/labour-setting/api/labour-setting.api.ts";

const useLabourCost = () => {
  const [labour, setLabour] = useState<LabourSetting>();

  useEffect(() => {
    LabourSettingApi.get().then((response) => setLabour(response));
  }, []);

  const saveHourlyRate = async (labour: LabourSetting) => {
    const preparedLabour = {
      hourlyRate: labour.hourlyRate,
    } satisfies Pick<LabourSetting, "hourlyRate">;
    const response = await LabourSettingApi.saveHourlyRate(preparedLabour);
    setLabour(response);
    return labour;
  };

  const saveSettingCost = async (labour: LabourSetting) => {
    const preparedSettingCost = {
      centerCost: labour.centerCost,
      channelCost: labour.channelCost,
      clawCost: labour.clawCost,
      cutDownPaveCost: labour.cutDownPaveCost,
      ruboverCost: labour.ruboverCost,
      shoulderCost: labour.shoulderCost,
    } satisfies Omit<LabourSetting, "hourlyRate">;
    const response = await LabourSettingApi.saveSettingCost(preparedSettingCost);
    setLabour(response);
    return labour;
  };

  return { labour, saveHourlyRate, saveSettingCost };
};

export default useLabourCost;
