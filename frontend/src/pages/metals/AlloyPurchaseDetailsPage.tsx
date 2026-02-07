import AlloyPurchaseDetailsHeader from "@features/alloys/alloy-purchase-details-header/ui/AlloyPurchaseDetailsHeader";
import AlloyPurchaseDetails from "@features/alloys/alloy-purchase-details/ui/AlloyPurchaseDetails";
import CommonLayout from "@shared/ui/layouts/CommonLayout";
import { useParams } from "react-router";
import { useAlloyPurchase } from "@entities/alloy/hooks/useAlloyPurchase.ts";

const AlloyPurchaseDetailsPage = () => {
  const { purchaseId } = useParams();

  const { data: purchase, isPending } = useAlloyPurchase(Number(purchaseId));

  return (
    <CommonLayout>
      <AlloyPurchaseDetailsHeader purchase={purchase} loading={isPending} />
      <AlloyPurchaseDetails purchase={purchase} />
    </CommonLayout>
  );
};

export default AlloyPurchaseDetailsPage;
