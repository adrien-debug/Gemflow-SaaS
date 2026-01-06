import { PureMetalPurchase } from "@entities/metal/models/pure-metal-purchase.model.ts";

export interface PureMetalPurchasesTableActions {
  delete: (purchase: PureMetalPurchase) => void;
  edit: (purchase: PureMetalPurchase) => void;
}
