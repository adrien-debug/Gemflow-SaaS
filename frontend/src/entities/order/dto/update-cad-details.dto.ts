import { ImageMetadata } from "@shared/types/image-metadata.ts";

export interface UpdateCadDetailsDto {
  stlCount: number;
  cadImages?: ImageMetadata[];
  createStlFileIds?: number[];
  deletedStlFileIds?: number[];
  createCadFileIds?: number[];
  deletedCadFileIds?: number[];
  castingPartsImages?: ImageMetadata[];
  diamondMapImages?: ImageMetadata[];
}
