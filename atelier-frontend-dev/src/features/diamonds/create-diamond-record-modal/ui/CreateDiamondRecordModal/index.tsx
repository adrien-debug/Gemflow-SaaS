import { FC } from "react";
import Modal from "antd/es/modal/Modal";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { useForm } from "antd/es/form/Form";
import DiamondRecordForm from "@features/diamonds/diamond-record-form/ui/DiamondRecordForm";
import { DiamondRecordDto } from "@entities/diamond/dto/diamond-record.dto.ts";
import useCreateDiamondRecord from "@entities/diamond/hooks/useCreateDiamondRecord.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";

interface Props {
  open?: boolean;
  onClose?: () => void;
}

const CreateDiamondRecordModal: FC<Props> = ({ open = false, onClose = () => {} }) => {
  const [form] = useForm();
  const { messageApi } = useMessage();

  const mutation = useCreateDiamondRecord();

  const handleCancel = () => {
    form.resetFields();
    onClose?.();
  };

  const handleSubmit = (dto: DiamondRecordDto) => {
    mutation.mutate(dto, {
      onSuccess: () => {
        void messageApi.success("Diamond record created successfully");
      },
      onError: () => {
        void messageApi.error("Failed to create diamond record");
      },
      onSettled: () => {
        onClose?.();
        form.resetFields();
      },
    });
  };

  return (
    <Modal
      width={680}
      open={open}
      centered
      onOk={form.submit}
      confirmLoading={mutation.isPending}
      cancelButtonProps={{
        disabled: mutation.isPending,
      }}
      onCancel={handleCancel}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Create record
        </Typography.Title>
      }>
      <DiamondRecordForm form={form} onSubmit={handleSubmit} />
    </Modal>
  );
};

export default CreateDiamondRecordModal;
