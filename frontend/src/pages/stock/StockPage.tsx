import StockHeader from "@features/stock/stock-header";
import { useState } from "react";
import CommonLayout from "@shared/ui/layouts/CommonLayout";
import Tabs from "antd/es/tabs";
import SoldDetails from "@features/stock/sold-details/ui/StockSoldDetails";
import StockAvailableDetails from "@features/stock/available-details/ui/StockAvailableDetails";
import MemoOutDetails from "@features/stock/memo-out-details/ui/StockMemoOutDetails";
import { TabKeys } from "@pages/stock/constants/tab-keys.ts";
import useActiveTab from "@shared/hooks/useActiveTab.ts";

const StockPage = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const { activeTab, setActiveTab } = useActiveTab(TabKeys.AVAILABLE);

  const onSearch = (value: string) => {
    setSearchInput(value);
  };

  return (
    <CommonLayout>
      <StockHeader onSearch={onSearch} />
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: TabKeys.AVAILABLE,
            label: "Available",
            children: <StockAvailableDetails searchInput={searchInput} />,
          },
          {
            key: TabKeys.SOLD,
            label: "Sold",
            children: <SoldDetails searchInput={searchInput} />,
          },
          {
            key: TabKeys.MEMO_OUT,
            label: "Memo out",
            children: <MemoOutDetails searchInput={searchInput} />,
          },
        ]}
      />
    </CommonLayout>
  );
};

export default StockPage;
