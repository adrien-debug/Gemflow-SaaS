import { FC } from "react";
import BlankLayout from "@shared/ui/layouts/BlankLayout";
import BasicFooter from "@shared/ui/footer/BasicFooter";
import RestoreLinkSent from "@features/authorization/restore-link-sent/ui/RestoreLinkSent";

const RestorePage: FC = () => {
  return (
    <BlankLayout>
      <RestoreLinkSent />
      <BasicFooter />
    </BlankLayout>
  );
};

export default RestorePage;
