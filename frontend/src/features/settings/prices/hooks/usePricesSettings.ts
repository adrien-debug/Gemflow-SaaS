import type { Dayjs } from "dayjs";
import PriceSettingsApi from "@entities/metal/api/price-settings.api.ts";
import { DateFormat } from "@shared/constants/date-format.ts";
import { PriceSettings } from "@entities/metal/models/price-settings.model.ts";
import { useMutation, useQuery } from "@tanstack/react-query";

const usePricesSettings = (date: Dayjs) => {
  const query = useQuery({
    queryKey: ["priceSettings", date],
    queryFn: () => PriceSettingsApi.getByDate(date.format(DateFormat.YearMonthDay) as DateFormat),
  });

  const mutation = useMutation({
    mutationFn: (prices: PriceSettings) => PriceSettingsApi.updatePrices(prices),
  });

  return { query, mutation };
};

export default usePricesSettings;
