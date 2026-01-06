import { brandingColorPalette } from "@shared/constants/branding.ts";
import Typography from "antd/es/typography";
import { moneyFormatter } from "@shared/utils/formatter.ts";

export const getCostsTableColumns = () => {
  return [
    {
      title: "Material type",
      dataIndex: "materialType",
      render: (materialType: string) => (
        <Typography.Text
          style={{
            color: brandingColorPalette.brand7,
            fontWeight: 600,
          }}>
          {materialType}
        </Typography.Text>
      ),
    },
    {
      title: "Material name",
      dataIndex: "materialName",
      render: (name: string) => <>{name}</>,
    },
    {
      title: "Weight, g",
      dataIndex: "weight",
      render: (weight: number) => <>{weight}</>,
    },
    {
      title: "Total cost",
      dataIndex: "totalCost",
      render: (totalCost: number) => (
        <Typography.Text
          style={{
            color: brandingColorPalette.brand7,
            fontWeight: 600,
          }}>
          ${moneyFormatter(totalCost, 2)}
        </Typography.Text>
      ),
    },
  ];
};
