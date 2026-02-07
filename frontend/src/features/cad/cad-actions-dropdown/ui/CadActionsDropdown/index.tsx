import { Task } from "@entities/task/models/task.model.ts";
import { FC } from "react";
import Button from "antd/es/button";
import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import Dropdown from "antd/es/dropdown";
import { MenuItem } from "@shared/ui/layouts/DashboardLayout/models/menu-item.model.ts";
import useRestartCad from "@entities/task/hooks/useRestartCad.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { TaskStatus } from "@entities/task/constants/task-status.ts";

interface Props {
  task: Task;
}

const CadActionsDropdown: FC<Props> = ({ task }) => {
  const { messageApi } = useMessage();
  const restartMutation = useRestartCad();

  const inCadMenuItems: MenuItem[] = [
    {
      key: "cad-restart",
      label: task.status === TaskStatus.InCad ? "Restart" : "Update needed",
      onClick: () =>
        restartMutation.mutate(task.id, {
          onSuccess: () => {
            void messageApi.success(
              task.status === TaskStatus.InCad
                ? "The task is moved to the ‘Ready for CAD’ status to restart"
                : "The task is moved to the ‘Ready for CAD’ status for revisions",
            );
          },
          onError: () => {
            void messageApi.error("Failed to move task to the ‘Ready for CAD’ status");
          },
        }),
    },
  ];

  return (
    <Dropdown menu={{ items: inCadMenuItems }} trigger={["click"]} placement="bottomRight">
      <Button size="large" icon={<EllipsisOutlined />} shape="circle"></Button>
    </Dropdown>
  );
};

export default CadActionsDropdown;
