import { ImageMetadata } from "@shared/types/image-metadata.ts";

export interface PartBrokenDto {
  stlCount: number;
  orderTaskImages: ImageMetadata[];
}
