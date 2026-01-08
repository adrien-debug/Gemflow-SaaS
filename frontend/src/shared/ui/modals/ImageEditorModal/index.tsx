import { ImageMetadata } from "@shared/types/image-metadata.ts";
import ImageEditor from "@shared/ui/ImageEditor";
import { useImageEditorActions } from "@shared/ui/ImageEditor/hooks/useImageEditorActions.ts";
import { uploadImage } from "@shared/utils/image/upload-image.ts";
import Button from "antd/es/button";
import Flex from "antd/es/flex";
import Modal, { ModalProps } from "antd/es/modal";
import { FC, MouseEvent, useState } from "react";
import "./styles.scss";

interface Props extends Omit<ModalProps, "onOk"> {
  imageUrl?: string;
  originalImageUrl?: string;
  onSubmit: (image?: ImageMetadata[]) => void | Promise<void>;
}

export const ImageEditorModal: FC<Props> = ({
  imageUrl,
  originalImageUrl,
  onSubmit,
  open,
  onCancel,
  ...modalProps
}) => {
  const ref = useImageEditorActions();
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const image = ref.current?.getImage();
    if (image) {
      const uploadedImage = await uploadImage(image);
      onSubmit(uploadedImage);
    }
    setIsLoading(false);
  };

  const handleReset = () => {
    if (originalImageUrl) {
      ref?.current?.setImage(originalImageUrl);
    }
  };

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    onCancel?.(e);
  };

  return (
    <Modal
      open={open}
      {...modalProps}
      centered
      className="image-editor-modal"
      onOk={handleSubmit}
      okButtonProps={{ disabled: !isReady }}
      onCancel={handleCancel}
      confirmLoading={isLoading}
      footer={(originNode) => (
        <Flex justify="space-between">
          <Button onClick={handleReset}>Reset</Button>
          <Flex gap={16}>{originNode}</Flex>
        </Flex>
      )}>
      {imageUrl && <ImageEditor ref={ref} imageUrl={imageUrl} onEditorReady={setIsReady} />}
    </Modal>
  );
};

export default ImageEditorModal;
