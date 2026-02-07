import { GemstoneMethodType } from "@entities/gemstone/constants/gemstone-method-type.enum.ts";
import { ImageMetadata } from "@shared/types/image-metadata.ts";

export interface CreateGemstoneDto {
  name: string;
  certificate: string;
  description: string;
  numberOfGems: number;
  totalWeight: number;
  comment: string;
  stonePrice: number;
  pricePerCarat: number;
  customsDutyPriceActive: boolean;
  vatPriceActive: boolean;
  tenPercentsPriceActive: boolean;
  certificateCost: number;
  shipment: number;
  methodType: GemstoneMethodType;
  supplierId: number;
  locationId: number;
  gemstoneImages?: ImageMetadata[];
}
