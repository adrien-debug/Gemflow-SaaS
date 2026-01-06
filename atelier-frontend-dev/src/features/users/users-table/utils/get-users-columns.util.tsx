import { ColumnsType } from "antd/es/table";
import Dropdown from "antd/es/dropdown";
import Button from "antd/es/button";
import { EllipsisOutlined } from "@ant-design/icons";
import Tag from "@shared/ui/tag/components/Tag";
import Avatar from "@shared/ui/Avatar";
import { User } from "@entities/user/models/user.model.ts";
import { ITableActions } from "@features/users/users-table/interfaces/user-table-actions.interface";

export const getUsersColumns = (actions: ITableActions): ColumnsType<User> => {
  return [
    {
      dataIndex: "photos",
      minWidth: 60,
      width: 60,
      render: (_, user) => <Avatar user={user} />,
    },
    {
      dataIndex: "fullName",
      title: "Full Name",
    },
    {
      dataIndex: "email",
      title: "Email",
    },
    {
      dataIndex: "role",
      title: "Role",
      render: (_, { role }) => <Tag tag={{ id: null, name: role?.name }} />,
    },
    {
      dataIndex: "isActive",
      title: "Active",
      render: (_, { isActive }: User) => (
        <Tag tag={{ id: null, name: isActive ? "Active" : "Not active" }} color={isActive ? "green" : "red"} />
      ),
    },
    {
      key: "actions",
      title: "Actions",
      align: "center",
      render: ({ id }, user) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "USER_LIST_ITEM_EDIT",
                label: <span id={`user-edit-${id}`}>Edit</span>,
                onClick: () => actions.onEditUser(user),
              },
              {
                key: "USER_LIST_ITEM_TOGGLE_ACTIVE",
                label: user?.isActive ? (
                  <span id={`user-deactivate-${id}`}>Deactivate</span>
                ) : (
                  <span id={`user-activate-${id}`}>Activate</span>
                ),
                onClick: () => actions.onToggleActiveUser(user, !user?.isActive),
              },
              {
                key: "USER_LIST_ITEM_DELETE",
                label: <span id={`user-delete-${id}`}>Delete</span>,
                onClick: () => actions.onDeleteUser(user),
              },
            ],
          }}
          placement="bottomRight"
          trigger={["click"]}>
          <Button id={`user-actions-${id}`} icon={<EllipsisOutlined />} shape="circle" />
        </Dropdown>
      ),
    },
  ];
};
