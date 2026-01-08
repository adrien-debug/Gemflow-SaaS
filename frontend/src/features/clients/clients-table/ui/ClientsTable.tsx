import Table, { TablePaginationConfig } from "antd/es/table";
import useModal from "@shared/hooks/useModal";
import { useState } from "react";
import { PageRequestModel } from "@shared/types/page-request.model";
import useClients from "@entities/client/hooks/useClients";
import useDeleteClient from "@entities/client/hooks/useDeleteClient";
import { ITableActions } from "@features/clients/clients-table/interfaces/client-table-actions.interface";
import Skeleton from "antd/es/skeleton";
import { getClientsColumns } from "@features/clients/clients-table/utils/get-clients-columns.util";
import EditClientModal from "@features/clients/edit-client-modal/ui/EditClientModal";
import { Optional } from "@shared/types/optional.type.ts";
import { Client } from "@entities/client/model/client.model";
import { useMessage } from "@shared/hooks/useMessage.ts";

const ClientsTable = () => {
  const { modalApi } = useModal();

  const { messageApi } = useMessage();

  const [currentClient, setCurrentClient] = useState<Optional<Client>>();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [paginationConfiguration, setPaginationConfiguration] = useState<PageRequestModel>({
    page: 1,
    size: 10,
    searchCriteria: {},
  });

  const clientsQuery = useClients(paginationConfiguration);
  const deleteMutation = useDeleteClient();

  const columns = getClientsColumns({
    onEditClient: (client) => {
      setCurrentClient(client);
      setIsModalOpen(true);
    },
    onDeleteClient: (client) => {
      modalApi.confirm({
        cancelText: "No",
        centered: true,
        content: `Are you sure you want to delete the "${client.name}" client?`,
        icon: null,
        okButtonProps: { variant: "solid", danger: true },
        okText: "Yes",
        onOk() {
          deleteMutation.mutate(client.id, {
            onSuccess: () => {
              void messageApi.success("The client is deleted");
            },
            onError: (e) => {
              void messageApi.error(e.data?.friendlyMessage || "Failed to delete client");
            },
          });
        },
        title: "Delete client?",
      });
    },
  } satisfies ITableActions);

  const onChange = (pagination: TablePaginationConfig) => {
    setPaginationConfiguration((prev) => ({
      ...prev,
      page: pagination?.current as number,
    }));
  };

  if (clientsQuery.isPending) {
    return <Skeleton />;
  }

  return (
    <>
      <Table
        columns={columns}
        onChange={onChange}
        loading={clientsQuery.isPending}
        pagination={{
          current: clientsQuery.data?.page,
          pageSize: clientsQuery.data?.size,
          total: clientsQuery.data?.totalElements,
          showSizeChanger: false,
        }}
        dataSource={clientsQuery.data?.content || []}
        rowKey="id"
      />
      <EditClientModal open={isModalOpen} client={currentClient} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default ClientsTable;
