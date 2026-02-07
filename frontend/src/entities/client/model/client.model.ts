import { Country } from "@entities/country/model/country.model";
import { Currency } from "@entities/currency/model/currency.model";

export interface Client {
  id: number;
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  vatNumber: string;
  country: Country;
  currency: Currency;
}
