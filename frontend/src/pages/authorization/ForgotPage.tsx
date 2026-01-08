import { FC } from "react";
import BlankLayout from "@shared/ui/layouts/BlankLayout";
import BasicFooter from "@shared/ui/footer/BasicFooter";
import ForgotPassword from "@features/authorization/forgot-password/ui/ForgotPassword";

const ForgotPage: FC = () => {
  return (
    <BlankLayout>
      <ForgotPassword />
      <BasicFooter />
    </BlankLayout>
  );
};

export default ForgotPage;
