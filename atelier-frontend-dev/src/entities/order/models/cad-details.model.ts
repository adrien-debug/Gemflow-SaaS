import { FileMetadata } from "@shared/types/file-metadata.model.ts";
import { CadDetailsMetadata } from "@entities/order/models/cad-details-metadata.model.ts";

export interface CadDetails extends CadDetailsMetadata {
  stlFiles: FileMetadata[];
  cadFiles: FileMetadata[];
}
