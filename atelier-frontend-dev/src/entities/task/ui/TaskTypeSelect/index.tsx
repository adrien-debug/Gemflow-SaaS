import Select, { SelectProps } from "antd/es/select";
import { generateTaskType } from "@entities/task/utils/generate-task-type.ts";
import { FC } from "react";

export const TaskTypeSelect: FC<SelectProps> = ({ ...rest }) => {
  const taskType = generateTaskType();

  return (
    <Select
      id="task-type"
      size="large"
      placeholder="Choose task type"
      options={taskType}
      fieldNames={{ value: "id", label: "name" }}
      {...rest}
    />
  );
};
