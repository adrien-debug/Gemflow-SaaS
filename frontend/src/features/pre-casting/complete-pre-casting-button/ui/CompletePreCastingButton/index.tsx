import useCompleteCasting from "@entities/task/hooks/useCompleteCasting.ts";
import { FC, useState } from "react";
import Button from "antd/es/button";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { Task } from "@entities/task/models/task.model.ts";
import PartsWeighModal from "@features/pre-casting/parts-weight-modal/ui/PartsWeighModal";

interface Props {
  task: Task;
}

const CompletePreCastingButton: FC<Props> = ({ task }) => {
  const [isSelectCylinderModalOpen, setIsSelectCylinderModalOpen] = useState(false);
  const { messageApi } = useMessage();
  const mutation = useCompleteCasting(task.id);

  const handleSubmit = (weight: number) => {
    mutation.mutate(
      { weight },
      {
        onSuccess: () => {
          void messageApi.success(`The task is completed and the weight of casted parts is updated in order details`);
        },
        onError: () => {
          void messageApi.error("Failed to complete task");
        },
      },
    );
  };

  return (
    <>
      <Button
        style={{ width: "100%", fontSize: "14px" }}
        loading={mutation.isPending}
        size="large"
        type="primary"
        onClick={() => setIsSelectCylinderModalOpen(true)}>
        All cast
      </Button>

      <PartsWeighModal
        task={task}
        open={isSelectCylinderModalOpen}
        onSubmit={handleSubmit}
        onCancel={() => setIsSelectCylinderModalOpen(false)}
      />
    </>
  );
};

export default CompletePreCastingButton;
