import LabelValueCard from "@shared/ui/LabelValueCard";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import Flex from "antd/es/flex";
import Tooltip from "antd/es/tooltip";
import Typography from "antd/es/typography";
import { FC } from "react";
import "./styles.scss";
import { InfoCircleOutlined } from "@ant-design/icons";
import { AlloyPurchase } from "@entities/alloy/models/alloy-purchase.model.ts";

interface Props {
  purchase?: AlloyPurchase;
}

const AlloyPurchaseDetailsInfo: FC<Props> = ({ purchase }) => {
  return (
    <Flex gap={8} className="purchase-details-info">
      <LabelValueCard label="Price per gram">{moneyFormatter(purchase?.priceGram)} g</LabelValueCard>

      <LabelValueCard
        label="Weight"
        badge={
          <Tooltip
            title={
              <>
                Remaining weight - {purchase?.remainingWeight} g<br />
                Purchase weight - {purchase?.batchWeight} g
              </>
            }>
            <InfoCircleOutlined />
          </Tooltip>
        }>
        ${moneyFormatter(purchase?.remainingWeight)}
        <Typography.Text type="secondary"> / ${moneyFormatter(purchase?.batchWeight)}</Typography.Text>
      </LabelValueCard>

      <LabelValueCard
        label="Cost value"
        badge={
          <Tooltip
            title={
              <>
                Remaining price - {purchase?.remainingPrice} g<br />
                Purchase price - {purchase?.batchPrice} g
              </>
            }>
            <InfoCircleOutlined />
          </Tooltip>
        }>
        ${moneyFormatter(purchase?.remainingPrice)}
        <Typography.Text type="secondary"> / ${moneyFormatter(purchase?.batchPrice)}</Typography.Text>
      </LabelValueCard>
    </Flex>
  );
};

export default AlloyPurchaseDetailsInfo;
