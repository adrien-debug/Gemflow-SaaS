import { moneyFormatter } from "@shared/utils/formatter.ts";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import Tag from "@shared/ui/tag/components/Tag";
import { ColumnsType } from "antd/es/table";
import Tooltip from "antd/es/tooltip";
import { InfoCircleOutlined } from "@ant-design/icons";
import Flex from "antd/es/flex";
import { MetalsUsageProductionsMetadata } from "@entities/metals-usage/models/metals-usage-productions-metadata.model.ts";

export const getProductionTableColumns = (): ColumnsType<MetalsUsageProductionsMetadata> => {
  return [
    {
      dataIndex: "material",
      title: "Material",
      width: 130,
      render: (_, { metal }) => <Tag tag={{ id: null, name: metal?.name }} />,
    },
    {
      dataIndex: "caratage",
      title: "Caratage",
      render: (_, { metalPurity }) => <Tag tag={{ id: null, name: metalPurity?.metalPurity }} />,
    },
    {
      dataIndex: "totalWeight",
      title: "Total weight, g",
      render: (_, { totalWeight }) => <Typography.Text>{totalWeight}</Typography.Text>,
    },
    {
      dataIndex: "totalCost",
      title: (
        <Flex justify="space-between">
          <>Cost</>
          <Tooltip title="Price and cost will be displayed once the order is moved to stock">
            <InfoCircleOutlined style={{ width: 10.5, opacity: 0.5 }} />
          </Tooltip>
        </Flex>
      ),
      minWidth: 100,
      render: (_, { totalCost }) => (
        <Typography.Text style={{ fontWeight: 600, color: brandingColorPalette.brand7, whiteSpace: "nowrap" }}>
          {`$${moneyFormatter(totalCost, 2)}`}
        </Typography.Text>
      ),
    },
  ];
};
