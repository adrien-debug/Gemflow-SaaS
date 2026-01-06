import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import Modal from "antd/es/modal/Modal";
import { FC, useState } from "react";
import Form from "antd/es/form";
import { useForm } from "antd/es/form/Form";
import { GemstoneUsageFormSchema } from "@features/gemstones/add-gemstone-usage-modal/models/gemstone-usage-form.model.ts";
import GemstoneSelect from "@entities/gemstone/ui/GemstoneSelect";
import { FormRule } from "@shared/utils/form-validators.ts";
import Row from "antd/es/row";
import Col from "antd/es/col";
import DataDisplay from "@shared/ui/DataDisplay";
import { Gemstone } from "@entities/gemstone/models/gemstone.model.ts";
import useAddGemstoneToOrder from "@entities/gemstone/hooks/useAddGemstoneToOrder.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { GemstoneStatus } from "@entities/gemstone/constants/gemstone-status.enum.ts";

interface Props {
  open: boolean;
  orderId: number;
  onCancel?: () => void;
}

const AddGemstoneUsageModal: FC<Props> = ({ open, orderId, onCancel }) => {
  const [form] = useForm<GemstoneUsageFormSchema>();
  const [selectedGemstone, setSelectedGemstone] = useState<Gemstone>();
  const { messageApi } = useMessage();
  const mutation = useAddGemstoneToOrder();

  const handleCancel = () => {
    form.resetFields();
    setSelectedGemstone(undefined);
    onCancel?.();
  };

  const handleFinish = (values: GemstoneUsageFormSchema) => {
    mutation.mutate(
      { orderId, dto: values },
      {
        onSuccess: () => {
          void messageApi.success("Stone was added successfully to the order");
        },
        onError: () => {
          void messageApi.error("Failed to add stone to the order");
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
      width={441}
      open={open}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Add stone
        </Typography.Title>
      }
      onOk={form.submit}
      confirmLoading={mutation.isPending}
      cancelButtonProps={{
        disabled: mutation.isPending,
      }}
      onCancel={handleCancel}>
      <Form form={form} requiredMark={false} layout="vertical" onFinish={handleFinish}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item<GemstoneUsageFormSchema>
              name="gemstoneId"
              label="Stone"
              rules={[FormRule.Required("Please, choose gemstone")]}>
              <GemstoneSelect
                placeholder="Choose gemstone"
                mode={undefined}
                onChange={(_, option) => setSelectedGemstone(option as Gemstone)}
                searchConfig={{
                  searchCriteria: {
                    statuses: [GemstoneStatus.AVAILABLE],
                  },
                }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item>
              <DataDisplay label="Supplier">{selectedGemstone?.supplier?.name}</DataDisplay>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item>
              <DataDisplay label="Certificate">{selectedGemstone?.certificate}</DataDisplay>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item>
              <DataDisplay label="Description" variant="common">
                {selectedGemstone?.description}
              </DataDisplay>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddGemstoneUsageModal;
