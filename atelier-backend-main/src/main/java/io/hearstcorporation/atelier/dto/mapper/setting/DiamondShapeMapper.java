package io.hearstcorporation.atelier.dto.mapper.setting;

import io.hearstcorporation.atelier.dto.model.ModelNameDto;
import io.hearstcorporation.atelier.dto.model.setting.DiamondShapeDto;
import io.hearstcorporation.atelier.dto.model.setting.DiamondShapeRequestDto;
import io.hearstcorporation.atelier.model.setting.DiamondShape;
import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class DiamondShapeMapper {

    public static List<DiamondShapeDto> toDiamondShapeDtoList(List<DiamondShape> diamondShapes) {
        return diamondShapes.stream()
                .map(DiamondShapeMapper::toDiamondShapeDto)
                .collect(Collectors.toList());
    }

    public static DiamondShapeDto toDiamondShapeDto(DiamondShape entity) {
        if (entity == null) {
            return null;
        }
        return DiamondShapeDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .build();
    }

    public static void mapDiamondShape(DiamondShape entity, DiamondShapeRequestDto dto) {
        entity.setName(dto.getName());
    }

    public static ModelNameDto toModelNameDto(DiamondShape diamondShape) {
        if (diamondShape == null) {
            return null;
        }
        return ModelNameDto.builder()
                .id(diamondShape.getId())
                .name(diamondShape.getName())
                .build();
    }
}
