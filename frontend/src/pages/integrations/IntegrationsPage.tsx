import { Breadcrumb } from "antd";
import { Link } from "react-router";
import { QuickBooksConnect } from "@features/integrations/quickbooks-connect";
import { QuickBooksDataViewer } from "@features/integrations/quickbooks-data-viewer";
import PageHero from "@shared/ui/PageHero";
import { ApiOutlined } from "@ant-design/icons";
import "./styles.scss";

export const IntegrationsPage = () => {
  return (
    <div className="integrations-page">
      <Breadcrumb items={[{ title: <Link to="/settings">Settings</Link> }, { title: "Integrations" }]} />

      <PageHero
        icon={<ApiOutlined />}
        badge="Connections"
        title="Integrations"
        subtitle="Connect third-party services like QuickBooks to streamline your workflow"
      />

      <div className="integrations-content">
        <QuickBooksConnect />
        <QuickBooksDataViewer />
      </div>
    </div>
  );
};

export default IntegrationsPage;
