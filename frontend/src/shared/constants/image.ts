export enum ImageSize {
  Compressed = "COMPRESSED",
  Original = "ORIGINAL",
  Small = "SMALL",
}

export const IMAGE_MAX_SIZE_MB = 5;
export const IMAGE_CONVERSION_LIMIT_MB = 1;

export const ImageAcceptTypes = ".jpg,.jpeg,.png,.webp";

export enum ImageMimeTypes {
  jpg = "image/jpg",
  jpeg = "image/jpeg",
  png = "image/png",
  webp = "image/webp",
}
