export enum MaterialType {
  ALLOYED_METAL = "ALLOYED_METAL",
  OTHER = "OTHER",
}

export const materialTypeNameMap: Record<MaterialType, string> = {
  [MaterialType.ALLOYED_METAL]: "Alloyed metal",
  [MaterialType.OTHER]: "Other",
};
