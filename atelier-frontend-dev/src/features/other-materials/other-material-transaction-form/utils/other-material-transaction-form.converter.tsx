import { OtherMaterialTransaction } from "@entities/other-material/model/other-material-transaction.model.ts";
import { OtherMaterialTransactionSchema } from "@features/other-materials/other-material-transaction-form/models/other-material-transaction.schema.ts";
import { Converter } from "@shared/types/converter.type.ts";
import dayjs from "dayjs";

class OtherMaterialTransactionFormConverter
  implements Converter<OtherMaterialTransaction, OtherMaterialTransactionSchema>
{
  convert(from: OtherMaterialTransaction): OtherMaterialTransactionSchema {
    return {
      description: from.description,
      balanceDate: dayjs(from.balanceDate),
      batchWeight: from.batchWeight,
    };
  }
}

export default new OtherMaterialTransactionFormConverter();
