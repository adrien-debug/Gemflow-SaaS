import { TaskStatus } from "@entities/task/constants/task-status.ts";
import Segmented from "antd/es/segmented";
import { FC } from "react";

interface Props {
  onStatusChange?: (status: TaskStatus) => void;
}

const PrintingFilter: FC<Props> = ({ onStatusChange }) => {
  return (
    <section>
      <Segmented
        size="large"
        shape="round"
        options={[
          { label: "To prototype", value: TaskStatus.ReadyForPrototyping },
          {
            label: "In prototyping",
            value: TaskStatus.InPrototyping,
          },
        ]}
        onChange={onStatusChange}
      />
    </section>
  );
};

export default PrintingFilter;
