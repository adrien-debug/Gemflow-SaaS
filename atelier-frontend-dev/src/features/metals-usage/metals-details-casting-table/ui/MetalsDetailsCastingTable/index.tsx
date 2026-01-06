import { FC } from "react";
import Table from "antd/es/table";
import Typography from "antd/es/typography";
import { useNavigate } from "react-router";
import { MetalsDetailsCastingTableActions } from "@features/metals-usage/metals-details-casting-table/interfaces/metals-details-casting-table-actions.interface.ts";
import { getMetalsDetailsCastingTableColumns } from "@features/metals-usage/metals-details-casting-table/utils/get-metals-details-casting-table-columns.tsx";
import useMetalCastings from "@entities/order/hooks/useMetalCastings.ts";

interface Props {
  orderId: number;
  disabled?: boolean;
}

const MetalsDetailsCastingTable: FC<Props> = ({ orderId, disabled }) => {
  const navigate = useNavigate();

  const { data, isPending } = useMetalCastings(orderId);

  const actions = {
    onViewDetails: (id) => {
      navigate(`/casting/${id}`);
    },
  } satisfies MetalsDetailsCastingTableActions;

  const columns = getMetalsDetailsCastingTableColumns(actions, disabled);

  return (
    <>
      <Typography.Title level={4} style={{ opacity: 0.5, fontWeight: 400 }}>
        Casting
      </Typography.Title>

      <Table columns={columns} dataSource={data} loading={isPending} pagination={false} rowKey="id" />
    </>
  );
};

export default MetalsDetailsCastingTable;
