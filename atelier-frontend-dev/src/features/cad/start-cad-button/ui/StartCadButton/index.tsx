import { FC } from "react";
import Button from "antd/es/button";
import useStartCad from "@entities/task/hooks/useStartCad.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { Task } from "@entities/task/models/task.model.ts";

interface Props {
  task: Task;
}

const StartCadButton: FC<Props> = ({ task }) => {
  const { messageApi } = useMessage();
  const mutation = useStartCad();

  const handleStartCad = () => {
    mutation.mutate(task.id, {
      onSuccess: () => {
        void messageApi.success("The task is moved to the ‘CAD in Progress’ status");
      },
      onError: () => {
        void messageApi.error("Failed to start CAD task");
      },
    });
  };

  return (
    <Button
      style={{ width: "100%", fontSize: "14px" }}
      loading={mutation.isPending}
      size="large"
      type="primary"
      onClick={handleStartCad}>
      Start CAD
    </Button>
  );
};

export default StartCadButton;
