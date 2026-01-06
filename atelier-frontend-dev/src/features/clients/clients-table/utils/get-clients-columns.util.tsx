import { ColumnsType } from "antd/es/table";
import Dropdown from "antd/es/dropdown";
import Button from "antd/es/button";
import { EllipsisOutlined } from "@ant-design/icons";
import { Client } from "@entities/client/model/client.model";
import Typography from "antd/es/typography";
import { ITableActions } from "@features/clients/clients-table/interfaces/client-table-actions.interface";

export const getClientsColumns = (actions: ITableActions): ColumnsType<Client> => {
  return [
    {
      dataIndex: "id",
      title: "ID",
      width: 60,
    },
    {
      dataIndex: "name",
      title: "Name",
      width: 320,
    },
    {
      dataIndex: "email",
      title: "Email",
      width: 400,
    },
    {
      dataIndex: "country",
      title: "Country",
      width: 260,
      render: (_, client) => <Typography.Text>{client.country?.name}</Typography.Text>,
    },
    {
      key: "actions",
      title: "Actions",
      align: "center",
      width: 132,
      render: (_, client) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "CLIENT_LIST_ITEM_EDIT",
                label: "Edit",
                onClick: () => actions.onEditClient(client),
              },
              {
                key: "CLIENT_LIST_ITEM_DELETE",
                label: "Delete",
                onClick: () => actions.onDeleteClient(client),
              },
            ],
          }}
          placement="bottomRight"
          trigger={["click"]}>
          <Button icon={<EllipsisOutlined />} shape="circle" />
        </Dropdown>
      ),
    },
  ];
};
