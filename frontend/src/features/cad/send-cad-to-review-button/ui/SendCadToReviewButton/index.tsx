import { FC, useState } from "react";
import Button from "antd/es/button";
import CadSpentTimeModal from "@features/cad/cad-spent-time-modal/ui/CadSpentTimeModal";
import { Task } from "@entities/task/models/task.model.ts";
import MissingCadInformationModal from "@features/cad/missing-cad-information-modal/ui/MissingCadInformationModal";
import useCadDetailsMetadata from "@entities/order/hooks/useCadDetailsMetadata.ts";
import { CadDetailsMetadata } from "@entities/order/models/cad-details-metadata.model.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { Nullable } from "@shared/types/nullable.type.ts";

interface Props {
  task: Task;
}

const SendCadToReviewButton: FC<Props> = ({ task }) => {
  const { messageApi } = useMessage();
  const [isSpentTimeModalOpen, setIsSpentTimeModalOpen] = useState(false);
  const [isMissingModalOpen, setIsMissingModalOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState<Nullable<CadDetailsMetadata>>(null);
  const { mutate, isPending } = useCadDetailsMetadata();

  const handleRequest = () => {
    if (!task?.order?.id) return;

    mutate(task.order.id, {
      onSuccess: (data) => {
        setCardDetails(data);
        if (data.stlCount) {
          setIsSpentTimeModalOpen(true);
        } else {
          setIsMissingModalOpen(true);
        }
      },
      onError: () => {
        void messageApi.error("Something went wrong!");
      },
    });
  };

  const handleCloseSpentTime = () => {
    setIsSpentTimeModalOpen(false);
    setCardDetails(null);
  };

  const handleCloseMissing = () => {
    setIsMissingModalOpen(false);
    setCardDetails(null);
  };

  return (
    <>
      <Button
        style={{ width: "100%", minWidth: 150, fontSize: "14px" }}
        size="large"
        type="primary"
        onClick={handleRequest}
        loading={isPending}>
        Move to Review
      </Button>

      <CadSpentTimeModal
        open={isSpentTimeModalOpen}
        taskId={task.id}
        cadDetails={cardDetails ?? undefined}
        onClose={handleCloseSpentTime}
      />
      <MissingCadInformationModal open={isMissingModalOpen} orderId={task?.order?.id} onClose={handleCloseMissing} />
    </>
  );
};

export default SendCadToReviewButton;
