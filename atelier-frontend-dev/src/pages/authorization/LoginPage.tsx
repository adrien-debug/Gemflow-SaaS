import { FC } from "react";
import Login from "@features/authorization/login/ui/Login";
import BlankLayout from "@shared/ui/layouts/BlankLayout";
import BasicFooter from "@shared/ui/footer/BasicFooter";

const LoginPage: FC = () => {
  return (
    <BlankLayout>
      <Login />
      <BasicFooter />
    </BlankLayout>
  );
};

export default LoginPage;
