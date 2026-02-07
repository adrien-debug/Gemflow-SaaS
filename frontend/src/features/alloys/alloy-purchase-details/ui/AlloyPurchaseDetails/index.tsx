import AlloyPurchaseDetailsInfo from "@features/alloys/alloy-purchase-details/ui/AlloyPurchaseDetailsInfo";
import PurchaseTransactionsTable from "@features/metals/purchase-transactions-table/ui/PurchaseTransactionsTable";
import { AlloyPurchase } from "@entities/alloy/models/alloy-purchase.model.ts";
import { FC } from "react";

interface Props {
  purchase?: AlloyPurchase;
}

const AlloyPurchaseDetails: FC<Props> = ({ purchase }) => {
  return (
    <div>
      <AlloyPurchaseDetailsInfo purchase={purchase} />

      <PurchaseTransactionsTable />
    </div>
  );
};

export default AlloyPurchaseDetails;
