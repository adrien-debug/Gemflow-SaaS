import { FC } from "react";
import { Route, Routes } from "react-router";
import LoginPage from "@pages/authorization/LoginPage.tsx";
import ForgotPage from "@pages/authorization/ForgotPage.tsx";
import RestorePage from "@pages/authorization/RestorePage.tsx";
import CreateNewPasswordPage from "@pages/authorization/CreateNewPasswordPage.tsx";
import PasswordCreatedPage from "@pages/authorization/PasswordCreatedPage.tsx";
import ExpiredPage from "@pages/authorization/ExpiredPage.tsx";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { CreatePasswordPageType } from "@entities/authorization/constants/create-password-page-type.enum.ts";

const Authorization: FC = () => {
  const { contextHolder } = useMessage();

  return (
    <>
      {contextHolder}
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="forgot" element={<ForgotPage />} />
        <Route path="restore" element={<RestorePage />} />
        <Route path="create-password/:token" element={<CreateNewPasswordPage type={CreatePasswordPageType.CREATE} />} />
        <Route
          path="restore-password/:token"
          element={<CreateNewPasswordPage type={CreatePasswordPageType.RESTORE} />}
        />
        <Route path="password-created" element={<PasswordCreatedPage type={CreatePasswordPageType.CREATE} />} />
        <Route path="new-password-created" element={<PasswordCreatedPage type={CreatePasswordPageType.RESTORE} />} />
        <Route path="expired" element={<ExpiredPage />} />
      </Routes>
    </>
  );
};

export default Authorization;
