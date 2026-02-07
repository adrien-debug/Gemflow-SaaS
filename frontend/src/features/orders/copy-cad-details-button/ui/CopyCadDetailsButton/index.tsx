import CopyOutlined from "@ant-design/icons/lib/icons/CopyOutlined";
import Button from "antd/es/button";
import { FC, useState } from "react";
import CopyCadDetailsModal from "@features/orders/copy-cad-details-modal/ui/CopyCadDetailsModal";

interface Props {
  toOrderId: number;
  isEditBlocked?: boolean;
}

const CopyCadDetailsButton: FC<Props> = ({ toOrderId, isEditBlocked }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button size="large" icon={<CopyOutlined />} onClick={() => setModalOpen(true)} disabled={isEditBlocked}>
        Copy from order
      </Button>

      <CopyCadDetailsModal open={modalOpen} toOrderId={toOrderId} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default CopyCadDetailsButton;
