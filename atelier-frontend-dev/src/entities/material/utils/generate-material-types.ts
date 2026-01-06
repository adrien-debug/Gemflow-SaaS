import { MaterialType, materialTypeNameMap } from "@entities/material/constants/material-type.enum.ts";
import { MaterialTypeItem } from "@entities/other-material/model/other-material-type-item.model.ts";

export const generateMaterialTypes = (): MaterialTypeItem[] => {
  return Object.values(MaterialType).map((material) => ({
    id: material,
    name: materialTypeNameMap[material],
  }));
};
