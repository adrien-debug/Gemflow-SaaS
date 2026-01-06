import { ImageMetadata } from "@shared/types/image-metadata.ts";

export interface MoveToCastingDto {
  metalId: number;
  stlCount: number;
  orderTaskImages: ImageMetadata[];
}
