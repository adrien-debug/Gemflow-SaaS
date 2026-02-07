import { GemstoneStatus } from "@entities/gemstone/constants/gemstone-status.enum";

export interface UpdateGemstoneStatusDto {
  id: number;
  status: GemstoneStatus;
}
