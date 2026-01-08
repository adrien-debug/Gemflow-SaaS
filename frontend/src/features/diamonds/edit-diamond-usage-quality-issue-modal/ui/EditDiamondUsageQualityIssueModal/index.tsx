import { FC, useRef } from "react";
import Modal from "antd/es/modal/Modal";
import DiamondUsageForm, { DiamondUsageFormRef } from "@features/diamonds/diamond-usage-form/ui/DiamondUsageForm";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { useOrderDiamond } from "@entities/diamond/hooks/useOrderDiamond.ts";
import { DiamondUsageDto } from "@entities/diamond/dto/diamond-usage.dto.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import useUpdateQualityIssueDiamond from "@entities/diamond/hooks/useUpdateQualityIssueDiamond.ts";

interface Props {
  open: boolean;
  orderDiamondId?: number;
  onCancel?: () => void;
}

const EditDiamondUsageQualityIssueModal: FC<Props> = ({ open, onCancel, orderDiamondId }) => {
  const formRef = useRef<DiamondUsageFormRef>(null);

  const { data } = useOrderDiamond(orderDiamondId);

  const { messageApi } = useMessage();

  const qualityIssueMutation = useUpdateQualityIssueDiamond();

  const handleCancel = () => {
    onCancel?.();
  };

  const handleFinish = (dto: Omit<DiamondUsageDto, "orderId">) => {
    qualityIssueMutation.mutate(
      { id: orderDiamondId as number, dto },
      {
        onSuccess: () => {
          void messageApi.success("Diamond record updated successfully");
        },
        onError: () => {
          void messageApi.error("Failed to update diamond record");
        },
        onSettled: () => {
          onCancel?.();
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
          Edit quality issue
        </Typography.Title>
      }
      onOk={() => {
        formRef.current?.submit();
      }}
      confirmLoading={qualityIssueMutation.isPending}
      cancelButtonProps={{
        disabled: qualityIssueMutation.isPending,
      }}
      onCancel={handleCancel}
      destroyOnClose>
      <DiamondUsageForm
        ref={formRef}
        onFinish={handleFinish}
        diamondUsageMetadata={data}
        showDate={false}
        showStoneSetter={false}
        disableFields={["supplierId", "diamondRecordId", "shapeId"]}
      />
    </Modal>
  );
};

export default EditDiamondUsageQualityIssueModal;
