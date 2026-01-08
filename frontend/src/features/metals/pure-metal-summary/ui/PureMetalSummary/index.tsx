import "./styles.scss";
import { DateFormat } from "@shared/constants/date-format.ts";
import LabelValueCard from "@shared/ui/LabelValueCard";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import Flex from "antd/es/flex";
import dayjs from "dayjs";
import { FC } from "react";
import usePureMetalSummary from "@entities/metal/hooks/usePureMetalSummary.ts";
import TagPercentageGrowth from "@shared/ui/TagPercentageGrowth";

interface Props {
  pureMetalId: number;
}

const PureMetalSummary: FC<Props> = ({ pureMetalId }) => {
  const { data, isFetching } = usePureMetalSummary(pureMetalId);

  return (
    <Flex gap={8} className="pure-metal-info">
      <LabelValueCard loading={isFetching} label="Remaining weight">
        {moneyFormatter(data?.remainingWeight)} g
      </LabelValueCard>

      <LabelValueCard loading={isFetching} label="Total cost">
        ${moneyFormatter(data?.totalCost, 2)}
      </LabelValueCard>

      <LabelValueCard
        loading={isFetching}
        label="Market value"
        description={`${dayjs().format(DateFormat.LiteralMontDayYear)} · $${moneyFormatter(data?.priceGram, 2)}/g`}
        badge={<TagPercentageGrowth percentage={data?.currentCostPercentageDifference} />}>
        ${moneyFormatter(data?.currentTotalCost, 2)}
      </LabelValueCard>
    </Flex>
  );
};

export default PureMetalSummary;
