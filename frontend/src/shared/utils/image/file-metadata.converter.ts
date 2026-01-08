import { Converter } from "@shared/types/converter.type.ts";
import { FileMetadata } from "@shared/types/file-metadata.model.ts";
import { UploadFile } from "antd/es/upload";

class FileMetadataConverter implements Converter<FileMetadata, UploadFile> {
  convert(from: FileMetadata): UploadFile {
    return {
      uid: `${from.id}`,
      url: from.downloadUrl || "",
      name: from.fileName || "FileName",
      status: "done",
    };
  }
}

export default new FileMetadataConverter();
