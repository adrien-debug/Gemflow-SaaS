import "./styles.scss";
import { FC, useEffect, useState } from "react";
import MetalsSummaryCard from "@features/orders/order-summary/ui/MetalsSummaryCard";
import DiamondsSummaryCard from "@features/orders/order-summary/ui/DiamondsSummaryCard";
import LabourSummaryCard from "@features/orders/order-summary/ui/LabourSummaryCard";
import GemsSummaryCard from "@features/orders/order-summary/ui/GemsSummaryCard";
import { UsageSummary } from "@features/orders/order-summary/models/usage-summary.model.ts";
import { calculateTotalValues } from "@features/orders/order-summary/utils/get-summary-calculates.ts";
import { OrderProfit } from "@entities/order/models/order-profit.model.ts";
import Row from "antd/es/row";
import Col from "antd/es/col";
import { Space } from "antd";

interface Props {
  setStatisticValues: (value: UsageSummary) => void;
  data?: OrderProfit;
  orderId: number;
}

const OrderSummaryDetails: FC<Props> = ({ data, setStatisticValues, orderId }) => {
  const initialValues = {
    totalCost: 0,
    salePrice: 0,
    profit: 0,
  };

  const [metalsTotal, setMetalsTotal] = useState<UsageSummary>(initialValues);
  const [diamondsTotal, setDiamondsTotal] = useState<UsageSummary>(initialValues);
  const [labourTotal, setLabourTotal] = useState<UsageSummary>(initialValues);
  const [gemsTotal, setGemsTotal] = useState<UsageSummary>(initialValues);

  useEffect(() => {
    const totals = calculateTotalValues(metalsTotal, diamondsTotal, labourTotal, gemsTotal);
    setStatisticValues({ totalCost: totals.totalCost, salePrice: totals.salePrice, profit: totals.profit });
  }, [metalsTotal, diamondsTotal, labourTotal, gemsTotal]);

  return (
    <Row gutter={24}>
      <Col span={12}>
        <Space direction="vertical" size={24} style={{ width: "100%" }}>
          <MetalsSummaryCard orderId={orderId} setMetalsTotal={setMetalsTotal} margin={data?.metalProfitPercentage} />

          <DiamondsSummaryCard
            orderId={orderId}
            setDiamondsTotal={setDiamondsTotal}
            margin={data?.diamondProfitPercentage}
          />
        </Space>
      </Col>

      <Col span={12}>
        <Space direction="vertical" size={24} style={{ width: "100%" }}>
          <LabourSummaryCard orderId={orderId} setLabourTotal={setLabourTotal} margin={data?.labourProfitPercentage} />

          <GemsSummaryCard orderId={orderId} setGemsTotal={setGemsTotal} margin={data?.gemstoneProfitPercentage} />
        </Space>
      </Col>
    </Row>
  );
};
export default OrderSummaryDetails;
