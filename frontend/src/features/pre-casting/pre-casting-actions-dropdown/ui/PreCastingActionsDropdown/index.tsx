import { Task } from "@entities/task/models/task.model.ts";
import PartsBrokenButton from "@features/3d-printing/part-broken-button/ui/PartBrokenButton";
import Button from "antd/es/button";
import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import Dropdown from "antd/es/dropdown";
import { MenuItem } from "@shared/ui/layouts/DashboardLayout/models/menu-item.model.ts";
import { FC } from "react";

interface Props {
  task: Task;
}

const PreCastingActionsDropdown: FC<Props> = ({ task }) => {
  const inCadMenuItems: MenuItem[] = [
    {
      key: "parts-broken",
      label: <PartsBrokenButton task={task} />,
    },
  ];

  return (
    <Dropdown menu={{ items: inCadMenuItems }} trigger={["click"]} placement="bottomRight">
      <Button size="large" icon={<EllipsisOutlined />} shape="circle"></Button>
    </Dropdown>
  );
};

export default PreCastingActionsDropdown;
