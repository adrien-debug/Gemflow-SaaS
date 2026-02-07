import { MetalPurity } from "@entities/metal-purity/models/metal-purity.model.ts";
import { BatchUpdateDto } from "@shared/types/batch-update.dto.ts";

export interface UpdateAlloysDto {
  name: string;
  priceMetalNameId: number;
  waxCastingValue: number;
  metalIds: number[];
  id: number | null;
  metalPurities: BatchUpdateDto<MetalPurity>;
}
