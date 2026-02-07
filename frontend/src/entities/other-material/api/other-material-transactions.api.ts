import { CreateOtherMaterialTransactionDto } from "@entities/other-material/dto/create-other-material-transaction.dto.ts";
import { SearchOtherMaterialTransactionsDto } from "@entities/other-material/dto/search-other-material-transactions.dto.ts";
import { OtherMaterialTransaction } from "@entities/other-material/model/other-material-transaction.model.ts";
import api from "@shared/api";
import { Pageable } from "@shared/types/pageable.model.ts";

const OtherMaterialTransactionsApi = {
  search: async (pageRequest: SearchOtherMaterialTransactionsDto): Promise<Pageable<OtherMaterialTransaction>> => {
    return api.post("/api/v1/other-material-transactions/search", pageRequest);
  },

  add: async (dto: CreateOtherMaterialTransactionDto): Promise<void> => {
    return api.post("/api/v1/other-material-transactions/weight/add", dto);
  },

  deduct: async (dto: CreateOtherMaterialTransactionDto): Promise<void> => {
    return api.post("/api/v1/other-material-transactions/weight/reduce", dto);
  },

  update: async (id: number, dto: { description: string }): Promise<OtherMaterialTransaction> => {
    return api.put(`/api/v1/other-material-transactions/${id}`, dto);
  },
};

export default OtherMaterialTransactionsApi;
