import { FC, useRef } from "react";
import Modal from "antd/es/modal/Modal";
import DiamondUsageForm, { DiamondUsageFormRef } from "@features/diamonds/diamond-usage-form/ui/DiamondUsageForm";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { DiamondUsageDto } from "@entities/diamond/dto/diamond-usage.dto.ts";
import useAddGoodQualityDiamond from "@entities/diamond/hooks/useAddGoodQualityDiamond.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";

interface Props {
  open: boolean;
  orderId: number;
  onCancel?: () => void;
}

const AddDiamondUsageModal: FC<Props> = ({ open, onCancel, orderId }) => {
  const formRef = useRef<DiamondUsageFormRef>(null);
  const mutation = useAddGoodQualityDiamond();
  const { messageApi } = useMessage();

  const handleCancel = () => {
    onCancel?.();
  };

  const handleFinish = (dto: Omit<DiamondUsageDto, "orderId">) => {
    mutation.mutate(
      { ...dto, orderId },
      {
        onSuccess: () => {
          void messageApi.success("Diamond is added successfully");
        },
        onError: () => {
          void messageApi.error("Failed to add diamond");
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
          Add diamond usage
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

export default AddDiamondUsageModal;
