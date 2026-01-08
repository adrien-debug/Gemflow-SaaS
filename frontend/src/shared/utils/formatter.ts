import { Optional } from "@shared/types/optional.type.ts";

export const moneyFormatter = (value: Optional<number> = 0, maximumFractionDigits: Optional<number> = 3) =>
  value?.toLocaleString("en-US", { maximumFractionDigits, minimumFractionDigits: 2 }) || "";
