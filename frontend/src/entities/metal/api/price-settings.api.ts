import api from "@shared/api";
import { DateFormat } from "@shared/constants/date-format.ts";
import { generateEmptyPriceModel, PriceSettings } from "@entities/metal/models/price-settings.model.ts";
import { ApiError } from "@shared/types/api-error.type.ts";
import { HttpStatusCode } from "axios";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { BatchUpdateDto } from "@shared/types/batch-update.dto.ts";

const PriceSettingsApi = {
  /**
   * @param {DateFormat} date (only {@link DateFormat.YearMonthDay} supported yet)
   */
  getByDate: async (date: DateFormat): Promise<PriceSettings> => {
    return api.get<PriceSettings>(`/api/v1/settings/price/${date}`).catch((error: ApiError) => {
      if (error.code === HttpStatusCode.NotFound) {
        return generateEmptyPriceModel(date);
      }
      throw error;
    });
  },

  updatePrices: async (prices: PriceSettings): Promise<PriceSettings> => {
    return api.put<PriceSettings>(`/api/v1/settings/price/${prices.updateDate}`, {
      priceMetals: prices.priceMetals.map((p) => ({
        priceMetalNameId: p.priceMetalName.id,
        rate: p.rate,
      })),
      dirhamConversionRate: prices.dirhamConversionRate,
      euroConversionRate: prices.euroConversionRate,
      poundConversionRate: prices.poundConversionRate,
    });
  },

  updatePriceLabels: async (updateDto: BatchUpdateDto<BaseItem>): Promise<BaseItem[]> => {
    return api.put<BaseItem[]>("/api/v1/settings/price-metal-names", updateDto);
  },
};

export default PriceSettingsApi;
