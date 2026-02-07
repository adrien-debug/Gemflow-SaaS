import Table from "antd/es/table";
import { getCostsTableColumns } from "@features/casting/costs-details-table/utils/get-costs-table-columns.tsx";
import "./styles.scss";
import { CastingMetadata } from "@entities/casting/models/casting.model.ts";
import { FC } from "react";
import { mapCastingToTableData } from "@features/casting/costs-details-table/utils/map-casting-to-table-data.ts";
import { Nullable } from "@shared/types/nullable.type.ts";
import { moneyFormatter } from "@shared/utils/formatter.ts";

interface Props {
  casting: Nullable<CastingMetadata>;
}

const CostsDetailsTable: FC<Props> = ({ casting }) => {
  const columns = getCostsTableColumns();
  const castingDetailsTableData = mapCastingToTableData({ casting });

  return (
    <Table
      dataSource={castingDetailsTableData}
      columns={columns}
      className="costs-details-table"
      size="small"
      rowKey="id"
      pagination={false}
      summary={() => {
        return (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={3} className="summary-title">
              Total
            </Table.Summary.Cell>
            <Table.Summary.Cell index={3} className="summary-title">
              ${moneyFormatter(casting?.totalCost, 2)}
            </Table.Summary.Cell>
          </Table.Summary.Row>
        );
      }}
    />
  );
};
export default CostsDetailsTable;
