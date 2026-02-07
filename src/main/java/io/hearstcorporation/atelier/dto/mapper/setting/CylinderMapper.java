package io.hearstcorporation.atelier.dto.mapper.setting;

import io.hearstcorporation.atelier.dto.model.ModelNameDto;
import io.hearstcorporation.atelier.dto.model.setting.CylinderDto;
import io.hearstcorporation.atelier.dto.model.setting.CylinderRequestDto;
import io.hearstcorporation.atelier.model.setting.Cylinder;
import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class CylinderMapper {

    public static List<CylinderDto> toCylinderDtoList(List<Cylinder> cylinders) {
        return cylinders.stream()
                .map(CylinderMapper::toCylinderDto)
                .collect(Collectors.toList());
    }

    public static CylinderDto toCylinderDto(Cylinder entity) {
        if (entity == null) {
            return null;
        }
        return CylinderDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .metal(MetalMapper.toMetalDto(entity.getMetal()))
                .open(entity.getOpen())
                .build();
    }

    public static ModelNameDto toModelNameDto(Cylinder entity) {
        if (entity == null) {
            return null;
        }
        return ModelNameDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .build();
    }

    public static void mapCylinder(Cylinder entity, CylinderRequestDto dto) {
        entity.setName(dto.getName());
    }
}
