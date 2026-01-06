import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import { AlloyedMetal } from "@entities/alloyed-metal/models/alloyed-metal.model.ts";
import DeleteAlloyedMetalButton from "@features/alloyed-metals/delete-alloyed-metal-button/ui/DeleteAlloyedMetalButton";
import EditAlloyedMetalButton from "@features/alloyed-metals/edit-alloyed-metal-button/ui/EditAlloyedMetalButton";
import { MenuItem } from "@shared/ui/layouts/DashboardLayout/models/menu-item.model.ts";
import Button from "antd/es/button";
import Dropdown from "antd/es/dropdown";
import { FC } from "react";

interface Props {
  alloyedMetal: AlloyedMetal;
}

const AlloyActionsDropdown: FC<Props> = ({ alloyedMetal }) => {
  const alloyActions: MenuItem[] = [
    {
      key: "edit",
      label: <EditAlloyedMetalButton alloyedMetal={alloyedMetal} />,
    },
    {
      key: "delete",
      label: <DeleteAlloyedMetalButton alloyedMetal={alloyedMetal} />,
    },
  ];

  return (
    <Dropdown menu={{ items: alloyActions }} trigger={["click"]} placement="bottomRight">
      <Button size="large" icon={<EllipsisOutlined />} shape="circle"></Button>
    </Dropdown>
  );
};

export default AlloyActionsDropdown;
