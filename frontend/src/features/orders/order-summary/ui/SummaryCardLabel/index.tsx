import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import { FC, ReactNode } from "react";
import Loading from "@shared/ui/Loading";
import TagPercentageGrowth from "@shared/ui/TagPercentageGrowth";

interface Props {
  icon: ReactNode;
  title: string;
  saleTotal?: number;
  percentage: number;
  loading: boolean;
}

const SummaryCardLabel: FC<Props> = ({ icon, title, saleTotal, percentage, loading }) => {
  return (
    <Flex justify="space-between" align="center">
      <Flex gap={12} align="center">
        {icon}
        <Typography.Text className="summary-card-title">{title}</Typography.Text>
      </Flex>

      <Flex gap={16} align="center">
        {loading ? (
          <Loading style={{ margin: 12 }} />
        ) : (
          <span className="price-value">${moneyFormatter(saleTotal, 2)}</span>
        )}

        <TagPercentageGrowth percentage={percentage} />
      </Flex>
    </Flex>
  );
};

export default SummaryCardLabel;
