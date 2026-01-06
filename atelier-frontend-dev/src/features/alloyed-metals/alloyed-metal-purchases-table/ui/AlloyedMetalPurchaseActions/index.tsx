import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import { AlloyedMetalPurchase } from "@entities/alloyed-metal/models/alloyed-metal-purchase.model.ts";
import DeleteAlloyedMetalPurchaseButton from "@features/alloyed-metals/delete-alloed-metal-purchase-button/ui/DeleteAlloyedMetalPurchaseButton";
import EditAlloyedMetalPurchaseButton from "@features/alloyed-metals/edit-alloyed-metal-purchase-button/ui/EditAlloyedMetalPurchaseButton";
import { MenuItem } from "@shared/ui/layouts/DashboardLayout/models/menu-item.model.ts";
import Button from "antd/es/button";
import Dropdown from "antd/es/dropdown";
import { FC } from "react";

interface Props {
  purchase: AlloyedMetalPurchase;
}

const AlloyedMetalPurchaseActions: FC<Props> = ({ purchase }) => {
  const inCadMenuItems: MenuItem[] = [
    {
      key: "edit",
      label: <EditAlloyedMetalPurchaseButton purchase={purchase} />,
    },
    {
      key: "delete",
      label: <DeleteAlloyedMetalPurchaseButton purchase={purchase} />,
    },
  ];

  return (
    <Dropdown menu={{ items: inCadMenuItems }} trigger={["click"]} placement="bottomRight">
      <Button size="large" icon={<EllipsisOutlined />} shape="circle"></Button>
    </Dropdown>
  );
};

export default AlloyedMetalPurchaseActions;
