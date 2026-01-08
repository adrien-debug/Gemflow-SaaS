import { Gemstone } from "@entities/gemstone/models/gemstone.model.ts";

export interface GemstoneUsageTableActions {
  onDelete?: (gemstone: Gemstone) => void;
}
