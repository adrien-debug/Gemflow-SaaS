import { GemstoneMethodType } from "@entities/gemstone/constants/gemstone-method-type.enum.ts";
import { ImageMetadata } from "@shared/types/image-metadata.ts";
import { BaseItem } from "@shared/types/base-item.type";
import { GemstoneStatus } from "@entities/gemstone/constants/gemstone-status.enum";
import { UserNameMetadata } from "@entities/user/models/user-name.model.ts";

export interface Gemstone {
  id: number;
  name: string;
  certificate: string;
  description: string;
  numberOfGems: number;
  createdAt: string;
  createdBy: UserNameMetadata;
  totalWeight: number;
  comment: string;
  stonePrice: number;
  pricePerCarat: number;
  customsDutyPriceActive: boolean;
  customsDutyPrice: number;
  vatPriceActive: boolean;
  vatPrice: number;
  tenPercentsPriceActive: boolean;
  tenPercentsPrice: number;
  certificateCost: number;
  shipment: number;
  totalCost: number;
  status: GemstoneStatus;
  methodType: GemstoneMethodType;
  paymentStatus: BaseItem;
  supplier: BaseItem;
  location: BaseItem;
  gemstoneImages: ImageMetadata[];
  order: BaseItem;
}
