import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding";
import Table, { ColumnsType } from "antd/es/table";
import { moneyFormatter } from "@shared/utils/formatter";
import { FC } from "react";
import { ProfitData } from "@features/orders/order-summary/models/profit-data.model.ts";
import { OrderMetalTotal } from "@entities/order/models/order-metal-total.model.ts";
import { LabourSummaryItem } from "@entities/order/models/labour-summary-item.model.ts";
import { GemstoneStatistics } from "@entities/gemstone/models/gemstone-statistics.model.ts";
import { DiamondUsageStatistics } from "@entities/diamond/models/diamond-usage-statistics.model.ts";

interface Props {
  costColumns: ColumnsType;
  profitColumns: ColumnsType;
  data?: (OrderMetalTotal | LabourSummaryItem | GemstoneStatistics | DiamondUsageStatistics)[];
  isMaterial?: boolean;
  saleTotal?: number;
  profitData?: ProfitData[];
  totalCost?: number;
}

const SummaryCardTables: FC<Props> = ({
  costColumns,
  profitColumns,
  isMaterial,
  data,
  saleTotal,
  totalCost,
  profitData,
}) => {
  return (
    <Flex vertical gap={12}>
      <Flex vertical gap={8}>
        <Typography.Text style={{ color: brandingColorPalette.brand7 }}>COST</Typography.Text>

        <Table
          rowKey={(item) =>
            `cost-${data?.indexOf(item as OrderMetalTotal | LabourSummaryItem | GemstoneStatistics | DiamondUsageStatistics)}`
          }
          dataSource={data || []}
          columns={costColumns}
          loading={false}
          pagination={false}
          summary={() =>
            isMaterial && (
              <Table.Summary>
                <Table.Summary.Row className="no-border-row" key="total-cost-row">
                  <Table.Summary.Cell index={0}>
                    <span>Total cost</span>
                  </Table.Summary.Cell>

                  <Table.Summary.Cell index={1} />

                  <Table.Summary.Cell index={2}>
                    <span style={{ color: brandingColorPalette.brand7 }}>${moneyFormatter(totalCost, 2)}</span>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            )
          }
        />
      </Flex>

      <Flex vertical gap={8}>
        <Flex justify="space-between">
          <Typography.Text style={{ color: brandingColorPalette.brand7 }}>PROFIT</Typography.Text>
        </Flex>

        <Table
          rowKey={(item) =>
            `profit-${data?.indexOf(item as OrderMetalTotal | LabourSummaryItem | GemstoneStatistics | DiamondUsageStatistics)}`
          }
          dataSource={isMaterial ? profitData : data || []}
          columns={profitColumns}
          loading={false}
          pagination={false}
        />

        <Flex justify="space-between" align="center">
          <Typography.Text style={{ fontWeight: 700 }}>Sale total</Typography.Text>

          <span className="total-sale">${moneyFormatter(saleTotal, 2)}</span>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SummaryCardTables;
