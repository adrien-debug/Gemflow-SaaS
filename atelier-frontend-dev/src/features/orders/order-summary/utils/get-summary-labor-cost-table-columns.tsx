import { moneyFormatter } from "@shared/utils/formatter.ts";
import Typography from "antd/es/typography";
import { getShortString } from "@shared/utils/get-short-string.ts";
import { ColumnsType } from "antd/es/table";
import { getMinutesAndSecondsFromTotalSeconds } from "@shared/utils/time-converter.ts";

interface Props {
  hourlyRate?: number;
}

export const getSummaryLabourCostTableColumns = ({ hourlyRate }: Props): ColumnsType => {
  return [
    {
      dataIndex: "totalSpentSeconds",
      title: "Total time",
      render: (_, { totalSpentSeconds }) => {
        const { minutes, seconds } = getMinutesAndSecondsFromTotalSeconds(totalSpentSeconds);
        return (
          <Typography.Text>
            {minutes}′ {seconds}′′
          </Typography.Text>
        );
      },
    },
    {
      dataIndex: "hourlyRate",
      title: "Hourly rate",
      render: () => <Typography.Text>{getShortString(`$${moneyFormatter(hourlyRate)}`, 12)}</Typography.Text>,
    },
    {
      dataIndex: "totalCost",
      title: "Total cost",
      width: 160,
      render: (_, { totalCost }) => (
        <Typography.Text>{getShortString(`$${moneyFormatter(totalCost)}`, 12)}</Typography.Text>
      ),
    },
  ];
};
