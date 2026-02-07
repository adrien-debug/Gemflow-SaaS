import { FC, useRef } from "react";
import DiamondUsageForm, { DiamondUsageFormRef } from "@features/diamonds/diamond-usage-form/ui/DiamondUsageForm";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { DiamondUsageDto } from "@entities/diamond/dto/diamond-usage.dto.ts";
import Modal from "antd/es/modal/Modal";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import useAddBrokenDiamond from "@entities/diamond/hooks/useAddBrokenDiamond.ts";

interface Props {
  open: boolean;
  orderId: number;
  onCancel?: () => void;
}

const AddDiamondUsageBrokenModal: FC<Props> = ({ open, onCancel, orderId }) => {
  const formRef = useRef<DiamondUsageFormRef>(null);
  const mutation = useAddBrokenDiamond();
  const { messageApi } = useMessage();

  const handleCancel = () => {
    onCancel?.();
  };

  const handleFinish = (dto: Omit<DiamondUsageDto, "orderId">) => {
    mutation.mutate(
      { ...dto, orderId },
      {
        onSuccess: () => {
          void messageApi.success("Broken diamond is added successfully");
        },
        onError: () => {
          void messageApi.error("Failed to add broken diamond");
        },
        onSettled: () => {
          handleCancel();
        },
      },
    );
  };

  return (
    <Modal
      centered
      width={712}
      open={open}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Diamonds broken
        </Typography.Title>
      }
      onOk={() => {
        formRef.current?.submit();
      }}
      confirmLoading={mutation.isPending}
      cancelButtonProps={{
        disabled: mutation.isPending,
      }}
      onCancel={handleCancel}
      destroyOnClose>
      <DiamondUsageForm ref={formRef} onFinish={handleFinish} />
    </Modal>
  );
};

export default AddDiamondUsageBrokenModal;
