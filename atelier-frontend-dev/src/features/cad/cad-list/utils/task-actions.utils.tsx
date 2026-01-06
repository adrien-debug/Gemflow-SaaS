import { TaskStatus } from "@entities/task/constants/task-status.ts";
import StartCadButton from "@features/cad/start-cad-button/ui/StartCadButton";
import { Task } from "@entities/task/models/task.model.ts";
import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import Button from "antd/es/button";
import SendCadToReviewButton from "@features/cad/send-cad-to-review-button/ui/SendCadToReviewButton";
import CadActionsDropdown from "@features/cad/cad-actions-dropdown/ui/CadActionsDropdown";
import CadCompleteButton from "@features/cad/cad-complete-button/ui/CadCompleteButton";

export const getCadTaskActions = (task: Task) => {
  switch (task.status) {
    case TaskStatus.ReadyForCad:
      return (
        <>
          <StartCadButton task={task} />

          <Button disabled size="large" icon={<EllipsisOutlined />} shape="circle"></Button>
        </>
      );
    case TaskStatus.InCad:
      return (
        <>
          <SendCadToReviewButton task={task} />

          <CadActionsDropdown task={task} />
        </>
      );
    case TaskStatus.CadReview:
      return (
        <>
          <CadCompleteButton task={task} />

          <CadActionsDropdown task={task} />
        </>
      );
    default:
      return null;
  }
};
