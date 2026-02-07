import { brandingColorPalette } from "@shared/constants/branding.ts";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import Progress from "antd/es/progress";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import { FC } from "react";

interface Props {
  totalWeight: number;
  remainingWeight: number;
}

const RemainingWeight: FC<Props> = ({ remainingWeight, totalWeight }) => {
  return (
    <Flex gap={10} justify="space-between">
      <Typography.Text strong>{moneyFormatter(remainingWeight)}</Typography.Text>
      <Progress
        style={{ width: 44 }}
        strokeColor={brandingColorPalette.brand6}
        percent={Math.round((remainingWeight * 100) / totalWeight)}
        size="small"
        showInfo={false}
      />
    </Flex>
  );
};

export default RemainingWeight;
