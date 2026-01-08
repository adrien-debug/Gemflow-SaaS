import { ImageSize } from "@shared/constants/image.ts";
import { FileMetadata } from "@shared/types/file-metadata.model.ts";

export interface ImageMetadata {
  sizeType: ImageSize;
  file: FileMetadata;
}
