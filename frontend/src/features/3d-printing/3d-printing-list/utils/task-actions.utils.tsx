import { TaskStatus } from "@entities/task/constants/task-status.ts";
import PrintingActionsDropdown from "@features/3d-printing/3d-printing-actions-dropdown/ui/PrintingActionsDropdown";
import MoveToCastingButton from "@features/3d-printing/move-to-casting-button/ui/MoveToCastingButton";
import OnMachineButton from "@features/3d-printing/on-machine-button/ui/OnMachineButton";
import { Task } from "@entities/task/models/task.model.ts";
import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import Button from "antd/es/button";

export const get3dPrintingTaskActions = (task: Task) => {
  switch (task.status) {
    case TaskStatus.ReadyForPrototyping:
      return (
        <>
          <OnMachineButton task={task} />

          <Button disabled size="large" icon={<EllipsisOutlined />} shape="circle"></Button>
        </>
      );
    case TaskStatus.InPrototyping:
      return (
        <>
          <MoveToCastingButton task={task} />

          <PrintingActionsDropdown task={task} />
        </>
      );
    default:
      return null;
  }
};
