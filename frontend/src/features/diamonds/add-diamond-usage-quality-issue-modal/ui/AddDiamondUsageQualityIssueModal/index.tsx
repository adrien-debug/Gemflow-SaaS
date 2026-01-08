import { FC, useRef } from "react";
import DiamondUsageForm, { DiamondUsageFormRef } from "@features/diamonds/diamond-usage-form/ui/DiamondUsageForm";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { DiamondUsageDto } from "@entities/diamond/dto/diamond-usage.dto.ts";
import Modal from "antd/es/modal/Modal";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import useAddQualityIssueDiamond from "@entities/diamond/hooks/useAddQualityIssueDiamond.ts";

interface Props {
  open: boolean;
  orderId: number;
  onCancel?: () => void;
}

const AddDiamondUsageQualityIssueModal: FC<Props> = ({ open, onCancel, orderId }) => {
  const formRef = useRef<DiamondUsageFormRef>(null);
  const mutation = useAddQualityIssueDiamond();
  const { messageApi } = useMessage();

  const handleCancel = () => {
    onCancel?.();
  };

  const handleFinish = (dto: Omit<DiamondUsageDto, "orderId">) => {
    mutation.mutate(
      { ...dto, orderId },
      {
        onSuccess: () => {
          void messageApi.success("Quality issue for the diamond is added successfully");
        },
        onError: () => {
          void messageApi.error("Failed to add quality issue diamond");
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
          Quality issue
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
      <DiamondUsageForm ref={formRef} onFinish={handleFinish} showDate={false} showStoneSetter={false} />
    </Modal>
  );
};

export default AddDiamondUsageQualityIssueModal;
