import { DateFormat } from "@shared/constants/date-format.ts";
import LabelValueCard from "@shared/ui/LabelValueCard";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import Flex from "antd/es/flex";
import Tooltip from "antd/es/tooltip";
import Typography from "antd/es/typography";
import dayjs from "dayjs";
import { FC } from "react";
import "./styles.scss";
import { InfoCircleOutlined } from "@ant-design/icons";
import { PureMetalPurchase } from "@entities/metal/models/pure-metal-purchase.model.ts";
import { PureMetalSummary } from "@entities/metal/models/pure-metals-summary.model.ts";
import TagPercentageGrowth from "@shared/ui/TagPercentageGrowth";

interface Props {
  purchase?: PureMetalPurchase;
  percentage: number;
  metal?: PureMetalSummary;
}

const PureMetalPurchaseDetailsInfo: FC<Props> = ({ purchase, percentage, metal }) => {
  return (
    <Flex gap={8} className="purchase-details-info">
      <LabelValueCard label="Price per gram">${moneyFormatter(purchase?.priceGram)} g</LabelValueCard>
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
        <Typography.Text type="secondary"> / {moneyFormatter(purchase?.batchWeight)} g</Typography.Text>
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
      <LabelValueCard
        label="Market value"
        description={`${dayjs().format(DateFormat.LiteralMontDayYear)} · $${metal?.priceGram} g`}
        badge={<TagPercentageGrowth percentage={percentage} />}>
        {moneyFormatter(metal?.currentTotalCost, 2)} g
      </LabelValueCard>
    </Flex>
  );
};

export default PureMetalPurchaseDetailsInfo;
