import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import Tag from "antd/es/tag";
import Form, { FormInstance } from "antd/es/form";
import FormItem from "antd/es/form/FormItem";
import { FormRule } from "@shared/utils/form-validators.ts";
import Modal from "antd/es/modal/Modal";
import { FC } from "react";
import { useNavigate } from "react-router";
import AlloyedMetalSelect from "@entities/alloyed-metal/ui/AlloyedMetalSelect";
import useFinishCasting from "@entities/casting/hooks/useFinishCasting.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { ApiError } from "@shared/types/api-error.type.ts";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { MetalPurity } from "@entities/metal-purity/models/metal-purity.model.ts";

interface Props {
  openModal: boolean;
  form: FormInstance;
  handleCancel: () => void;
  metal?: BaseItem;
  metalPurity?: MetalPurity;
  castingId?: number;
  reuseWeight?: number;
}

const FinishCastingModal: FC<Props> = ({
  openModal,
  form,
  handleCancel,
  metalPurity,
  metal,
  castingId,
  reuseWeight,
}) => {
  const navigate = useNavigate();

  const mutation = useFinishCasting();

  const { messageApi } = useMessage();

  const handleFinish = ({ alloyedMetalId }: { alloyedMetalId: number }) => {
    mutation.mutate(
      { id: castingId as number, alloyedMetalId },
      {
        onSuccess: () => {
          void messageApi.success("The casting is finished");
          navigate(`/casting`);
        },
        onError: (error: ApiError) => {
          void messageApi.error(error.data?.developerMessage || "Failed to finish casting");
        },
        onSettled: () => {
          handleCancel();
        },
      },
    );
  };

  return (
    <Modal
      width={412}
      open={openModal}
      centered
      title={
        <Typography.Title level={3} style={{ marginTop: 0, color: brandingColorPalette.brand6 }}>
          Finish casting
        </Typography.Title>
      }
      onOk={form.submit}
      onCancel={handleCancel}
      okText="Add">
      <Typography.Text>
        Specify where in the inventory <Tag>{reuseWeight} g</Tag>of remained casted <Tag>{metal?.name}</Tag>
        <Tag>{metalPurity?.metalPurity}</Tag>should be added:
      </Typography.Text>

      <Form onFinish={handleFinish} layout="vertical" form={form} requiredMark={false} style={{ marginTop: 16 }}>
        <FormItem name="alloyedMetalId" label="Material name" rules={[FormRule.Required("Please, choose material")]}>
          <AlloyedMetalSelect
            placeholder="Choose material"
            searchConfig={{
              searchCriteria: { metalIds: [metal?.id as number], metalPurityIds: [metalPurity?.id as number] },
            }}
          />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default FinishCastingModal;
