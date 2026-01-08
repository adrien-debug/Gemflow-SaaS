import { Converter } from "@shared/types/converter.type.ts";
import { TechnicalSheetMetadata } from "@entities/order/models/technical-sheet.model.ts";
import { TechnicalSheetDto } from "@entities/order/dto/update-technical-sheet.dto.ts";

class EditTechnicalSheetConverter implements Converter<TechnicalSheetMetadata, TechnicalSheetDto> {
  convert(from: TechnicalSheetMetadata): TechnicalSheetDto {
    return {
      generalNote: from.generalNote,
      mountingNote1: from.mountingNote1,
      mounting1Images: from.mounting1Images,
      mountingNote2: from.mountingNote2,
      mounting2Images: from.mounting2Images,
      mountingNote3: from.mountingNote3,
      mounting3Images: from.mounting3Images,
      mountingNote4: from.mountingNote4,
      mounting4Images: from.mounting4Images,
      settingNote: from.settingNote,
    };
  }
}
export default new EditTechnicalSheetConverter();
