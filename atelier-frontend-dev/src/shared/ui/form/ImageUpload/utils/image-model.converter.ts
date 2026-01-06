import { ImageSize } from "@shared/constants/image.ts";
import { Converter } from "@shared/types/converter.type";
import { ImageMetadata } from "@shared/types/image-metadata.ts";
import FileMetadataConverter from "@shared/utils/image/file-metadata.converter.ts";
import { UploadFile } from "antd/es/upload";

class ImageMetadataConverter implements Converter<ImageMetadata[], UploadFile> {
  convert(from: ImageMetadata[]): UploadFile {
    const { file } = from.find((image) => image.sizeType === ImageSize.Original) as ImageMetadata;
    return FileMetadataConverter.convert(file);
  }
}

export default new ImageMetadataConverter();
