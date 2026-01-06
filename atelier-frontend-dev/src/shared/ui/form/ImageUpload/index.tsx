import "./styles.scss";
import InboxOutlined from "@ant-design/icons/InboxOutlined";
import { IMAGE_MAX_SIZE_MB, ImageAcceptTypes, ImageSize } from "@shared/constants/image.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { ImageMetadata } from "@shared/types/image-metadata.ts";
import { Nullable } from "@shared/types/nullable.type.ts";
import ImageModelConverter from "@shared/ui/form/ImageUpload/utils/image-model.converter.ts";
import Image from "@shared/ui/Image";
import Loading from "@shared/ui/Loading";
import { getImageSizeMb } from "@shared/utils/image/get-image-size-mb.ts";
import { uploadImage } from "@shared/utils/image/upload-image.ts";
import Button from "antd/es/button";
import Flex from "antd/es/flex";
import type { UploadProps, UploadFile } from "antd/es/upload";
import Dragger from "antd/es/upload/Dragger";
import { FC, useEffect, useState } from "react";

export interface ImageUploadProps {
  value?: Nullable<ImageMetadata[]>;
  onChange?: (value: Nullable<ImageMetadata[]>) => void;
  imageSize?: number;
  showDescription?: boolean;
  circled?: boolean;
  onStartLoading?: () => void;
  onFinishLoading?: () => void;
}

const ImageUpload: FC<ImageUploadProps> = ({
  value,
  imageSize = 220,
  showDescription = true,
  circled = false,
  onChange,
  onStartLoading,
  onFinishLoading,
  ...rest
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const { messageApi } = useMessage();

  const imageUploadStyle: Record<string, string> = {
    ["--image-size"]: `${imageSize}px`,
  };

  const handleRemove = () => {
    setPreviewImage("");
    setFileList([]);
    onChange?.(null);
  };

  const handleChange = async (file: UploadFile) => {
    onStartLoading?.();
    setIsLoading(true);
    setFileList([{ ...file, status: "uploading" }]);

    const uploadedImage = await uploadImage(file as unknown as File);
    const original = uploadedImage.find(({ sizeType }) => sizeType === ImageSize.Original);

    setFileList((prev) =>
      prev.map((f) => ({
        ...f,
        status: "done",
        url: original?.file.downloadUrl,
        uid: `${original?.file.id}`,
      })),
    );

    setPreviewImage(original?.file.downloadUrl);
    onChange?.(uploadedImage);
  };

  const handleOnLoad = () => {
    setIsLoading(false);
    onFinishLoading?.();
  };

  const beforeUpload: UploadProps["beforeUpload"] = async (file) => {
    if (getImageSizeMb(file.size) < IMAGE_MAX_SIZE_MB) {
      void handleChange(file);
    } else {
      messageApi.error(`Maximum file size is ${IMAGE_MAX_SIZE_MB} MB. Please upload a smaller file.`);
    }

    return false;
  };

  useEffect(() => {
    if (value?.length) {
      const image = ImageModelConverter.convert(value);
      setPreviewImage(image.url);
      setFileList([image]);
    }
  }, [value]);

  return (
    <Flex vertical className={`image-upload ${circled ? "circle" : ""}`} style={imageUploadStyle}>
      {isLoading && <Loading className="image-loading" />}
      {!isLoading && previewImage && (
        <Button id="remove-image" className="remove-button" onClick={handleRemove}>
          Remove
        </Button>
      )}
      <Dragger
        {...rest}
        id="dragger"
        accept={ImageAcceptTypes}
        className={`${circled ? "circle" : ""}`}
        fileList={fileList}
        onRemove={handleRemove}
        beforeUpload={beforeUpload}
        openFileDialogOnClick={!value?.length}>
        <Flex vertical align="center" justify="center">
          {previewImage ? (
            <Image
              className="preview-image"
              bordered={false}
              preview={false}
              url={previewImage}
              onLoad={handleOnLoad}
            />
          ) : (
            !isLoading && (
              <>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                {showDescription && <p className="ant-upload-text">Click or drag file to this area to upload</p>}
              </>
            )
          )}
        </Flex>
      </Dragger>
    </Flex>
  );
};

export default ImageUpload;
