import CreateGemstonePage from "@pages/gemstones/CreateGemstonePage.tsx";
import GemstoneDetailsPage from "@pages/gemstones/GemstoneDetailsPage.tsx";
import GemstoneListPage from "@pages/gemstones/GemstoneListPage.tsx";
import { Route, Routes } from "react-router";

const Gemstones = () => {
  return (
    <Routes>
      <Route index element={<GemstoneListPage />} />
      <Route path="/create" element={<CreateGemstonePage />} />
      <Route path="/:id" element={<GemstoneDetailsPage />} />
    </Routes>
  );
};

export default Gemstones;
