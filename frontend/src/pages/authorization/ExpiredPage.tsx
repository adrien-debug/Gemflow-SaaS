import { FC } from "react";
import BlankLayout from "@shared/ui/layouts/BlankLayout";
import BasicFooter from "@shared/ui/footer/BasicFooter";
import LinkExpired from "@features/authorization/link-expired/ui/LinkExpired";

const ExpiredPage: FC = () => {
  return (
    <BlankLayout>
      <LinkExpired />
      <BasicFooter />
    </BlankLayout>
  );
};

export default ExpiredPage;
