import Table, { TablePaginationConfig } from "antd/es/table";
import useModal from "@shared/hooks/useModal";
import { useState } from "react";
import { PageRequestModel } from "@shared/types/page-request.model";
import Skeleton from "antd/es/skeleton";
import { Optional } from "@shared/types/optional.type.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { ITableActions } from "@features/users/users-table/interfaces/user-table-actions.interface";
import useUsers from "@entities/user/hooks/useUsers";
import useDeleteUser from "@entities/user/hooks/useDeleteUser";
import { getUsersColumns } from "@features/users/users-table/utils/get-users-columns.util";
import { User } from "@entities/user/models/user.model";
import useToggleUserActivation from "@entities/user/hooks/useToggleUserActivation";
import EditUserModal from "@features/users/edit-user-modal/ui/EditUserModal";
import { HttpStatusCode } from "axios";

const UsersTable = () => {
  const { modalApi } = useModal();

  const { messageApi } = useMessage();

  const [currentUser, setCurrentUser] = useState<Optional<User>>();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [paginationConfiguration, setPaginationConfiguration] = useState<PageRequestModel>({
    page: 1,
    size: 10,
    searchCriteria: {},
  });

  const query = useUsers(paginationConfiguration);
  const deleteMutation = useDeleteUser();
  const toggleActiveMutation = useToggleUserActivation();

  const columns = getUsersColumns({
    onEditUser: (user) => {
      setCurrentUser(user);
      setIsModalOpen(true);
    },
    onToggleActiveUser: (user, isActive) => {
      modalApi.confirm({
        cancelText: "No",
        centered: true,
        content: `Are you sure you want to ${user.isActive ? "deactivate" : "activate"} the "${user.fullName}" user?`,
        icon: null,
        okButtonProps: { variant: "solid", danger: true },
        okText: "Yes",
        onOk() {
          toggleActiveMutation.mutate(
            { userId: user.id, isActive },
            { onSuccess: () => messageApi.success(`The user is ${!user.isActive ? "activated" : "deactivated"}`) },
          );
        },
        title: `${user.isActive ? "Deactivate user?" : "Activate user?"}`,
      });
    },
    onDeleteUser: (user) => {
      modalApi.confirm({
        cancelText: "No",
        centered: true,
        content: `Are you sure you want to delete the "${user.fullName}" user?`,
        icon: null,
        okButtonProps: { variant: "solid", danger: true },
        okText: "Yes",
        onOk() {
          deleteMutation.mutate(user.id, {
            onSuccess: () => messageApi.success("The user is deleted"),
            onError: (error) => {
              if (error.code === HttpStatusCode.BadRequest) {
                void messageApi.error("User cannot be deleted, as he/she is associated with the content");
              } else {
                void messageApi.error("Failed to delete user");
              }
            },
          });
        },
        title: "Delete user?",
      });
    },
  } satisfies ITableActions);

  const onChange = (pagination: TablePaginationConfig) => {
    setPaginationConfiguration((prev) => ({
      ...prev,
      page: pagination?.current as number,
    }));
  };

  if (query.isPending) {
    return <Skeleton />;
  }

  return (
    <>
      <Table
        columns={columns}
        onChange={onChange}
        loading={query.isPending}
        pagination={{
          current: query.data?.page,
          pageSize: query.data?.size,
          total: query.data?.totalElements,
          showSizeChanger: false,
        }}
        dataSource={query.data?.content || []}
        rowKey="id"
      />
      <EditUserModal open={isModalOpen} user={currentUser} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default UsersTable;
