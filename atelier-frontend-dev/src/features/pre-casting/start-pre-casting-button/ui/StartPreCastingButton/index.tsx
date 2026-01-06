import { FC, useState } from "react";
import Button from "antd/es/button";
import { Task } from "@entities/task/models/task.model.ts";
import SelectCylinderModal from "@features/pre-casting/select-cylinder-modal/ui/SelectCylinderModal";

interface Props {
  task: Task;
}

const StartPreCastingButton: FC<Props> = ({ task }) => {
  const [isSelectCylinderModalOpen, setIsSelectCylinderModalOpen] = useState(false);

  return (
    <>
      <Button
        style={{ width: "100%", fontSize: "14px" }}
        size="large"
        type="primary"
        onClick={() => setIsSelectCylinderModalOpen(true)}>
        To Casting
      </Button>

      <SelectCylinderModal
        metal={task.metals[0]}
        taskId={task.id}
        open={isSelectCylinderModalOpen}
        onCancel={() => setIsSelectCylinderModalOpen(false)}
      />
    </>
  );
};

export default StartPreCastingButton;
