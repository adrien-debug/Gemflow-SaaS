import { PrinterOutlined } from "@ant-design/icons";
import { Order } from "@entities/order/models/order.model.ts";
import PrintOrderModal from "@features/orders/print-order-modal/ui/PrintOrderModal";
import Button from "antd/es/button";
import { FC, useState } from "react";

interface Props {
  order: Order;
}

const PrintOrderButton: FC<Props> = ({ order }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} size="large" icon={<PrinterOutlined />}>
        Print
      </Button>

      <PrintOrderModal order={order} open={open} onCancel={() => setOpen(false)} />
    </>
  );
};

export default PrintOrderButton;
