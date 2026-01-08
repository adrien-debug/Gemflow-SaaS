import { FC, useState } from "react";
import Button from "antd/es/button";
import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import Dropdown from "antd/es/dropdown";
import EditMetalWeightModal from "@features/metals/edit-metal-weight/ui/EditMetalWeightModal";
import InfoBadge from "@shared/ui/InfoBadge";
import useUpdateCastingWeight from "@entities/task/hooks/useUpdateCastingWeight.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";

interface Props {
  taskId: number;
  onSave: (value: number) => void;
  disabled?: boolean;
  initialValue?: number;
  castingId: number;
}

const CastingOrderActionDropdown: FC<Props> = ({ taskId, onSave, disabled, initialValue, castingId }) => {
  const [isEditWeightOpen, setIsEditWeightOpen] = useState(false);

  const { messageApi } = useMessage();

  const mutation = useUpdateCastingWeight(taskId, castingId);

  const menuItems = [
    {
      key: "edit-parts-weight",
      label: "Edit parts weight",
      onClick: () => setIsEditWeightOpen(true),
    },
  ];

  const handleSaveWeight = (value: number) => {
    mutation.mutate(value, {
      onSuccess: () => {
        onSave(value);
        void messageApi.success("Parts weight is updated successfully.");
      },
      onError: () => {
        void messageApi.error("Failed to update parts weight.");
      },
      onSettled: () => {
        setIsEditWeightOpen(false);
      },
    });
  };

  return (
    <>
      <Dropdown menu={{ items: menuItems }} trigger={["click"]} placement="bottomRight">
        <Button size="middle" icon={<EllipsisOutlined />} shape="circle" disabled={disabled} />
      </Dropdown>

      <EditMetalWeightModal
        title="Edit parts weight"
        open={isEditWeightOpen}
        onSave={handleSaveWeight}
        onClose={() => setIsEditWeightOpen(false)}
        topRightContent={<InfoBadge title={taskId} />}
        initialValue={initialValue}
      />
    </>
  );
};

export default CastingOrderActionDropdown;
