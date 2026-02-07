import { Supplier } from "@entities/supplier/model/supplier.model";

export interface ITableActions {
  onEditSupplier: (supplier: Supplier) => void;
  onDeleteSupplier: (supplier: Supplier) => void;
}
