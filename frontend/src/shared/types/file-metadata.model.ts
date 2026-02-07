import { FileSource } from "@shared/constants/file-source.ts";

export interface FileMetadata {
  id: number;
  fileName?: string;
  contentType?: string;
  source?: FileSource;
  downloadUrl?: string;
  downloadUrlNoCache?: string;
}
