import { Route, Routes } from "react-router";
import StockPage from "@pages/stock/StockPage.tsx";
import { StockItemDetails } from "@pages/stock/StockItemDetails.tsx";

const Stock = () => {
  return (
    <Routes>
      <Route index element={<StockPage />} />
      <Route path="/:id" element={<StockItemDetails />} />
    </Routes>
  );
};

export default Stock;
