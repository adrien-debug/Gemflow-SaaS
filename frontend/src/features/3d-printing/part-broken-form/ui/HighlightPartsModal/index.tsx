import useCadDetails from "@entities/order/hooks/useCadDetails.ts";
import { Task } from "@entities/task/models/task.model.ts";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { ImageSize } from "@shared/constants/image.ts";
import { ImageMetadata } from "@shared/types/image-metadata.ts";
import ImageEditorModal from "@shared/ui/modals/ImageEditorModal";
import { getImageUrls } from "@shared/utils/image/get-image-urls.ts";
import { ModalProps } from "antd/es/modal";
import Typography from "antd/es/typography";
import { FC } from "react";

interface Props extends Omit<ModalProps, "onOk"> {
  task: Task;
  imageUrl?: string;
  onSubmit: (image?: ImageMetadata[]) => void | Promise<void>;
}

export const HighlightPartsModal: FC<Props> = ({ imageUrl, task, onCancel, ...modalProps }) => {
  const { data } = useCadDetails(task.order.id!);
  const { imageUrl: originalImageUrl } = getImageUrls(data?.cadImages, ImageSize.Original, true);

  return (
    <ImageEditorModal
      title={
        <>
          <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
            Highlight broken parts
          </Typography.Title>
        </>
      }
      {...modalProps}
      onCancel={onCancel}
      originalImageUrl={originalImageUrl}
      imageUrl={imageUrl}
    />
  );
};

export default HighlightPartsModal;
