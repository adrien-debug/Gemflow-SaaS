import Button from "antd/es/button";
import { FC, useState } from "react";
import CadAcceptanceDateModal from "@features/cad/cad-acceptance-date-modal/ui/CadAcceptanceDateModal";
import { Task } from "@entities/task/models/task.model.ts";

interface Props {
  task: Task;
}

const CadCompleteButton: FC<Props> = ({ task }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleClick = () => {
    setModalOpen(true);
  };

  return (
    <>
      <Button size="large" type="primary" style={{ width: "100%", fontSize: "14px" }} onClick={handleClick}>
        CAD complete
      </Button>

      <CadAcceptanceDateModal open={modalOpen} onClose={handleClose} task={task} />
    </>
  );
};

export default CadCompleteButton;
