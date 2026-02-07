import useMoveToCasting from "@entities/task/hooks/useMoveToCasting.ts";
import { Task } from "@entities/task/models/task.model.ts";
import { SelectMetalSchema } from "@features/3d-printing/move-to-casting-form/models/select-metal.schema.ts";
import HighlightMetalModal from "@features/3d-printing/move-to-casting-form/ui/HighlightMetalModal";
import SelectMetalModal from "@features/3d-printing/move-to-casting-form/ui/SelectMetalModal";
import { ImageSize } from "@shared/constants/image.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { ImageMetadata } from "@shared/types/image-metadata.ts";
import { getImageUrls } from "@shared/utils/image/get-image-urls.ts";
import { FC, useState } from "react";

interface Props {
  task: Task;
  isFormOpen: boolean;
  onClose: () => void;
}

const MoveToCastingForm: FC<Props> = ({ task, isFormOpen, onClose }) => {
  const [isImageEditorModalOpen, setIsImageEditorModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [metalInfo, setMetalInfo] = useState<SelectMetalSchema>();

  const { imageUrl } = getImageUrls(task.orderTaskImages, ImageSize.Original, true);
  const { messageApi } = useMessage();
  const { mutate } = useMoveToCasting(task.id);

  const handleSelectMetalSubmit = (values: SelectMetalSchema) => {
    setMetalInfo(values);
    setIsImageEditorModalOpen(true);
    onClose();
  };

  const handleSubmit = async (orderTaskImages?: ImageMetadata[]) => {
    setIsLoading(true);
    if (metalInfo && orderTaskImages) {
      const params = { ...metalInfo, orderTaskImages };
      mutate(params, {
        onSuccess: () => {
          void messageApi.success("The task is moved to the ‘Pre-casting’ stage");
        },
        onSettled: () => {
          setIsLoading(false);
        },
      });
    }
    setIsImageEditorModalOpen(false);
  };

  const getSelectedMetal = () => {
    const selectedMetalId = metalInfo?.metalId;
    return task.metals.find(({ id }) => id === selectedMetalId);
  };

  if (!imageUrl) return null;

  return (
    <>
      <SelectMetalModal open={isFormOpen} task={task} onSubmit={handleSelectMetalSubmit} onCancel={onClose} />

      {isImageEditorModalOpen && (
        <HighlightMetalModal
          task={task}
          metal={getSelectedMetal()}
          confirmLoading={isLoading}
          width={900}
          onCancel={() => setIsImageEditorModalOpen(false)}
          open={isImageEditorModalOpen}
          imageUrl={imageUrl}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default MoveToCastingForm;
