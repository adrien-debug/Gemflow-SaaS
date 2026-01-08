import { SettingType, settingTypeNameMap } from "@entities/setting-type/constants/setting-type.enum.ts";
import { SettingTypeItem } from "@entities/setting-type/models/setting-type-item.model.ts";

export const generateSettingTypes = (): SettingTypeItem[] => {
  return Object.values(SettingType).map((settingType) => ({
    id: settingType,
    name: settingTypeNameMap[settingType],
  }));
};
