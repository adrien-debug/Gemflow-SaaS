import { SetOrderMetalWeightOutDto } from "@entities/order/dto/set-order-metal-weight-out.dto.ts";
import { WeightOutFormSchema } from "@features/metals-usage/weight-out-form/models/weight-out-form.model.ts";
import { Converter } from "@shared/types/converter.type";

class SetMetalWeightOutDtoConverter implements Converter<WeightOutFormSchema, SetOrderMetalWeightOutDto> {
  convert(from: WeightOutFormSchema): SetOrderMetalWeightOutDto {
    return {
      weightOut: from.totalWeight,
    };
  }
}

export default new SetMetalWeightOutDtoConverter();
