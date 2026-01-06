import { FileMetadata } from "@shared/types/file-metadata.model.ts";
import FileMetadataConverter from "@shared/utils/image/file-metadata.converter.ts";
import type { UploadFile } from "antd/es/upload/interface";

export const mapFileMetadataListToFileList = (files: FileMetadata[] = []): UploadFile[] => {
  return files.map((file: FileMetadata) => FileMetadataConverter.convert(file));
};
