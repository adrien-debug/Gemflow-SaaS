import { TaskStatus } from "@entities/task/constants/task-status.ts";
import Segmented from "antd/es/segmented";
import { FC } from "react";

interface Props {
  onStatusChange?: (status: TaskStatus) => void;
}

const CadFilter: FC<Props> = ({ onStatusChange }) => {
  return (
    <section>
      <Segmented
        size="large"
        shape="round"
        options={[
          { label: "Ready for CAD", value: TaskStatus.ReadyForCad },
          {
            label: "CAD in Progress",
            value: TaskStatus.InCad,
          },
          {
            label: "CAD review",
            value: TaskStatus.CadReview,
          },
        ]}
        onChange={onStatusChange}
      />
    </section>
  );
};

export default CadFilter;
