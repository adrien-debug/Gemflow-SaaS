package io.hearstcorporation.atelier.dto.mapper.inventory.other;

import io.hearstcorporation.atelier.dto.model.ModelNameDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialRequestDto;
import io.hearstcorporation.atelier.model.inventory.other.OtherMaterial;
import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Page;

@UtilityClass
public class OtherMaterialMapper {

    public static OtherMaterialDto toOtherMaterialDto(OtherMaterial entity) {
        if (entity == null) {
            return null;
        }
        return OtherMaterialDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .remainingWeight(entity.getRemainingWeight())
                .build();
    }

    public static OtherMaterial toOtherMaterial(OtherMaterialRequestDto requestDto) {
        OtherMaterial entity = new OtherMaterial();
        map(entity, requestDto);
        return entity;
    }

    public static void map(OtherMaterial entity, OtherMaterialRequestDto dto) {
        entity.setName(dto.getName());
    }

    public static SearchDto<OtherMaterialDto> toOtherMaterialDtoPage(Page<OtherMaterial> result) {
        return new SearchDto<>(
                result.getContent().stream()
                        .map(OtherMaterialMapper::toOtherMaterialDto)
                        .toList(),
                result.getNumber(),
                result.getSize(),
                result.getTotalPages(),
                result.getTotalElements()
        );
    }

    public static ModelNameDto toModelNameDto(OtherMaterial otherMaterial) {
        if (otherMaterial == null) {
            return null;
        }
        return ModelNameDto.builder()
                .id(otherMaterial.getId())
                .name(otherMaterial.getName())
                .build();
    }
}
