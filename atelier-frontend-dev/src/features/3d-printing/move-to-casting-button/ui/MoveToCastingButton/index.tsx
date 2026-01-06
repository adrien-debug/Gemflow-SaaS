import { Task } from "@entities/task/models/task.model.ts";
import MoveToCastingForm from "@features/3d-printing/move-to-casting-form/ui/MoveToCastingForm";
import Button from "antd/es/button";
import { FC, useState } from "react";

interface Props {
  task: Task;
}

const MoveToCastingButton: FC<Props> = ({ task }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <Button
        style={{ width: "100%", fontSize: "14px" }}
        size="large"
        type="primary"
        onClick={() => setIsFormOpen(true)}>
        Move to casting
      </Button>

      <MoveToCastingForm task={task} isFormOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
};

export default MoveToCastingButton;
