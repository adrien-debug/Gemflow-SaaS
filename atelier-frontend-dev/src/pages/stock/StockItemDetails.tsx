import OrderDetails from "@features/orders/view-order/ui/OrderDetails";
import CommonLayout from "@shared/ui/layouts/CommonLayout";
import Tabs from "antd/es/tabs";
import { useParams } from "react-router";
import CadDetails from "@features/orders/cad-details/ui/CadDetails";
import LabourDetails from "@features/orders/labour-details/ui/LabourDetails";
import DiamondsUsage from "@features/diamonds/diamonds-usage/ui/DiamondsUsage";
import GemstoneUsage from "@features/gemstones/gemstone-usage/ui/GemstoneUsage";
import StockItemHeader from "@features/stock/stock-item-header/ui/StockItemHeader";
import { useStockItem } from "@entities/stock/hooks/useStockItem.ts";
import { TabKeys } from "@pages/stock/constants/tab-keys.ts";
import useActiveTab from "@shared/hooks/useActiveTab.ts";
import MetalsDetails from "@features/metals-usage/metals-usage-details/ui/MetalsUsageDetails";
import OrderSummary from "@features/orders/order-summary/ui/OrderSummary";
import { UserRoleEnum } from "@entities/user-roles/constants/user-role.enum.ts";
import { useFilterMenuByRoles } from "@entities/user-roles/hooks/useFilterMenuByRoles.ts";
import TechnicalSheet from "@features/orders/technical-sheet/ui/TechnicalSheet";
import { JewelCategory } from "@entities/jewel-category/constants/jewel-category.ts";

const rolesMap = {
  [TabKeys.SUMMARY]: [UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN],
};

export const StockItemDetails = () => {
  const { id } = useParams();
  const { isLoading, data: stockItem } = useStockItem(+id!);
  const { activeTab, setActiveTab } = useActiveTab(TabKeys.DETAILS);

  const filteredMenuItems = useFilterMenuByRoles({
    menuItems: [
      {
        key: TabKeys.DETAILS,
        label: "Details",
        children: <OrderDetails order={stockItem} isLoading={isLoading} disabled />,
      },
      {
        key: TabKeys.CAD,
        label: "CAD",
        children: <CadDetails orderId={+id!} disabled />,
      },
      {
        key: TabKeys.TECHNICAL_SHEET,
        label: "Technical sheet",
        children: (
          <TechnicalSheet
            orderId={+id!}
            dimension={stockItem?.fingerSize || stockItem?.length}
            isRing={stockItem?.itemCategory?.id === JewelCategory.Ring}
            disabled
          />
        ),
      },
      {
        key: TabKeys.LABOUR,
        label: "Labour",
        children: <LabourDetails orderId={+id!} disabled />,
      },
      {
        key: TabKeys.DIAMONDS,
        label: "Diamonds",
        children: <DiamondsUsage orderId={+id!} disabled />,
      },
      {
        key: TabKeys.GEMSTONES,
        label: "Gemstones",
        children: <GemstoneUsage orderId={+id!} disabled />,
      },
      {
        key: TabKeys.METALS,
        label: "Metals",
        children: <MetalsDetails orderId={+id!} disabled />,
      },
      {
        key: TabKeys.SUMMARY,
        label: "Summary",
        children: <OrderSummary orderId={+id!} />,
      },
    ],
    rolesMap,
  });

  return (
    <CommonLayout>
      <StockItemHeader stockMetadata={stockItem?.stock} />

      <Tabs activeKey={activeTab} onChange={setActiveTab} items={filteredMenuItems} />
    </CommonLayout>
  );
};
