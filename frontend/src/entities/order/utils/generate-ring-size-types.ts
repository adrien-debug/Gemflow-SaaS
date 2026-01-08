import { RingSizeType, ringSizeTypeNameMap } from "@entities/order/constants/ring-size.enum.ts";
import { RingSizeTypeItem } from "@entities/order/models/ring-size-type-item.model.ts";

export const generateRingSizeTypes = (): RingSizeTypeItem[] => {
  return Object.values(RingSizeType).map((status) => ({
    id: status,
    name: ringSizeTypeNameMap[status],
  }));
};
