import PurchaseTransactionsTable from "@features/metals/purchase-transactions-table/ui/PurchaseTransactionsTable";
import PureMetalPurchaseDetailsInfo from "@features/metals/pure-metal-purchase-details/ui/PureMetalPurchaseDetailsInfo";
import { PureMetalPurchase } from "@entities/metal/models/pure-metal-purchase.model.ts";
import { FC } from "react";
import usePureMetalSummary from "@entities/metal/hooks/usePureMetalSummary.ts";

interface Props {
  purchase?: PureMetalPurchase;
}

const PureMetalPurchaseDetails: FC<Props> = ({ purchase }) => {
  const { data: metal } = usePureMetalSummary(purchase?.priceMetalName?.id as number);

  return (
    <div>
      <PureMetalPurchaseDetailsInfo
        purchase={purchase}
        percentage={metal?.currentCostPercentageDifference as number}
        metal={metal}
      />
      <PurchaseTransactionsTable />
    </div>
  );
};

export default PureMetalPurchaseDetails;
