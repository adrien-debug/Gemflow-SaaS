import { useState } from "react";
import Table from "antd/es/table";
import Button from "antd/es/button";
import Space from "antd/es/space";
import Popconfirm from "antd/es/popconfirm";
import message from "antd/es/message";
import Input from "antd/es/input";
import { EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { CrmContact } from "@entities/crm-contact/models/crm-contact.model";
import useCrmContacts from "@entities/crm-contact/hooks/useCrmContacts";
import useDeleteCrmContact from "@entities/crm-contact/hooks/useDeleteCrmContact";
import ContactFormModal from "@features/crm/contact-form/ui/ContactFormModal";
import { brandingColorPalette } from "@shared/constants/branding";
import dayjs from "dayjs";

const CrmContactsTable = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [editingContact, setEditingContact] = useState<CrmContact | undefined>(undefined);

  const { data, isLoading } = useCrmContacts({
    page,
    size: pageSize,
    searchCriteria: { searchInput: search || undefined },
  });

  const deleteMutation = useDeleteCrmContact();

  const handleDelete = async (contactId: number) => {
    try {
      await deleteMutation.mutateAsync(contactId);
      message.success("Contact deleted successfully");
    } catch (error) {
      message.error("Failed to delete contact");
    }
  };

  const columns: ColumnsType<CrmContact> = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (_, record) => (
        <span style={{ color: brandingColorPalette.brand6, fontWeight: 500 }}>
          {record.fullName || record.email}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => phone || "-",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (company) => company || "-",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => tags || "-",
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => setEditingContact(record)}
          />
          <Popconfirm
            title="Delete this contact?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search contacts..."
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 300 }}
          allowClear
        />
      </div>

      <Table
        columns={columns}
        dataSource={data?.content || []}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: page,
          pageSize,
          total: data?.totalElements || 0,
          onChange: (p, s) => {
            setPage(p);
            setPageSize(s);
          },
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} contacts`,
        }}
      />

      <ContactFormModal
        isOpen={!!editingContact}
        onClose={() => setEditingContact(undefined)}
        contact={editingContact}
      />
    </>
  );
};

export default CrmContactsTable;

