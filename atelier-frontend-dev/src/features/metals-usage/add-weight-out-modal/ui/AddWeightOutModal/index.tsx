import useSetOrderMetalWeightOut from "@entities/order/hooks/useSetOrderMetalWeightOut.ts";
import SetMetalWeightOutDtoConverter from "@features/metals-usage/add-weight-out-modal/utils/set-metal-weight-out-dto.converter.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import Tag from "@shared/ui/tag/components/Tag";
import { ModalProps } from "antd/es/modal";
import Modal from "antd/es/modal/Modal";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { FC, useRef } from "react";
import WeightOutForm, { WeightOutFormRef } from "@features/metals-usage/weight-out-form/ui/WeightOutForm";
import { WeightOutFormSchema } from "@features/metals-usage/weight-out-form/models/weight-out-form.model.ts";
import Flex from "antd/es/flex";
import { BaseItem } from "@shared/types/base-item.type";

interface Props extends ModalProps {
  onClose?: () => void;
  metal: BaseItem;
  metalTotalId: number;
  inputWeight?: number;
  gemsWeight?: number;
  diamondsWeight?: number;
  totalWeight: number;
}

const AddWeightOutModal: FC<Props> = ({
  onClose,
  metal,
  metalTotalId,
  gemsWeight,
  diamondsWeight,
  inputWeight,
  totalWeight,
  ...rest
}) => {
  const formRef = useRef<WeightOutFormRef>(null);
  const mutation = useSetOrderMetalWeightOut();
  const { messageApi } = useMessage();

  const handleFinish = (values: WeightOutFormSchema) => {
    if (metalTotalId)
      mutation.mutate(
        { id: metalTotalId, dto: SetMetalWeightOutDtoConverter.convert(values) },
        {
          onSuccess: () => {
            void messageApi.success("Weight out saved successfully");
          },
          onError: () => {
            void messageApi.error("Filed to save weight out");
          },
          onSettled: () => {
            onClose?.();
          },
        },
      );
  };

  const handleSubmit = () => {
    formRef.current?.submit();
  };

  return (
    <Modal
      onOk={handleSubmit}
      onCancel={onClose}
      title={
        <Flex justify="space-between" align="start">
          <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
            Weight out
          </Typography.Title>

          <Tag tag={metal} />
        </Flex>
      }
      confirmLoading={mutation.isPending}
      okText="Save"
      centered
      destroyOnClose
      width={412}
      closeIcon={false}
      {...rest}>
      <WeightOutForm
        totalWeight={totalWeight}
        inputWeight={inputWeight}
        ref={formRef}
        handleFinish={handleFinish}
        gemsWeight={gemsWeight}
        diamondsWeight={diamondsWeight}
      />
    </Modal>
  );
};

export default AddWeightOutModal;
