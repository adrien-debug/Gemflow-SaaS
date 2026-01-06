import { getPurchaseTransactionsTableColumns } from "@features/metals/purchase-transactions-table/utils/getPurchaseTransactionsTableColumns.tsx";
import Table from "antd/es/table";

const PurchaseTransactionsTable = () => {
  const columns = getPurchaseTransactionsTableColumns();

  return <Table columns={columns} dataSource={[]} />;
};

export default PurchaseTransactionsTable;
