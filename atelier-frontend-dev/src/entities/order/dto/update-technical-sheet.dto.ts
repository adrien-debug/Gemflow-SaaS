import { ImageMetadata } from "@shared/types/image-metadata.ts";

export interface TechnicalSheetDto {
  generalNote: string;
  mountingNote1: string;
  mounting1Images: ImageMetadata[];
  mountingNote2: string;
  mounting2Images: ImageMetadata[];
  mountingNote3: string;
  mounting3Images: ImageMetadata[];
  mountingNote4: string;
  mounting4Images: ImageMetadata[];
  settingNote: string;
}
