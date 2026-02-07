import { FC, useMemo } from "react";
import Tag, { TagProps } from "antd/es/tag";
import { moneyFormatter } from "@shared/utils/formatter.ts";

interface Props extends TagProps {
  percentage?: number;
  showPlus?: boolean;
}

const TagPercentageGrowth: FC<Props> = ({ percentage = 0, showPlus = true, ...rest }) => {
  const color = useMemo(() => {
    if (percentage === 0) return "";
    return percentage > 0 ? "green" : "red";
  }, [percentage]);

  return (
    <Tag color={color} style={{ margin: 0 }} {...rest}>
      {percentage > 0 && showPlus && "+"}
      {moneyFormatter(percentage)}%
    </Tag>
  );
};

export default TagPercentageGrowth;
