package io.hearstcorporation.atelier.dto.mapper.inventory.other;

import io.hearstcorporation.atelier.dto.mapper.order.OrderMapper;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialTransactionDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialTransactionRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialTransactionUpdateDto;
import io.hearstcorporation.atelier.model.inventory.other.OtherMaterial;
import io.hearstcorporation.atelier.model.inventory.other.OtherMaterialTransaction;
import io.hearstcorporation.atelier.model.order.Order;
import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Page;

@UtilityClass
public class OtherMaterialTransactionMapper {

    public static OtherMaterialTransactionDto toOtherMaterialTransactionDto(OtherMaterialTransaction entity) {
        if (entity == null) {
            return null;
        }
        return OtherMaterialTransactionDto.builder()
                .id(entity.getId())
                .balanceDate(entity.getBalanceDate())
                .description(entity.getDescription())
                .batchWeight(entity.getBatchWeight())
                .order(OrderMapper.toModelNameDto(entity.getOrder()))
                .otherMaterial(OtherMaterialMapper.toOtherMaterialDto(entity.getOtherMaterial()))
                .build();
    }

    public static OtherMaterialTransaction toOtherMaterialTransaction(OtherMaterialTransactionRequestDto dto, Order order,
                                                                      OtherMaterial otherMaterial) {
        OtherMaterialTransaction entity = new OtherMaterialTransaction();
        entity.setBalanceDate(dto.getBalanceDate());
        entity.setBatchWeight(dto.getBatchWeight());
        entity.setOtherMaterial(otherMaterial);
        entity.setOrder(order);
        mapOtherMaterialTransaction(entity, dto);
        return entity;
    }

    public static void mapOtherMaterialTransaction(OtherMaterialTransaction entity, OtherMaterialTransactionUpdateDto dto) {
        entity.setDescription(dto.getDescription());
    }

    public static SearchDto<OtherMaterialTransactionDto> toOtherMaterialTransactionDtoPage(Page<OtherMaterialTransaction> otherMaterialTransactionPage) {
        return new SearchDto<>(
                otherMaterialTransactionPage.getContent().stream()
                        .map(OtherMaterialTransactionMapper::toOtherMaterialTransactionDto)
                        .toList(),
                otherMaterialTransactionPage.getNumber(),
                otherMaterialTransactionPage.getSize(),
                otherMaterialTransactionPage.getTotalPages(),
                otherMaterialTransactionPage.getTotalElements()
        );
    }
}
