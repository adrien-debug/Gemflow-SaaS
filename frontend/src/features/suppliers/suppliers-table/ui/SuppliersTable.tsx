import Table, { TablePaginationConfig } from "antd/es/table";
import useModal from "@shared/hooks/useModal";
import { useState } from "react";
import { PageRequestModel } from "@shared/types/page-request.model";
import Skeleton from "antd/es/skeleton";
import { Optional } from "@shared/types/optional.type.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { getSuppliersColumns } from "@features/suppliers/suppliers-table/utils/get-suppliers-columns.util";
import { Supplier } from "@entities/supplier/model/supplier.model";
import { ITableActions } from "@features/suppliers/suppliers-table/interfaces/supplier-table-actions.interface";
import useSuppliers from "@entities/supplier/hooks/useSuppliers";
import useDeleteSupplier from "@entities/supplier/hooks/useDeleteSupplier";
import EditSupplierModal from "@features/suppliers/edit-supplier-modal/ui/EditSupplierModal";

const SuppliersTable = () => {
  const { modalApi } = useModal();

  const { messageApi } = useMessage();

  const [currentSupplier, setCurrentSupplier] = useState<Optional<Supplier>>();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [paginationConfiguration, setPaginationConfiguration] = useState<PageRequestModel>({
    page: 1,
    size: 10,
    searchCriteria: {},
  });

  const suppliersQuery = useSuppliers(paginationConfiguration);
  const deleteMutation = useDeleteSupplier();

  const columns = getSuppliersColumns({
    onEditSupplier: (supplier) => {
      setCurrentSupplier(supplier);
      setIsModalOpen(true);
    },
    onDeleteSupplier: (supplier) => {
      modalApi.confirm({
        cancelText: "No",
        centered: true,
        content: `Are you sure you want to delete the "${supplier.name}" supplier?`,
        icon: null,
        okButtonProps: { variant: "solid", danger: true },
        okText: "Yes",
        onOk() {
          deleteMutation.mutate(supplier.id, {
            onSuccess: () => {
              void messageApi.success("The supplier is deleted");
            },
            onError: (e) => {
              void messageApi.error(e.data?.friendlyMessage || "Failed to delete supplier");
            },
          });
        },
        title: "Delete supplier?",
      });
    },
  } satisfies ITableActions);

  const onChange = (pagination: TablePaginationConfig) => {
    setPaginationConfiguration((prev) => ({
      ...prev,
      page: pagination?.current as number,
    }));
  };

  if (suppliersQuery.isPending) {
    return <Skeleton />;
  }

  return (
    <>
      <Table
        columns={columns}
        onChange={onChange}
        loading={suppliersQuery.isPending}
        pagination={{
          current: suppliersQuery.data?.page,
          pageSize: suppliersQuery.data?.size,
          total: suppliersQuery.data?.totalElements,
          showSizeChanger: false,
        }}
        dataSource={suppliersQuery.data?.content || []}
        rowKey="id"
      />
      <EditSupplierModal open={isModalOpen} supplier={currentSupplier} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default SuppliersTable;
