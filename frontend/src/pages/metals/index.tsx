import AlloyDetailsPage from "@pages/metals/AlloyDetailsPage.tsx";
import AlloyedMetalDetailsPage from "@pages/metals/AlloyedMetalDetailsPage.tsx";
import MetalsListPage from "@pages/metals/MetalsListPage.tsx";
import PureMetalDetailsPage from "@pages/metals/PureMetalDetailsPage.tsx";
import { Route, Routes } from "react-router";
import OtherMaterialDetailsPage from "@pages/metals/OtherMaterialDetailsPage.tsx";

const Metals = () => {
  return (
    <Routes>
      <Route index element={<MetalsListPage />} />
      <Route path={"pure-metals/:id"} element={<PureMetalDetailsPage />} />
      {/*<Route path={"pure-metals/:id/purchases/:purchaseId"} element={<PureMetalPurchaseDetailsPage />} />*/}
      <Route path={"alloys/:id"} element={<AlloyDetailsPage />} />
      {/*<Route path={"alloys/:id/purchases/:purchaseId"} element={<AlloyPurchaseDetailsPage />} />*/}
      <Route path={"other/:id"} element={<OtherMaterialDetailsPage />} />
      <Route path={"alloyed-metals/:id"} element={<AlloyedMetalDetailsPage />} />
    </Routes>
  );
};

export default Metals;
