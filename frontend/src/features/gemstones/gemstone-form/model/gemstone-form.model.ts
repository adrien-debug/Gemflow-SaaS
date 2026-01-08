import { ImageMetadata } from "@shared/types/image-metadata.ts";
import { GemstoneMethodType } from "@entities/gemstone/constants/gemstone-method-type.enum.ts";

export interface GemstoneFormSchema {
  id: number;
  name: string;
  certificate: string;
  description: string;
  numberOfGems: number;
  totalWeight: number;
  comment: string;
  stonePrice: number;
  pricePerCarat: number;
  customsDutyPriceActive: boolean;
  customsDutyPrice: number;
  vatPriceActive: boolean;
  vatPrice: number;
  tenPercentsPriceActive: boolean;
  tenPercentsPrice: number;
  certificateCost: number;
  shipment: number;
  totalCost: number;
  methodType: GemstoneMethodType;
  supplierId: number;
  locationId: number;
  gemstoneImages: ImageMetadata[];
}
