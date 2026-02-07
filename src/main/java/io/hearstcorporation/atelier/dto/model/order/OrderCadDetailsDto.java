package io.hearstcorporation.atelier.dto.model.order;

import io.hearstcorporation.atelier.dto.model.ImageDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class OrderCadDetailsDto {

    private Integer stlCount;
    private List<ImageDto> cadImages;
    private List<ImageDto> castingPartsImages;
    private List<ImageDto> diamondMapImages;
}
