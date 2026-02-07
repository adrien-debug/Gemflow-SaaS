import api from "@shared/api";
import { Currency } from "@entities/currency/model/currency.model";

const CurrencyApi = {
  getCurrencies: async (): Promise<Currency[]> => {
    return api.get("/api/v1/currencies");
  },
};

export default CurrencyApi;
