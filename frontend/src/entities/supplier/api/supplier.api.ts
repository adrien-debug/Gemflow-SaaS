import api from "@shared/api";
import { Pageable } from "@shared/types/pageable.model.ts";
import { Supplier } from "@entities/supplier/model/supplier.model";
import { SupplierDto } from "@entities/supplier/dto/supplier.dto";
import { SearchSuppliersDto } from "@entities/supplier/dto/search-suppliers.dto.ts";

const SuppliersApi = {
  search: async (pageRequest: SearchSuppliersDto): Promise<Pageable<Supplier>> => {
    return api.post("/api/v1/suppliers/search", pageRequest);
  },

  create: async (supplierDto: SupplierDto): Promise<Supplier> => {
    return api.post("/api/v1/suppliers", supplierDto);
  },

  delete: async (supplierId: number): Promise<void> => {
    return api.delete(`/api/v1/suppliers/${supplierId}`);
  },

  update: async (supplierId: number, supplierDto: SupplierDto): Promise<Supplier> => {
    return api.put(`/api/v1/suppliers/${supplierId}`, supplierDto);
  },
};

export default SuppliersApi;
