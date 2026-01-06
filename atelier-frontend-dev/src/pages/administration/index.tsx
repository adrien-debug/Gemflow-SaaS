import { Route, Routes } from "react-router";
import AdministrationPage from "@pages/administration/AdministrationPage";

const Administration = () => {
  return (
    <Routes>
      <Route index element={<AdministrationPage />} />
    </Routes>
  );
};

export default Administration;
