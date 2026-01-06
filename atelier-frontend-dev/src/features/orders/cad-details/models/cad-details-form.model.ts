import { ImageMetadata } from "@shared/types/image-metadata.ts";
import { FileMetadata } from "@shared/types/file-metadata.model.ts";

export interface CadDetailsFormFields {
  cadImages: ImageMetadata[];
  stlCount: number;
  stlFiles: FileMetadata[];
  cadFiles: FileMetadata[];
  createStlFileIds?: number[];
  deletedStlFileIds?: number[];
  createCadFileIds?: number[];
  deletedCadFileIds?: number[];
  castingPartsImages?: ImageMetadata[];
  diamondMapImages?: ImageMetadata[];
}
