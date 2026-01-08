import PureMetalPurchaseDetails from "@features/metals/pure-metal-purchase-details/ui/PureMetalPurchaseDetails";
import PureMetalPurchaseDetailsHeader from "@features/metals/pure-metals-purchase-details-header/ui/PureMetalPurchaseDetailsHeader";
import CommonLayout from "@shared/ui/layouts/CommonLayout";
import { useParams } from "react-router";
import useSummaryPurchase from "@entities/metal/hooks/useSummaryPurchase.ts";

const PureMetalPurchaseDetailsPage = () => {
  const { purchaseId } = useParams();

  const { data: purchase, isPending } = useSummaryPurchase(Number(purchaseId));

  return (
    <CommonLayout>
      <PureMetalPurchaseDetailsHeader purchase={purchase} loading={isPending} />
      <PureMetalPurchaseDetails purchase={purchase} />
    </CommonLayout>
  );
};

export default PureMetalPurchaseDetailsPage;
