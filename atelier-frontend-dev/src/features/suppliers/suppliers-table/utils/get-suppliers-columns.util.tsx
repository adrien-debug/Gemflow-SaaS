import { ColumnsType } from "antd/es/table";
import Dropdown from "antd/es/dropdown";
import Button from "antd/es/button";
import { EllipsisOutlined } from "@ant-design/icons";
import { Supplier } from "@entities/supplier/model/supplier.model";
import Typography from "antd/es/typography";
import { ITableActions } from "@features/suppliers/suppliers-table/interfaces/supplier-table-actions.interface";
import Tag from "@shared/ui/tag/components/Tag/index.tsx";

export const getSuppliersColumns = (actions: ITableActions): ColumnsType<Supplier> => {
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
      dataIndex: "supply type",
      title: "Supply type",
      width: 400,
      render: (_, supplier) => <Tag tag={{ id: null, name: supplier.supplyType?.name }} />,
    },
    {
      dataIndex: "country",
      title: "Country",
      width: 260,
      render: (_, supplier) => <Typography.Text>{supplier.country?.name}</Typography.Text>,
    },
    {
      key: "actions",
      title: "Actions",
      align: "center",
      width: 132,
      render: (_, supplier) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "SUPPLIER_LIST_ITEM_EDIT",
                label: "Edit",
                onClick: () => actions.onEditSupplier(supplier),
              },
              {
                key: "SUPPLIER_LIST_ITEM_DELETE",
                label: "Delete",
                onClick: () => actions.onDeleteSupplier(supplier),
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
