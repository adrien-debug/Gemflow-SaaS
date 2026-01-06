import "./styles.scss";
import { FC } from "react";
import { useOrder } from "@entities/order/hooks/useOrder.ts";
import Card from "antd/es/card";
import Flex from "antd/es/flex";
import Image from "@shared/ui/Image";
import Typography from "antd/es/typography";
import InfoBadge from "@shared/ui/InfoBadge";

interface Props {
  orderId: number;
}

const OrderCardSimple: FC<Props> = ({ orderId }) => {
  const { data } = useOrder(orderId);

  return (
    <Card className="order-card-simple">
      <Flex align="center" gap={8}>
        <Flex align="center" gap={8}>
          <Image width={56} height={56} src={data?.productImages} />

          <Typography.Text strong>{data?.name}</Typography.Text>
        </Flex>

        <InfoBadge title={data?.id as number}></InfoBadge>
      </Flex>
    </Card>
  );
};

export default OrderCardSimple;
