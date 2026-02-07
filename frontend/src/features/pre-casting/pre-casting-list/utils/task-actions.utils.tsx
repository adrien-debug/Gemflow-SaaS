import { TaskStatus } from "@entities/task/constants/task-status.ts";
import { Task } from "@entities/task/models/task.model.ts";
import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import Button from "antd/es/button";
import StartPreCastingButton from "@features/pre-casting/start-pre-casting-button/ui/StartPreCastingButton";
import CompletePreCastingButton from "@features/pre-casting/complete-pre-casting-button/ui/CompletePreCastingButton";
import PreCastingActionsDropdown from "@features/pre-casting/pre-casting-actions-dropdown/ui/PreCastingActionsDropdown";

export const getPreCastingTaskActions = (task: Task) => {
  switch (task.status) {
    case TaskStatus.ReadyToCasting:
      return (
        <>
          <StartPreCastingButton task={task} />

          <Button disabled size="large" icon={<EllipsisOutlined />} shape="circle"></Button>
        </>
      );
    case TaskStatus.InCylinder:
      return (
        <>
          <CompletePreCastingButton task={task} />

          <PreCastingActionsDropdown task={task} />
        </>
      );
    default:
      return null;
  }
};
