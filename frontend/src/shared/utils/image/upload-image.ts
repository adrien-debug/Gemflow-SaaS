import { IMAGE_CONVERSION_LIMIT_MB, ImageMimeTypes, ImageSize } from "@shared/constants/image.ts";
import FileService from "@shared/services/file.service.ts";
import { ImageMetadata } from "@shared/types/image-metadata.ts";
import { getImageSizeMb } from "@shared/utils/image/get-image-size-mb.ts";

interface ImageFileModel {
  sizeType: ImageSize;
  file: File;
}

const imagePresetsBySize: Record<ImageSize, { quality: number; maxWidth: number }> = {
  [ImageSize.Original]: { quality: 1, maxWidth: 1920 },
  [ImageSize.Small]: { quality: 1, maxWidth: 400 },
  [ImageSize.Compressed]: { quality: 0.7, maxWidth: 1920 },
};

const isValidImage = (file: File): boolean => {
  const validTypes: string[] = [ImageMimeTypes.jpeg, ImageMimeTypes.jpg, ImageMimeTypes.png, ImageMimeTypes.webp];
  return validTypes.includes(file.type);
};

const compressImage = (img: HTMLImageElement, name: string, type: string, size: ImageSize): Promise<File> =>
  new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const { quality, maxWidth } = imagePresetsBySize[size];

    if (!ctx) {
      reject(new Error("Canvas is not supported"));
      return;
    }

    // Resize if necessary
    let width = img.width;
    let height = img.height;
    if (width > maxWidth) {
      height = (maxWidth / width) * height;
      width = maxWidth;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(new File([blob], name, { type }));
        } else {
          reject(new Error("Compression failed"));
          return;
        }
      },
      type,
      quality,
    );
  });

const getCompressedImageTuple = (file: File): Promise<ImageFileModel[]> =>
  new Promise<ImageFileModel[]>((resolve, reject) => {
    const sizes: Record<ImageSize, boolean> = {
      [ImageSize.Original]: true,
      [ImageSize.Small]: true,
      [ImageSize.Compressed]: true,
    };

    if (!isValidImage(file)) {
      throw new Error(`Invalid image type "${file.type}"`);
    }

    const imageSizeMb = getImageSizeMb(file.size);
    if (imageSizeMb < IMAGE_CONVERSION_LIMIT_MB || file.type === ImageMimeTypes.png) {
      sizes[ImageSize.Compressed] = false;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = async () => {
        const imageWidth = img.width;
        if (imageWidth < imagePresetsBySize[ImageSize.Small].maxWidth) sizes[ImageSize.Small] = false;

        const images = await Promise.all(
          Object.entries(sizes).map(async ([size, isEnabled]) => {
            const sizeType = size as ImageSize;
            if (isEnabled) {
              return {
                sizeType,
                file: await compressImage(img, file.name, file.type, sizeType),
              } as ImageFileModel;
            }
          }),
        );

        resolve(images.filter(Boolean) as ImageFileModel[]);
      };

      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });

export const uploadImage = async (file: File): Promise<ImageMetadata[]> => {
  const images = await getCompressedImageTuple(file);
  return Promise.all(
    images.map(async ({ sizeType, file }) => ({
      sizeType,
      file: await FileService.uploadFile(file),
    })),
  );
};
