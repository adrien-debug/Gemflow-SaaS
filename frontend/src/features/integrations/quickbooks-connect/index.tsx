import { Button, Card, Tag, Typography, Space, Descriptions, Statistic, Row, Col, Spin, Alert } from "antd";
import { LinkOutlined, DisconnectOutlined, SyncOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useQuickBooksStatus } from "@entities/quickbooks/hooks/useQuickBooksStatus";
import { useQuickBooksConnect, useQuickBooksDisconnect } from "@entities/quickbooks/hooks/useQuickBooksConnect";
import { useQuickBooksDataSummary } from "@entities/quickbooks/hooks/useQuickBooksData";
import "./styles.scss";

const { Title, Text } = Typography;

export const QuickBooksConnect = () => {
  const { data: status, isLoading: statusLoading, refetch: refetchStatus } = useQuickBooksStatus();
  const { data: summary, isLoading: summaryLoading } = useQuickBooksDataSummary(
    status?.status === 'CONNECTED'
  );
  const connectMutation = useQuickBooksConnect();
  const disconnectMutation = useQuickBooksDisconnect();

  const isConnected = status?.status === 'CONNECTED';
  const isTokenExpired = status?.status === 'TOKEN_EXPIRED';

  const handleConnect = () => {
    connectMutation.mutate();
  };

  const handleDisconnect = () => {
    disconnectMutation.mutate();
  };

  const getStatusTag = () => {
    if (!status) return <Tag>Not Connected</Tag>;
    
    switch (status.status) {
      case 'CONNECTED':
        return <Tag color="success" icon={<CheckCircleOutlined />}>Connected</Tag>;
      case 'TOKEN_EXPIRED':
        return <Tag color="warning" icon={<CloseCircleOutlined />}>Token Expired</Tag>;
      case 'ERROR':
        return <Tag color="error" icon={<CloseCircleOutlined />}>Error</Tag>;
      default:
        return <Tag>Disconnected</Tag>;
    }
  };

  if (statusLoading) {
    return (
      <Card className="quickbooks-connect-card">
        <Spin size="large" />
      </Card>
    );
  }

  return (
    <Card className="quickbooks-connect-card">
      <div className="quickbooks-header">
        <div className="quickbooks-logo">
          <img 
            src="https://quickbooks.intuit.com/oidam/intuit/sbseg/en_us/quickbooks/QBO_Logo_FullColor.png" 
            alt="QuickBooks Logo" 
            style={{ height: 40 }}
          />
        </div>
        <div className="quickbooks-status">
          {getStatusTag()}
        </div>
      </div>

      <Title level={4}>QuickBooks Online Integration</Title>
      <Text type="secondary">
        Connect your QuickBooks Online account to sync customers, invoices, and items.
      </Text>

      {isTokenExpired && (
        <Alert
          type="warning"
          message="Token Expired"
          description="Your QuickBooks connection token has expired. Please reconnect."
          showIcon
          style={{ marginTop: 16 }}
        />
      )}

      <div className="quickbooks-actions">
        {!isConnected ? (
          <Button
            type="primary"
            icon={<LinkOutlined />}
            onClick={handleConnect}
            loading={connectMutation.isPending}
            size="large"
          >
            Connect to QuickBooks
          </Button>
        ) : (
          <Space>
            <Button
              icon={<SyncOutlined />}
              onClick={() => refetchStatus()}
              loading={statusLoading}
            >
              Refresh Status
            </Button>
            <Button
              danger
              icon={<DisconnectOutlined />}
              onClick={handleDisconnect}
              loading={disconnectMutation.isPending}
            >
              Disconnect
            </Button>
          </Space>
        )}
      </div>

      {isConnected && status && (
        <div className="quickbooks-details">
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label="Company ID">{status.realmId}</Descriptions.Item>
            <Descriptions.Item label="Connected At">
              {new Date(status.connectedAt).toLocaleDateString()}
            </Descriptions.Item>
            <Descriptions.Item label="Last Sync">
              {status.lastSyncAt ? new Date(status.lastSyncAt).toLocaleString() : 'Never'}
            </Descriptions.Item>
            <Descriptions.Item label="Token Expires">
              {new Date(status.tokenExpiresAt).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}

      {isConnected && summary && (
        <div className="quickbooks-summary">
          <Title level={5}>Data Available</Title>
          {summaryLoading ? (
            <Spin />
          ) : (
            <>
              {summary.companyInfo && (
                <Alert
                  type="info"
                  message={`Company: ${summary.companyInfo.companyName}`}
                  description={summary.companyInfo.legalName}
                  showIcon
                  style={{ marginBottom: 16 }}
                />
              )}
              <Row gutter={16}>
                <Col span={6}>
                  <Card size="small">
                    <Statistic title="Customers" value={summary.customerCount} />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card size="small">
                    <Statistic title="Invoices" value={summary.invoiceCount} />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card size="small">
                    <Statistic title="Items" value={summary.itemCount} />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card size="small">
                    <Statistic title="Vendors" value={summary.vendorCount} />
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </div>
      )}
    </Card>
  );
};

export default QuickBooksConnect;

