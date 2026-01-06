import Modal from "antd/es/modal/Modal";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { FC } from "react";
import { useForm } from "antd/es/form/Form";
import Form from "antd/es/form";
import Flex from "antd/es/flex";
import FormItem from "antd/es/form/FormItem";
import DatePicker from "antd/es/date-picker";
import { DateFormat } from "@shared/constants/date-format.ts";
import DataDisplay from "@shared/ui/DataDisplay";
import { useMessage } from "@shared/hooks/useMessage.ts";
import useMarkStockItemAsReturn from "@entities/stock/hooks/useMarkStockItemAsReturn.ts";
import { MarkStockItemReturnDto } from "@entities/stock/dto/update-stock-item-status.dto.ts";
import { FormRule } from "@shared/utils/form-validators.ts";
import { StockListItem } from "@entities/stock/models/stock-list-item.model.ts";

interface Props {
  open: boolean;
  setIsReturnedModalOpen: (value: boolean) => void;
  issuedTo?: StockListItem;
}

const ReturnedModal: FC<Props> = ({ open, setIsReturnedModalOpen, issuedTo }) => {
  const [form] = useForm();
  const { messageApi } = useMessage();
  const mutation = useMarkStockItemAsReturn();

  const onClose = () => {
    setIsReturnedModalOpen(false);
    form.resetFields();
  };

  const handleFinish = (dto: MarkStockItemReturnDto) => {
    if (issuedTo?.id)
      mutation.mutate(
        { orderId: issuedTo?.id, dto },
        {
          onSuccess: () => {
            void messageApi.success("Stock item marked as available.");
          },
          onError: () => {
            void messageApi.error("Failed to mark stock item as available.");
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
          Return stock item
        </Typography.Title>
      }
      okText={"Mark"}
      centered
      destroyOnClose
      width={412}>
      <Form form={form} requiredMark={false} layout="vertical" onFinish={handleFinish}>
        <Flex vertical gap={16}>
          <DataDisplay label="Issued to">{issuedTo?.stock?.issueClient?.name}</DataDisplay>

          <FormItem label="Return date" name="returnDate" rules={[FormRule.Required("Please, select date")]}>
            <DatePicker
              id="return-date"
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

export default ReturnedModal;
