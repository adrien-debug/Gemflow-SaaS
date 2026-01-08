import { Country } from "@entities/country/model/country.model";
import { Currency } from "@entities/currency/model/currency.model";
import { SupplyType } from "@entities/supply-types/model/supply-type.model";

export interface Supplier {
  id: number;
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  vatNumber: string;
  supplyType: SupplyType;
  country: Country;
  currency: Currency;
  markup: number;
}
