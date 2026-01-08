import { FC } from "react";
import Modal from "antd/es/modal/Modal";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { useForm } from "antd/es/form/Form";
import { DiamondRecord } from "@entities/diamond/models/diamond-record.model.ts";
import DiamondRecordForm from "@features/diamonds/diamond-record-form/ui/DiamondRecordForm";
import { DiamondRecordDto } from "@entities/diamond/dto/diamond-record.dto.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import useUpdateDiamondRecord from "@entities/diamond/hooks/useUpdateDiamondRecord.ts";

interface Props {
  open?: boolean;
  onClose?: () => void;
  record: DiamondRecord;
}

const EditDiamondRecordModal: FC<Props> = ({ open = false, onClose = () => {}, record }) => {
  const [form] = useForm();
  const { messageApi } = useMessage();

  const mutation = useUpdateDiamondRecord();

  const handleClose = () => {
    onClose?.();
  };

  const handleSubmit = (dto: DiamondRecordDto) => {
    mutation.mutate(
      { id: record.id, dto },
      {
        onSuccess: () => {
          void messageApi.success("Diamond record updated successfully");
        },
        onError: () => {
          void messageApi.error("Failed to update diamond record");
        },
        onSettled: () => {
          onClose?.();
        },
      },
    );
  };

  return (
    <Modal
      width={680}
      open={open}
      centered
      onOk={form.submit}
      onCancel={handleClose}
      confirmLoading={mutation.isPending}
      cancelButtonProps={{
        disabled: mutation.isPending,
      }}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Edit record
        </Typography.Title>
      }>
      <DiamondRecordForm form={form} record={record} onSubmit={handleSubmit} />
    </Modal>
  );
};

export default EditDiamondRecordModal;
