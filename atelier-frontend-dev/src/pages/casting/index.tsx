import { Route, Routes } from "react-router";
import CastingListPage from "@pages/casting/CastingListPage.tsx";
import { CastingDetailsPage } from "@pages/casting/CastingDetailsPage.tsx";
import CreateCastingPage from "@pages/casting/CreateCastingPage.tsx";

const Casting = () => {
  return (
    <Routes>
      <Route index element={<CastingListPage />} />
      <Route path="/:id" element={<CastingDetailsPage />} />
      <Route path="/create" element={<CreateCastingPage />} />
    </Routes>
  );
};

export default Casting;
