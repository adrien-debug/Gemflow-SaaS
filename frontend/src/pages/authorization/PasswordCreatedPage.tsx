import { FC } from "react";
import BlankLayout from "@shared/ui/layouts/BlankLayout";
import BasicFooter from "@shared/ui/footer/BasicFooter";
import PasswordCreatedComponent from "@features/authorization/password-created/ui/PasswordCreated";
import { CreatePasswordPageType } from "@entities/authorization/constants/create-password-page-type.enum.ts";

interface Props {
  type: CreatePasswordPageType;
}

const PasswordCreatedPage: FC<Props> = ({ type }) => {
  return (
    <BlankLayout>
      <PasswordCreatedComponent type={type} />
      <BasicFooter />
    </BlankLayout>
  );
};

export default PasswordCreatedPage;
