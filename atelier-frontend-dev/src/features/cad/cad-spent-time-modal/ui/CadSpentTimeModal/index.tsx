import { FC } from "react";
import Modal from "antd/es/modal/Modal";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { useForm } from "antd/es/form/Form";
import Form from "antd/es/form";
import Flex from "antd/es/flex";
import Image from "@shared/ui/Image";
import Input from "antd/es/input";
import InputNumber from "antd/es/input-number";
import { CadSpentTimeSchema } from "@features/cad/cad-spent-time-modal/models/cad-spent-time-form.model.ts";
import useSendCadToReview from "@entities/task/hooks/useSendCadToReview.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { FormRule } from "@shared/utils/form-validators";
import UserSelect from "@entities/user/ui/UserSelect";
import { CadDetailsMetadata } from "@entities/order/models/cad-details-metadata.model.ts";
import { getTotalSecondsFromMinutesAndSeconds } from "@shared/utils/time-converter.ts";
import Col from "antd/es/col";
import Row from "antd/es/row";

interface Props {
  open: boolean;
  taskId: number;
  cadDetails?: CadDetailsMetadata;
  onClose?: () => void;
}

const CadSpentTimeModal: FC<Props> = ({ open, taskId, cadDetails, onClose }) => {
  const [form] = useForm<CadSpentTimeSchema>();
  const { messageApi } = useMessage();
  const mutation = useSendCadToReview();

  const handleCancel = () => {
    form.resetFields();
    onClose?.();
  };

  const handleFinish = (values: CadSpentTimeSchema) => {
    mutation.mutate(
      {
        taskId,
        dto: {
          ...values,
          spentSeconds: getTotalSecondsFromMinutesAndSeconds(values.spentMinutes, values.spentSeconds),
        },
      },
      {
        onSuccess: () => {
          void messageApi.success("The task is moved to the ‘CAD review’ status");
        },
        onError: () => {
          void messageApi.error("Failed to move task to the ‘CAD review’ status");
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
      open={open}
      width={652}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Move CAD to review
        </Typography.Title>
      }
      onOk={form.submit}
      confirmLoading={mutation.isPending}
      cancelButtonProps={{
        disabled: mutation.isPending,
      }}
      onCancel={handleCancel}
      okText="Confirm">
      <Form form={form} onFinish={handleFinish} layout="vertical" requiredMark={false}>
        <Flex gap={32}>
          <Form.Item label="CAD image">
            <Image width={220} height={220} src={cadDetails?.cadImages} />
          </Form.Item>

          <Flex flex={1} vertical>
            <Form.Item label="Number of STLs">
              <Input size="large" disabled value={cadDetails?.stlCount} />
            </Form.Item>

            <Row gutter={12}>
              <Col span={12}>
                <Form.Item<CadSpentTimeSchema>
                  label="Time spent on CAD, min"
                  name="spentMinutes"
                  rules={[FormRule.Required("Please, enter spent minutes")]}>
                  <InputNumber
                    min={0}
                    step={1}
                    precision={0}
                    size="large"
                    style={{ width: "100%" }}
                    placeholder="Enter time, min"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item<CadSpentTimeSchema> label="Time spent on CAD, sec" name="spentSeconds">
                  <InputNumber
                    min={0}
                    step={1}
                    precision={0}
                    size="large"
                    style={{ width: "100%" }}
                    placeholder="Enter time, sec"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item<CadSpentTimeSchema>
              name="employeeId"
              label="Employee"
              rules={[FormRule.Required("Please, choose stone setter")]}>
              <UserSelect placeholder="Choose employee" />
            </Form.Item>
          </Flex>
        </Flex>
      </Form>
    </Modal>
  );
};

export default CadSpentTimeModal;
