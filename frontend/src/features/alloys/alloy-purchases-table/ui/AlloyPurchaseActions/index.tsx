import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import { AlloyPurchase } from "@entities/alloy/models/alloy-purchase.model";
import DeleteAlloyPurchaseButton from "@features/alloys/delete-alloy-purchase-button/ui/DeleteAlloyPurchaseButton";
import EditAlloyPurchaseButton from "@features/alloys/edit-alloy-purchase-button/ui/EditAlloyPurchaseButton";
import { MenuItem } from "@shared/ui/layouts/DashboardLayout/models/menu-item.model.ts";
import Button from "antd/es/button";
import Dropdown from "antd/es/dropdown";
import { FC } from "react";

interface Props {
  purchase: AlloyPurchase;
}

const AlloyPurchaseActions: FC<Props> = ({ purchase }) => {
  const inCadMenuItems: MenuItem[] = [
    {
      key: "edit",
      label: <EditAlloyPurchaseButton purchase={purchase} />,
    },
    {
      key: "delete",
      label: <DeleteAlloyPurchaseButton purchase={purchase} />,
    },
  ];

  return (
    <Dropdown menu={{ items: inCadMenuItems }} trigger={["click"]} placement="bottomRight">
      <Button size="large" icon={<EllipsisOutlined />} shape="circle"></Button>
    </Dropdown>
  );
};

export default AlloyPurchaseActions;
