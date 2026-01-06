import { FC } from "react";
import BlankLayout from "@shared/ui/layouts/BlankLayout";
import BasicFooter from "@shared/ui/footer/BasicFooter";
import CreateNewPassword from "@features/authorization/create-new-password/ui/CreateNewPassword";
import { CreatePasswordPageType } from "@entities/authorization/constants/create-password-page-type.enum.ts";

interface Props {
  type: CreatePasswordPageType;
}

const CreateNewPasswordPage: FC<Props> = ({ type }) => {
  return (
    <BlankLayout>
      <CreateNewPassword type={type} />
      <BasicFooter />
    </BlankLayout>
  );
};

export default CreateNewPasswordPage;
