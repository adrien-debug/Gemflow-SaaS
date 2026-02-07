import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import { Alloy } from "@entities/alloy/models/alloy.model.ts";
import DeleteAlloyButton from "@features/alloys/delete-alloy-button/ui/DeleteAlloyButton";
import EditAlloyButton from "@features/alloys/edit-alloy-button/ui/EditAlloyButton";
import { MenuItem } from "@shared/ui/layouts/DashboardLayout/models/menu-item.model.ts";
import Button from "antd/es/button";
import Dropdown from "antd/es/dropdown";
import { FC } from "react";

interface Props {
  alloy: Alloy;
}

const AlloyActionsDropdown: FC<Props> = ({ alloy }) => {
  const alloyActions: MenuItem[] = [
    {
      key: "edit",
      label: <EditAlloyButton alloy={alloy} />,
    },
    {
      key: "delete",
      label: <DeleteAlloyButton alloy={alloy} />,
    },
  ];

  return (
    <Dropdown menu={{ items: alloyActions }} trigger={["click"]} placement="bottomRight">
      <Button size="large" icon={<EllipsisOutlined />} shape="circle"></Button>
    </Dropdown>
  );
};

export default AlloyActionsDropdown;
