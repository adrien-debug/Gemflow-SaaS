import { environment } from "@shared/constants/environment.ts";
import { FileSource } from "@shared/constants/file-source.ts";
import { ImageSize } from "@shared/constants/image.ts";
import { ImageMetadata } from "@shared/types/image-metadata.ts";

export const getImageUrls = (src?: ImageMetadata[], size: ImageSize = ImageSize.Small, noCache: boolean = false) => {
  const image = src?.find(({ sizeType }) => sizeType === size);
  const original = src?.find(({ sizeType }) => sizeType === ImageSize.Original);

  const imageUrl =
    image?.file.source === FileSource.Local
      ? `${environment.baseURL}${image.file[noCache ? "downloadUrlNoCache" : "downloadUrl"]}`
      : image?.file[noCache ? "downloadUrlNoCache" : "downloadUrl"];
  const originalUrl =
    original?.file.source === FileSource.Local
      ? `${environment.baseURL}${original.file[noCache ? "downloadUrlNoCache" : "downloadUrl"]}`
      : original?.file[noCache ? "downloadUrlNoCache" : "downloadUrl"];

  return { imageUrl, originalUrl };
};
