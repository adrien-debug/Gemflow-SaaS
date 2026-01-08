import { DiamondQuality } from "@entities/diamond/constants/diamond-quality.enum.ts";
import { BaseOptionType } from "antd/es/select";

export const getDiamondQualityOptions = (): BaseOptionType[] =>
  Object.values(DiamondQuality).map((quality) => ({ value: quality, label: quality }));
