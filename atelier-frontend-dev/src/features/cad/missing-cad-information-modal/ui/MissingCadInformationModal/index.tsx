import { FC } from "react";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import Modal from "antd/es/modal/Modal";
import { useNavigate } from "react-router";
import { Nullable } from "@shared/types/nullable.type.ts";

interface Props {
  open: boolean;
  orderId: Nullable<number>;
  onClose?: () => void;
}

const MissingCadInformationModal: FC<Props> = ({ open, orderId, onClose }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    onClose?.();
  };

  const handleConfirm = () => {
    if (orderId) {
      navigate(`/orders/${orderId}`);
    }
    handleCancel();
  };

  return (
    <Modal
      centered
      open={open}
      width={412}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Missing information
        </Typography.Title>
      }
      onOk={handleConfirm}
      onCancel={handleCancel}
      okText="Open order">
      <Typography.Text>
        Please, make sure that CAD image and Number of STLs are specified in order details to move the CAD task to
        review.
      </Typography.Text>
    </Modal>
  );
};

export default MissingCadInformationModal;
