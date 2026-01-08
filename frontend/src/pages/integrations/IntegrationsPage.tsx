import { Typography, Breadcrumb } from "antd";
import { Link } from "react-router";
import { QuickBooksConnect } from "@features/integrations/quickbooks-connect";
import { QuickBooksDataViewer } from "@features/integrations/quickbooks-data-viewer";
import "./styles.scss";

const { Title } = Typography;

export const IntegrationsPage = () => {
  return (
    <div className="integrations-page">
      <Breadcrumb
        items={[
          { title: <Link to="/settings">Settings</Link> },
          { title: 'Integrations' },
        ]}
      />
      
      <div className="page-header">
        <Title level={2}>Integrations</Title>
      </div>

      <div className="integrations-content">
        <QuickBooksConnect />
        <QuickBooksDataViewer />
      </div>
    </div>
  );
};

export default IntegrationsPage;

