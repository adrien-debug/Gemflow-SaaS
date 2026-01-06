import useOnMachine from "@entities/task/hooks/useOnMachine.ts";
import { FC } from "react";
import Button from "antd/es/button";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { Task } from "@entities/task/models/task.model.ts";

interface Props {
  task: Task;
}

const OnMachineButton: FC<Props> = ({ task }) => {
  const { messageApi } = useMessage();
  const mutation = useOnMachine();

  const handleStartCad = () => {
    mutation.mutate(task.id, {
      onSuccess: () => {
        void messageApi.success("The task is moved to the ‘In prototyping’ status");
      },
      onError: () => {
        void messageApi.error("Failed to move task on machine ");
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
      On Machine
    </Button>
  );
};

export default OnMachineButton;
