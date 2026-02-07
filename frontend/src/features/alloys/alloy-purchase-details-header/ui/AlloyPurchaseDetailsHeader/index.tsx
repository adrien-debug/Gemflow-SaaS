import AlloyPurchaseDetailsBreadcrumbs from "@features/alloys/alloy-purchase-details-header/ui/AlloyPurchaseDetailsBreadcrumbs";
import ViewPurchaseInvoiceButton from "@features/metals/purchase-view-invoice-button/ui/ViewPurchaseInvoiceButton";
import ActionBar from "@shared/ui/ActionBar";
import { AlloyPurchase } from "@entities/alloy/models/alloy-purchase.model.ts";
import { FC } from "react";
import dayjs from "dayjs";
import { DateFormat } from "@shared/constants/date-format.ts";

interface Props {
  purchase?: AlloyPurchase;
  loading: boolean;
}

const AlloyPurchaseDetailsHeader: FC<Props> = ({ purchase, loading }) => {
  return (
    <div>
      <AlloyPurchaseDetailsBreadcrumbs alloy={purchase?.alloy} purchaseId={purchase?.id} loading={loading} />

      <ActionBar
        title={`Purchase #${purchase?.alloy?.id}-${purchase?.id}`}
        description={`${purchase?.supplier?.name} • ${dayjs(purchase?.balanceDate).format(DateFormat.DayMonthYear)}`}>
        {purchase?.invoice && <ViewPurchaseInvoiceButton invoice={purchase?.invoice} />}
      </ActionBar>
    </div>
  );
};

export default AlloyPurchaseDetailsHeader;
