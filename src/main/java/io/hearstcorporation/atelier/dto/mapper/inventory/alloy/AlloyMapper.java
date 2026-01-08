package io.hearstcorporation.atelier.dto.mapper.inventory.alloy;

import io.hearstcorporation.atelier.dto.mapper.setting.MetalMapper;
import io.hearstcorporation.atelier.dto.model.ModelNameDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloyDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloyRequestDto;
import io.hearstcorporation.atelier.model.inventory.alloy.Alloy;
import io.hearstcorporation.atelier.model.setting.Metal;
import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Page;

@UtilityClass
public class AlloyMapper {

    public static AlloyDto toAlloyDto(Alloy entity) {
        if (entity == null) {
            return null;
        }
        return AlloyDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .totalCost(entity.getTotalCost())
                .remainingWeight(entity.getRemainingWeight())
                .metal(MetalMapper.toMetalDto(entity.getMetal()))
                .build();
    }

    public static Alloy toAlloy(AlloyRequestDto requestDto, Metal metal) {
        Alloy entity = new Alloy();
        map(entity, requestDto, metal);
        return entity;
    }

    public static void map(Alloy entity, AlloyRequestDto dto, Metal metal) {
        entity.setName(dto.getName());
        entity.setMetal(metal);
    }

    public static SearchDto<AlloyDto> toAlloyDtoPage(Page<Alloy> result) {
        return new SearchDto<>(
                result.getContent().stream()
                        .map(AlloyMapper::toAlloyDto)
                        .toList(),
                result.getNumber(),
                result.getSize(),
                result.getTotalPages(),
                result.getTotalElements()
        );
    }

    public static ModelNameDto toModelNameDto(Alloy entity) {
        if (entity == null) {
            return null;
        }
        return ModelNameDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .build();
    }
}
