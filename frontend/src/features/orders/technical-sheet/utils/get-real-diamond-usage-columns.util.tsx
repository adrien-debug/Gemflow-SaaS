import { ColumnsType } from "antd/es/table";
import Typography from "antd/es/typography";
import { DiamondUsageMetadata } from "@entities/diamond/models/diamond-usage-metadata.model.ts";

export const getRealDiamondUsageColumns = (): ColumnsType<DiamondUsageMetadata> => {
  return [
    {
      dataIndex: "sizeName",
      title: "Size",
      render: (_, { diamond }) => <Typography.Text style={{ textWrap: "nowrap" }}>{diamond.sizeName} </Typography.Text>,
    },
    {
      dataIndex: "diamondShape",
      title: "Shape",
      render: (_, { diamond }) => (
        <Typography.Text style={{ textWrap: "nowrap" }}> {diamond.diamondShape?.name} </Typography.Text>
      ),
    },
    {
      dataIndex: "qualityType",
      title: "Quality",
      render: (_, { diamond }) => <Typography.Text> {diamond.qualityType} </Typography.Text>,
    },
    {
      dataIndex: "quantity",
      title: "Quantity",
    },
    {
      dataIndex: "stoneCarat",
      title: "Stone weight, ct",
      render: (_, { diamond }) => diamond.stoneCarat,
    },
    {
      dataIndex: "totalWeight",
      title: "Total weight, ct",
      render: (_, { totalWeight }) => <Typography.Text>{totalWeight}</Typography.Text>,
    },
  ];
};
