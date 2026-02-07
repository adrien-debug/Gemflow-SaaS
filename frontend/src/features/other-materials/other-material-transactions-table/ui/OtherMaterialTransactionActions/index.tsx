import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import { OtherMaterialTransaction } from "@entities/other-material/model/other-material-transaction.model.ts";
import EditOtherMaterialTransactionButton from "@features/other-materials/edit-other-material-transaction-button/ui/EditOtherMaterialTransactionButton";
import { MenuItem } from "@shared/ui/layouts/DashboardLayout/models/menu-item.model.ts";
import Button from "antd/es/button";
import Dropdown from "antd/es/dropdown";
import { FC } from "react";

interface Props {
  transaction: OtherMaterialTransaction;
}

const OtherMaterialTransactionActions: FC<Props> = ({ transaction }) => {
  const menuItems: MenuItem[] = [
    {
      key: "edit",
      label: <EditOtherMaterialTransactionButton transaction={transaction} />,
    },
  ];

  return (
    <Dropdown menu={{ items: menuItems }} trigger={["click"]} placement="bottomRight">
      <Button size="large" icon={<EllipsisOutlined />} shape="circle"></Button>
    </Dropdown>
  );
};

export default OtherMaterialTransactionActions;
