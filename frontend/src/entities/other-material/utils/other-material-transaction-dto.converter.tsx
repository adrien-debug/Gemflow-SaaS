import { CreateOtherMaterialTransactionDto } from "@entities/other-material/dto/create-other-material-transaction.dto.ts";
import { OtherMaterialTransactionSchema } from "@features/other-materials/other-material-transaction-form/models/other-material-transaction.schema.ts";
import { DateFormat } from "@shared/constants/date-format.ts";
import { Converter } from "@shared/types/converter.type.ts";

class OtherMaterialTransactionFormConverter
  implements Converter<OtherMaterialTransactionSchema & { otherMaterialId: number }, CreateOtherMaterialTransactionDto>
{
  convert(from: OtherMaterialTransactionSchema & { otherMaterialId: number }): CreateOtherMaterialTransactionDto {
    return {
      otherMaterialId: from.otherMaterialId,
      description: from.description,
      balanceDate: from.balanceDate?.format(DateFormat.YearMonthDay),
      batchWeight: from.batchWeight,
    };
  }
}

export default new OtherMaterialTransactionFormConverter();
