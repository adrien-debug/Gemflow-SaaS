import { ImageMetadata } from "@shared/types/image-metadata.ts";

export interface CastingOrders {
  id: number;
  name: string;
  productImages: ImageMetadata[];
  quantity: number;
  partsWeight: number;
}
