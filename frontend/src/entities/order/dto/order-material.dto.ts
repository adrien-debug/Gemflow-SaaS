import { Nullable } from "@shared/types/nullable.type.ts";

export interface OrderMaterialDto {
  id?: Nullable<number>;
  materialMetalId: Nullable<number>;
  clawMetalId: Nullable<number>;
  hallmarkLogoId?: Nullable<number>;
}
