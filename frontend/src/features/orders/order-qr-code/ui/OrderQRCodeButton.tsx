import { useState } from "react";
import Button from "antd/es/button";
import { QrcodeOutlined } from "@ant-design/icons";
import OrderQRCodeModal from "./OrderQRCodeModal";

interface OrderQRCodeButtonProps {
  orderId: number;
  orderName?: string;
}

const OrderQRCodeButton = ({ orderId, orderName }: OrderQRCodeButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button icon={<QrcodeOutlined />} onClick={() => setIsOpen(true)}>
        QR Code
      </Button>
      <OrderQRCodeModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        orderId={orderId}
        orderName={orderName}
      />
    </>
  );
};

export default OrderQRCodeButton;

