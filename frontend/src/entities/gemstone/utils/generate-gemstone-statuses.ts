import { GemstoneStatus, gemstoneStatusNameMap } from "@entities/gemstone/constants/gemstone-status.enum.ts";
import { GemstoneStatusItem } from "entities/gemstone/models/gemstone-status-item.model";

export const generateGemstoneStatuses = (): GemstoneStatusItem[] => {
  return Object.values(GemstoneStatus).map((status) => ({
    id: status,
    name: gemstoneStatusNameMap[status],
  }));
};
