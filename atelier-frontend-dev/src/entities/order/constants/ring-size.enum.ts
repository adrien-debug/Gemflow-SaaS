export enum RingSizeType {
  EUROPEAN = "EUROPEAN",
  BRITISH = "BRITISH",
}

export const ringSizeTypeNameMap: Record<RingSizeType, string> = {
  [RingSizeType.BRITISH]: "British",
  [RingSizeType.EUROPEAN]: "European",
};

export const ringSizeTypeShortNameMap: Record<RingSizeType, string> = {
  [RingSizeType.BRITISH]: "UK",
  [RingSizeType.EUROPEAN]: "EU",
};
