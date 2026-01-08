import usePartBroken from "@entities/task/hooks/usePartBroken.ts";
import { Task } from "@entities/task/models/task.model.ts";
import BrokenPartsModal from "@features/3d-printing/part-broken-form/ui/BrokenPartsModal";
import HighlightPartsModal from "@features/3d-printing/part-broken-form/ui/HighlightPartsModal";
import { ImageSize } from "@shared/constants/image.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { ImageMetadata } from "@shared/types/image-metadata.ts";
import { getImageUrls } from "@shared/utils/image/get-image-urls.ts";
import { FC, useState } from "react";

interface Props {
  task: Task;
  isFormOpen: boolean;
  onClose?: () => void;
}

const PartBrokenForm: FC<Props> = ({ task, isFormOpen, onClose }) => {
  const [isImageEditorModalOpen, setIsImageEditorModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stlCount, setStlCount] = useState<number>();

  const { imageUrl } = getImageUrls(task.orderTaskImages, ImageSize.Original, true);
  const { messageApi } = useMessage();
  const { mutate } = usePartBroken(task.id);

  const handleBrokenPartsSubmit = (value?: number) => {
    setStlCount(value);
    setIsImageEditorModalOpen(true);
    onClose?.();
  };

  const handleFinish = async (orderTaskImages?: ImageMetadata[]) => {
    setIsLoading(true);
    if (stlCount && orderTaskImages) {
      const params = { stlCount, orderTaskImages };
      mutate(params, {
        onSuccess: () => {
          void messageApi.success("New task for broken parts is created and moved to the 'To prototype' status");
        },
        onSettled: () => {
          setIsLoading(false);
        },
      });
    }
    setIsImageEditorModalOpen(false);
  };

  if (!imageUrl) return null;

  return (
    <>
      <BrokenPartsModal task={task} onSubmit={handleBrokenPartsSubmit} open={isFormOpen} onCancel={onClose} />

      <HighlightPartsModal
        task={task}
        confirmLoading={isLoading}
        width={900}
        onCancel={() => setIsImageEditorModalOpen(false)}
        open={isImageEditorModalOpen}
        imageUrl={imageUrl}
        onSubmit={handleFinish}
      />
    </>
  );
};

export default PartBrokenForm;
