import { Task } from "@entities/task/models/task.model.ts";
import PartBrokenForm from "@features/3d-printing/part-broken-form/ui/PartBrokenForm";
import { FC, useState } from "react";

interface Props {
  task: Task;
}

const PartsBrokenButton: FC<Props> = ({ task }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <a
        target="_blank"
        rel="noopener noreferrer"
        role="button"
        style={{ width: "100%", height: "100%" }}
        onClick={() => setIsFormOpen(true)}>
        Part broken
      </a>

      <PartBrokenForm task={task} isFormOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
};

export default PartsBrokenButton;
