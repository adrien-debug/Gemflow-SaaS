package io.hearstcorporation.atelier.dto.mapper.setting;

import io.hearstcorporation.atelier.dto.model.setting.MetalCaratageDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalCaratageUpdateInBatchDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalPurityDto;
import io.hearstcorporation.atelier.model.setting.MetalCaratage;
import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.Map;

@UtilityClass
public class MetalCaratageMapper {

    public static MetalCaratageDto toMetalCaratageDto(MetalCaratage entity, List<MetalDto> metals,
                                                      List<MetalPurityDto> metalPurities) {
        if (entity == null) {
            return null;
        }
        return MetalCaratageDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .priceMetalName(PriceMetalNameMapper.toPriceMetalNameDto(entity.getPriceMetalName()))
                .waxCastingValue(entity.getWaxCastingValue())
                .metals(metals)
                .metalPurities(metalPurities)
                .build();
    }

    public static List<MetalCaratageDto> toMetalCaratageDtoList(List<MetalCaratage> entities,
                                                                Map<Long, List<MetalDto>> metalDtoListGroupedByMetalCaratageId,
                                                                Map<Long, List<MetalPurityDto>> metalPurityDtoListGroupedByMetalCaratageId) {
        return entities.stream()
                .map(entity -> toMetalCaratageDto(entity,
                        metalDtoListGroupedByMetalCaratageId.getOrDefault(entity.getId(), List.of()),
                        metalPurityDtoListGroupedByMetalCaratageId.getOrDefault(entity.getId(), List.of())))
                .toList();
    }

    public static void mapMetalCaratage(MetalCaratage metalCaratage, MetalCaratageUpdateInBatchDto body) {
        metalCaratage.setName(body.getName());
        metalCaratage.setWaxCastingValue(body.getWaxCastingValue());
    }
}
