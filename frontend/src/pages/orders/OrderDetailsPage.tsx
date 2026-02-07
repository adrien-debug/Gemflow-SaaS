import OrderDetails from "@features/orders/view-order/ui/OrderDetails";
import OrderHeader from "@features/orders/view-order/ui/OrderHeader";
import CommonLayout from "@shared/ui/layouts/CommonLayout";
import Tabs from "antd/es/tabs";
import { useParams } from "react-router";
import CadDetails from "@features/orders/cad-details/ui/CadDetails";
import LabourDetails from "@features/orders/labour-details/ui/LabourDetails";
import DiamondsUsage from "@features/diamonds/diamonds-usage/ui/DiamondsUsage";
import GemstoneUsage from "@features/gemstones/gemstone-usage/ui/GemstoneUsage";
import { useOrder } from "@entities/order/hooks/useOrder.ts";
import { useOrderTaskStatistic } from "@entities/order/hooks/useOrderTaskStatistic.ts";
import { useEffect, useState } from "react";
import { OrderTaskStage } from "@entities/order/constants/order-task-stage.enum.ts";
import MetalsDetails from "@features/metals-usage/metals-usage-details/ui/MetalsUsageDetails";
import { TabKeys } from "@pages/orders/constants/tab-keys.ts";
import useActiveTab from "@shared/hooks/useActiveTab.ts";
import OrderSummary from "@features/orders/order-summary/ui/OrderSummary";
import { useFilterMenuByRoles } from "@entities/user-roles/hooks/useFilterMenuByRoles.ts";
import { RolesMap } from "@pages/orders/constants/roles-map.ts";
import TechnicalSheet from "@features/orders/technical-sheet/ui/TechnicalSheet";
import { JewelCategory } from "@entities/jewel-category/constants/jewel-category.ts";

export const OrderDetailsPage = () => {
  const { id } = useParams();
  const { activeTab, setActiveTab } = useActiveTab(TabKeys.DETAILS);

  const { isLoading, data: order } = useOrder(Number(id));

  const { data } = useOrderTaskStatistic(Number(id));

  const [isEditBlocked, setIsEditBlocked] = useState(false);

  useEffect(() => {
    setIsEditBlocked(data?.maxStage !== OrderTaskStage.CAD);
  }, [data]);

  const filteredMenuItems = useFilterMenuByRoles({
    menuItems: [
      {
        key: TabKeys.DETAILS,
        label: "Details",
        children: <OrderDetails order={order} isLoading={isLoading} isEditBlocked={isEditBlocked} />,
      },
      {
        key: TabKeys.CAD,
        label: "CAD",
        children: <CadDetails orderId={+id!} isEditBlocked={isEditBlocked} />,
      },
      {
        key: TabKeys.TECHNICAL_SHEET,
        label: "Technical sheet",
        children: (
          <TechnicalSheet
            orderId={+id!}
            dimension={order?.fingerSize || order?.length}
            isRing={order?.itemCategory?.id === JewelCategory.Ring}
            isEditBlocked={isEditBlocked}
          />
        ),
      },
      {
        key: TabKeys.LABOUR,
        label: "Labour",
        children: <LabourDetails orderId={+id!} />,
      },
      {
        key: TabKeys.DIAMONDS,
        label: "Diamonds",
        children: <DiamondsUsage orderId={+id!} />,
      },
      {
        key: TabKeys.GEMSTONES,
        label: "Gemstones",
        children: <GemstoneUsage orderId={+id!} />,
      },
      {
        key: TabKeys.METALS,
        label: "Metals",
        children: <MetalsDetails orderId={+id!} />,
      },
      {
        key: TabKeys.SUMMARY,
        label: "Summary",
        children: <OrderSummary orderId={+id!} />,
      },
    ],
    rolesMap: RolesMap,
  });

  return (
    <CommonLayout>
      <OrderHeader />

      <Tabs activeKey={activeTab} onChange={setActiveTab} items={filteredMenuItems} />
    </CommonLayout>
  );
};
