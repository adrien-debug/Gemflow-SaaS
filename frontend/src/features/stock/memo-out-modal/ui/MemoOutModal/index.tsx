import Modal from "antd/es/modal/Modal";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { FC } from "react";
import { useForm } from "antd/es/form/Form";
import Form from "antd/es/form";
import Flex from "antd/es/flex";
import { FormRule } from "@shared/utils/form-validators.ts";
import FormItem from "antd/es/form/FormItem";
import ClientSelect from "@entities/client/ui/ClientSelect";
import DatePicker from "antd/es/date-picker";
import { DateFormat } from "@shared/constants/date-format.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import useMarkStockItemAsMemoOut from "@entities/stock/hooks/useMarkStockItemAsMemoOut.ts";
import { Nullable } from "@shared/types/nullable.type.ts";
import { MarkStockItemMemoOutDto } from "@entities/stock/dto/update-stock-item-status.dto.ts";

interface Props {
  open: boolean;
  setIsMemoOutModalOpen: (value: boolean) => void;
  orderId: Nullable<number>;
}

const MemoOutModal: FC<Props> = ({ open, setIsMemoOutModalOpen, orderId }) => {
  const [form] = useForm();
  const { messageApi } = useMessage();
  const mutation = useMarkStockItemAsMemoOut();

  const onClose = () => {
    setIsMemoOutModalOpen(false);
    form.resetFields();
  };

  const handleFinish = (dto: MarkStockItemMemoOutDto) => {
    if (orderId)
      mutation.mutate(
        { orderId, dto },
        {
          onSuccess: () => {
            void messageApi.success("Stock item marked as memo out.");
          },
          onError: () => {
            void messageApi.error("Failed to mark stock item as memo out.");
          },
          onSettled: () => {
            onClose();
          },
        },
      );
  };

  return (
    <Modal
      confirmLoading={mutation.isPending}
      cancelButtonProps={{
        disabled: mutation.isPending,
      }}
      onOk={form.submit}
      onCancel={onClose}
      open={open}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Memo Out
        </Typography.Title>
      }
      okText={"Mark"}
      centered
      destroyOnClose
      width={412}>
      <Form form={form} requiredMark={false} layout="vertical" onFinish={handleFinish}>
        <Flex vertical>
          <FormItem label="Assignee name" name="issueClientId" rules={[FormRule.Required("Choose client")]}>
            <ClientSelect />
          </FormItem>

          <FormItem label="Issue date" name="issueDate" rules={[FormRule.Required("Please, select date")]}>
            <DatePicker
              id="issue-date"
              style={{ width: "100%" }}
              format={DateFormat.LiteralMontDayYear}
              placeholder="Choose date"
              size="large"
              allowClear={false}
            />
          </FormItem>
        </Flex>
      </Form>
    </Modal>
  );
};

export default MemoOutModal;
