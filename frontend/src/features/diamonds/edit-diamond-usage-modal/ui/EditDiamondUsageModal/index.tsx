import { FC, useRef } from "react";
import Modal from "antd/es/modal/Modal";
import DiamondUsageForm, { DiamondUsageFormRef } from "@features/diamonds/diamond-usage-form/ui/DiamondUsageForm";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { useOrderDiamond } from "@entities/diamond/hooks/useOrderDiamond.ts";
import useUpdateGoodQualityDiamond from "@entities/diamond/hooks/useUpdateGoodQualityDiamond.ts";
import { DiamondUsageDto } from "@entities/diamond/dto/diamond-usage.dto.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";

interface Props {
  open: boolean;
  orderDiamondId?: number;
  onCancel?: () => void;
}

const EditDiamondUsageModal: FC<Props> = ({ open, onCancel, orderDiamondId }) => {
  const formRef = useRef<DiamondUsageFormRef>(null);

  const { data } = useOrderDiamond(orderDiamondId);

  const { messageApi } = useMessage();

  const goodQualityMutation = useUpdateGoodQualityDiamond();

  const handleCancel = () => {
    onCancel?.();
  };

  const handleFinish = (dto: Omit<DiamondUsageDto, "orderId">) => {
    goodQualityMutation.mutate(
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
          Edit diamond usage
        </Typography.Title>
      }
      onOk={() => {
        formRef.current?.submit();
      }}
      confirmLoading={goodQualityMutation.isPending}
      cancelButtonProps={{
        disabled: goodQualityMutation.isPending,
      }}
      onCancel={handleCancel}
      destroyOnClose>
      <DiamondUsageForm
        ref={formRef}
        onFinish={handleFinish}
        diamondUsageMetadata={data}
        disableFields={["supplierId", "diamondRecordId", "shapeId"]}
      />
    </Modal>
  );
};

export default EditDiamondUsageModal;
