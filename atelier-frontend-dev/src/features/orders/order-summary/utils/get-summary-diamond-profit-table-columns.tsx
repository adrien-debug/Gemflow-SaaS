import { moneyFormatter } from "@shared/utils/formatter.ts";
import Typography from "antd/es/typography";
import { ColumnsType } from "antd/es/table";
import Flex from "antd/es/flex";
import EditDiamondsMarginButton from "@features/orders/order-summary/ui/EditDiamondsMarginButton";

interface Props {
  currentMargin: number;
  currentProfit: number;
  handleSaveProfit: (value: number) => void;
  orderId: number;
}

export const getSummaryDiamondsProfitTableColumns = ({
  currentMargin,
  currentProfit,
  handleSaveProfit,
  orderId,
}: Props): ColumnsType => {
  return [
    {
      dataIndex: "margin",
      title: "Margin",
      render: () => (
        <Flex gap={32} align="center">
          <Typography.Text>{currentMargin}%</Typography.Text>

          <EditDiamondsMarginButton currentMargin={currentMargin} onSave={handleSaveProfit} orderId={orderId} />
        </Flex>
      ),
    },
    {
      dataIndex: "profit",
      title: "Profit",
      width: 160,
      render: () => <Typography.Text>{`$${moneyFormatter(currentProfit, 2)}`}</Typography.Text>,
    },
  ];
};
