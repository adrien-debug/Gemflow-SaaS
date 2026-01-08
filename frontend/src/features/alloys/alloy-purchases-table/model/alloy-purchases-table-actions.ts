import { AlloyPurchase } from "@entities/alloy/models/alloy-purchase.model.ts";

export interface AlloyPurchasesTableActions {
  delete: (purchase: AlloyPurchase) => void;
  edit: (purchase: AlloyPurchase) => void;
}
