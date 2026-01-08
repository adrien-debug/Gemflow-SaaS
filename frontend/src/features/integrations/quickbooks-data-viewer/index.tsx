import { useState } from "react";
import { Card, Tabs, Table, Typography, Tag, Button, Empty, Spin } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useQuickBooksCustomers, useQuickBooksInvoices, useQuickBooksItems } from "@entities/quickbooks/hooks/useQuickBooksData";
import { useQuickBooksStatus } from "@entities/quickbooks/hooks/useQuickBooksStatus";
import { QuickBooksCustomer, QuickBooksInvoice, QuickBooksItem } from "@entities/quickbooks/models/quickbooks-integration.model";
import type { ColumnsType } from "antd/es/table";
import "./styles.scss";

const { Title } = Typography;
const { TabPane } = Tabs;

export const QuickBooksDataViewer = () => {
  const [activeTab, setActiveTab] = useState("customers");
  const { data: status } = useQuickBooksStatus();
  
  const isConnected = status?.status === 'CONNECTED';

  const { 
    data: customers, 
    isLoading: customersLoading,
    refetch: refetchCustomers 
  } = useQuickBooksCustomers(undefined, 100, isConnected && activeTab === 'customers');

  const { 
    data: invoices, 
    isLoading: invoicesLoading,
    refetch: refetchInvoices 
  } = useQuickBooksInvoices(undefined, 100, isConnected && activeTab === 'invoices');

  const { 
    data: items, 
    isLoading: itemsLoading,
    refetch: refetchItems 
  } = useQuickBooksItems(undefined, 100, isConnected && activeTab === 'items');

  const customerColumns: ColumnsType<QuickBooksCustomer> = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Display Name', dataIndex: 'displayName', key: 'displayName' },
    { title: 'Company', dataIndex: 'companyName', key: 'companyName' },
    { title: 'Email', dataIndex: 'primaryEmailAddr', key: 'primaryEmailAddr' },
    { title: 'Phone', dataIndex: 'primaryPhone', key: 'primaryPhone' },
    { 
      title: 'Balance', 
      dataIndex: 'balance', 
      key: 'balance',
      render: (balance) => balance ? `$${parseFloat(balance).toFixed(2)}` : '-'
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
      render: (active) => (
        <Tag color={active ? 'green' : 'red'}>{active ? 'Active' : 'Inactive'}</Tag>
      )
    }
  ];

  const invoiceColumns: ColumnsType<QuickBooksInvoice> = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Doc Number', dataIndex: 'docNumber', key: 'docNumber' },
    { title: 'Customer', dataIndex: 'customerName', key: 'customerName' },
    { 
      title: 'Date', 
      dataIndex: 'txnDate', 
      key: 'txnDate',
      render: (date) => date ? new Date(date).toLocaleDateString() : '-'
    },
    { 
      title: 'Due Date', 
      dataIndex: 'dueDate', 
      key: 'dueDate',
      render: (date) => date ? new Date(date).toLocaleDateString() : '-'
    },
    { 
      title: 'Total', 
      dataIndex: 'totalAmt', 
      key: 'totalAmt',
      render: (amount) => amount ? `$${amount.toFixed(2)}` : '-'
    },
    { 
      title: 'Balance', 
      dataIndex: 'balance', 
      key: 'balance',
      render: (balance) => balance ? `$${balance.toFixed(2)}` : '-'
    },
  ];

  const itemColumns: ColumnsType<QuickBooksItem> = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description', ellipsis: true },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { 
      title: 'Unit Price', 
      dataIndex: 'unitPrice', 
      key: 'unitPrice',
      render: (price) => price ? `$${price.toFixed(2)}` : '-'
    },
    { 
      title: 'Qty On Hand', 
      dataIndex: 'qtyOnHand', 
      key: 'qtyOnHand',
      render: (qty) => qty !== null ? qty : '-'
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
      render: (active) => (
        <Tag color={active ? 'green' : 'red'}>{active ? 'Active' : 'Inactive'}</Tag>
      )
    }
  ];

  if (!isConnected) {
    return (
      <Card className="quickbooks-data-viewer">
        <Empty description="Connect to QuickBooks to view data" />
      </Card>
    );
  }

  const handleRefresh = () => {
    switch (activeTab) {
      case 'customers':
        refetchCustomers();
        break;
      case 'invoices':
        refetchInvoices();
        break;
      case 'items':
        refetchItems();
        break;
    }
  };

  return (
    <Card className="quickbooks-data-viewer">
      <div className="viewer-header">
        <Title level={4}>QuickBooks Data</Title>
        <Button 
          icon={<ReloadOutlined />} 
          onClick={handleRefresh}
          loading={customersLoading || invoicesLoading || itemsLoading}
        >
          Refresh
        </Button>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab={`Customers (${customers?.length || 0})`} key="customers">
          {customersLoading ? (
            <Spin />
          ) : (
            <Table
              dataSource={customers}
              columns={customerColumns}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              size="small"
              scroll={{ x: 800 }}
            />
          )}
        </TabPane>

        <TabPane tab={`Invoices (${invoices?.length || 0})`} key="invoices">
          {invoicesLoading ? (
            <Spin />
          ) : (
            <Table
              dataSource={invoices}
              columns={invoiceColumns}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              size="small"
              scroll={{ x: 800 }}
            />
          )}
        </TabPane>

        <TabPane tab={`Items (${items?.length || 0})`} key="items">
          {itemsLoading ? (
            <Spin />
          ) : (
            <Table
              dataSource={items}
              columns={itemColumns}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              size="small"
              scroll={{ x: 800 }}
            />
          )}
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default QuickBooksDataViewer;

