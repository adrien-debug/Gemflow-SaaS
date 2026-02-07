import MetalTag from "@entities/metal/ui/MetalTag";
import { Task } from "@entities/task/models/task.model.ts";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { ImageSize } from "@shared/constants/image.ts";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { ImageMetadata } from "@shared/types/image-metadata.ts";
import ImageEditorModal from "@shared/ui/modals/ImageEditorModal";
import { getImageUrls } from "@shared/utils/image/get-image-urls.ts";
import { ModalProps } from "antd/es/modal";
import Typography from "antd/es/typography";
import { FC } from "react";
import useCadDetails from "@entities/order/hooks/useCadDetails.ts";

interface Props extends Omit<ModalProps, "onOk"> {
  task: Task;
  imageUrl?: string;
  onSubmit: (image?: ImageMetadata[]) => void | Promise<void>;
  metal?: BaseItem;
}

export const HighlightMetalModal: FC<Props> = ({ imageUrl, metal, task, ...modalProps }) => {
  const { data } = useCadDetails(task.order.id!);
  const { imageUrl: originalImageUrl } = getImageUrls(data?.cadImages, ImageSize.Original, true);

  return (
    <ImageEditorModal
      {...modalProps}
      title={
        <>
          <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 1, color: brandingColorPalette.brand6 }}>
            Highlight parts for the metal
          </Typography.Title>
          <MetalTag>{metal?.name}</MetalTag>
        </>
      }
      originalImageUrl={originalImageUrl}
      imageUrl={imageUrl}
    />
  );
};

export default HighlightMetalModal;
