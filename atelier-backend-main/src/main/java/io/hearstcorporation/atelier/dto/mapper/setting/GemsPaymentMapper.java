package io.hearstcorporation.atelier.dto.mapper.setting;

import io.hearstcorporation.atelier.dto.model.setting.GemsPaymentDto;
import io.hearstcorporation.atelier.dto.model.setting.GemsPaymentRequestDto;
import io.hearstcorporation.atelier.model.setting.GemsPayment;
import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class GemsPaymentMapper {

    public static List<GemsPaymentDto> toGemsPaymentDtoList(List<GemsPayment> gemsPayments) {
        return gemsPayments.stream()
                .map(GemsPaymentMapper::toGemsPaymentDto)
                .collect(Collectors.toList());
    }

    public static GemsPaymentDto toGemsPaymentDto(GemsPayment entity) {
        if (entity == null) {
            return null;
        }
        return GemsPaymentDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .build();
    }

    public static void mapGemsPayment(GemsPayment entity, GemsPaymentRequestDto dto) {
        entity.setName(dto.getName());
    }
}
