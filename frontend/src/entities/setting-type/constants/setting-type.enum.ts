export enum SettingType {
  CUT_DOWN_PAVE = "CUT_DOWN_PAVE",
  CLAW = "CLAW",
  CENTER = "CENTER",
  SHOULDER = "SHOULDER",
  RUBOVER = "RUBOVER",
  CHANNEL = "CHANNEL",
}

export const settingTypeNameMap: Record<SettingType, string> = {
  [SettingType.CENTER]: "Center",
  [SettingType.CLAW]: "Claw",
  [SettingType.CHANNEL]: "Channel",
  [SettingType.RUBOVER]: "Rubover",
  [SettingType.SHOULDER]: "Shoulder",
  [SettingType.CUT_DOWN_PAVE]: "Cut down pave",
};
