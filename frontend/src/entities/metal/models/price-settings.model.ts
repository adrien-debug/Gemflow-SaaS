import { MetalPrice } from "@entities/metal/models/metal-price.model.ts";

export interface PriceSettings {
  id: number | null;
  updateDate: string;
  priceMetals: MetalPrice[];
  dirhamConversionRate: number;
  euroConversionRate: number;
  poundConversionRate: number;
}

export const generateEmptyPriceModel = (date: string): PriceSettings => ({
  dirhamConversionRate: 0,
  euroConversionRate: 0,
  id: null,
  poundConversionRate: 0,
  priceMetals: [],
  updateDate: date,
});
