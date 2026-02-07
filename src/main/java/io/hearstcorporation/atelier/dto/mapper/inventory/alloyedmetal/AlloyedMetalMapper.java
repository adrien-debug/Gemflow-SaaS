package io.hearstcorporation.atelier.dto.mapper.inventory.alloyedmetal;

import io.hearstcorporation.atelier.dto.mapper.setting.MetalMapper;
import io.hearstcorporation.atelier.dto.mapper.setting.MetalPurityMapper;
import io.hearstcorporation.atelier.dto.model.ModelNameDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalUpdateDto;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetal;
import io.hearstcorporation.atelier.model.setting.Metal;
import io.hearstcorporation.atelier.model.setting.MetalPurity;
import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Page;

@UtilityClass
public class AlloyedMetalMapper {

    public static AlloyedMetalDto toAlloyedMetalDto(AlloyedMetal entity) {
        if (entity == null) {
            return null;
        }
        return AlloyedMetalDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .totalCost(entity.getTotalCost())
                .remainingWeight(entity.getRemainingWeight())
                .metal(MetalMapper.toMetalDto(entity.getMetal()))
                .metalPurity(MetalPurityMapper.toMetalPurityDto(entity.getMetalPurity()))
                .build();
    }

    public static AlloyedMetal toAlloyedMetal(AlloyedMetalRequestDto dto, Metal metal, MetalPurity metalPurity) {
        AlloyedMetal entity = new AlloyedMetal();
        entity.setMetal(metal);
        entity.setMetalPurity(metalPurity);
        map(entity, dto);
        return entity;
    }

    public static void map(AlloyedMetal entity, AlloyedMetalUpdateDto dto) {
        entity.setName(dto.getName());
    }

    public static SearchDto<AlloyedMetalDto> toAlloyedMetalDtoPage(Page<AlloyedMetal> result) {
        return new SearchDto<>(
                result.getContent().stream()
                        .map(AlloyedMetalMapper::toAlloyedMetalDto)
                        .toList(),
                result.getNumber(),
                result.getSize(),
                result.getTotalPages(),
                result.getTotalElements()
        );
    }

    public static ModelNameDto toModelNameDto(AlloyedMetal entity) {
        if (entity == null) {
            return null;
        }
        return ModelNameDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .build();
    }
}
