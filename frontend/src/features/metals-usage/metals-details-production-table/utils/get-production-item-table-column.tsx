import { ColumnsType } from "antd/es/table";
import Tag from "@shared/ui/tag/components/Tag";
import Flex from "antd/es/flex";
import Tooltip from "antd/es/tooltip";
import { InfoCircleOutlined } from "@ant-design/icons";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import Avatar from "@shared/ui/Avatar";
import { User } from "@entities/user/models/user.model.ts";
import dayjs from "dayjs";
import { DateFormat } from "@shared/constants/date-format.ts";
import { materialTypeNameMap } from "@entities/material/constants/material-type.enum.ts";
import { operationTypeNameMap } from "@entities/material/constants/operation-type.enum.ts";
import { MetalsUsageProductionItem } from "@entities/metals-usage/models/metals-usage-production-item.model.ts";

export const getProductionItemTableColumns = (): ColumnsType<MetalsUsageProductionItem> => {
  return [
    {
      dataIndex: "createdAt",
      title: "Date",
      width: 100,
      render: (_, { createdAt }) => dayjs(createdAt).format(DateFormat.DayMonthYear),
    },
    {
      dataIndex: "operation",
      title: "Operation Type",
      render: (_, { operation }) => <Tag tag={{ id: null, name: operationTypeNameMap[operation] }} />,
    },
    {
      dataIndex: "materialType",
      title: "Material Type",
      width: 130,
      render: (_, { materialType }) => <Tag tag={{ id: null, name: materialTypeNameMap[materialType] }} />,
    },
    {
      dataIndex: "Material",
      title: "Material",
      width: 130,
      render: (_, { material }) => <Tag tag={{ id: null, name: material?.name }} />,
    },
    {
      title: "Weight (g)",
      dataIndex: "weight",
    },
    {
      title: "Employee",
      dataIndex: "employee",
      width: 200,
      render: (_, { employee }) => (
        <Flex align="center">
          <Avatar user={employee as User} />
          <p style={{ marginLeft: "8px" }}>{employee.fullName}</p>
        </Flex>
      ),
    },
    {
      dataIndex: "cost",
      title: (
        <Flex justify="space-between">
          <>Cost</>
          <Tooltip title="Price and cost will be displayed once the order is moved to stock">
            <InfoCircleOutlined style={{ width: 10.5, opacity: 0.5 }} />
          </Tooltip>
        </Flex>
      ),
      minWidth: 100,
      render: (_, { cost }) => (
        <Typography.Text style={{ fontWeight: 600, color: brandingColorPalette.brand7, whiteSpace: "nowrap" }}>
          {`$${moneyFormatter(cost, 2)}`}
        </Typography.Text>
      ),
    },
  ];
};
