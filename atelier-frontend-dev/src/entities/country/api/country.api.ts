import api from "@shared/api";
import { Country } from "@entities/country/model/country.model";

const CountryApi = {
  getCountries: async (): Promise<Country[]> => {
    return api.get("/api/v1/countries");
  },
};

export default CountryApi;
