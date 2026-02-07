import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import { OtherMaterial } from "@entities/other-material/model/other-material.model.ts";
import DeleteOtherMaterialButton from "@features/other-materials/delete-other-material-button/ui/DeleteOtherMaterialButton";
import EditOtherMaterialButton from "@features/other-materials/edit-other-material-button/ui/EditOtherMaterialButton";
import { MenuItem } from "@shared/ui/layouts/DashboardLayout/models/menu-item.model.ts";
import Button from "antd/es/button";
import Dropdown from "antd/es/dropdown";
import { FC } from "react";

interface Props {
  otherMaterial: OtherMaterial;
}

const OtherMaterialActionsDropdown: FC<Props> = ({ otherMaterial }) => {
  const alloyActions: MenuItem[] = [
    {
      key: "edit",
      label: <EditOtherMaterialButton otherMaterial={otherMaterial} />,
    },
    {
      key: "delete",
      label: <DeleteOtherMaterialButton otherMaterial={otherMaterial} />,
    },
  ];

  return (
    <Dropdown menu={{ items: alloyActions }} trigger={["click"]} placement="bottomRight">
      <Button size="large" icon={<EllipsisOutlined />} shape="circle"></Button>
    </Dropdown>
  );
};

export default OtherMaterialActionsDropdown;
