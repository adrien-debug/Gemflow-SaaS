import { ImageMetadata } from "@shared/types/image-metadata.ts";

export interface CadDetailsMetadata {
  stlCount: number;
  cadImages: ImageMetadata[];
  castingPartsImages: ImageMetadata[];
  diamondMapImages: ImageMetadata[];
}
