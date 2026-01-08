package io.hearstcorporation.atelier.dto.mapper.inventory.alloyedmetal;

import io.hearstcorporation.atelier.dto.mapper.casting.CastingMapper;
import io.hearstcorporation.atelier.dto.mapper.inventory.alloy.AlloyMapper;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalPurchaseDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalPurchaseRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalPurchaseUpdateDto;
import io.hearstcorporation.atelier.model.casting.Casting;
import io.hearstcorporation.atelier.model.inventory.alloy.Alloy;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetal;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetalPurchase;
import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;

@UtilityClass
public class AlloyedMetalPurchaseMapper {

    public static AlloyedMetalPurchaseDto toAlloyedMetalPurchaseDto(AlloyedMetalPurchase entity) {
        if (entity == null) {
            return null;
        }
        return AlloyedMetalPurchaseDto.builder()
                .id(entity.getId())
                .balanceDate(entity.getBalanceDate())
                .batchWeight(entity.getBatchWeight())
                .batchPrice(entity.getBatchPrice())
                .remainingWeight(entity.getRemainingWeight())
                .remainingPrice(entity.getRemainingPrice())
                .priceGram(entity.getPriceGram())
                .castingId(CastingMapper.toCastingId(entity.getCasting()))
                .alloy(AlloyMapper.toModelNameDto(entity.getAlloy()))
                .alloyedMetal(AlloyedMetalMapper.toModelNameDto(entity.getAlloyedMetal()))
                .build();
    }

    public static AlloyedMetalPurchase toAlloyedMetalPurchase(AlloyedMetalPurchaseRequestDto dto, Alloy alloy,
                                                              AlloyedMetal alloyedMetal, Casting casting) {
        AlloyedMetalPurchase entity = new AlloyedMetalPurchase();
        entity.setAlloy(alloy);
        entity.setAlloyedMetal(alloyedMetal);
        entity.setCasting(casting);
        mapAlloyedMetalPurchase(entity, dto, dto.getBatchWeight());
        return entity;
    }

    public static void mapAlloyedMetalPurchase(AlloyedMetalPurchase entity, AlloyedMetalPurchaseUpdateDto dto,
                                               BigDecimal newRemainingWeight) {
        entity.setRemainingWeight(newRemainingWeight);
        entity.setBalanceDate(dto.getBalanceDate());
        entity.setBatchWeight(dto.getBatchWeight());
        entity.setPriceGram(dto.getPriceGram());
    }

    public static SearchDto<AlloyedMetalPurchaseDto> toAlloyedMetalPurchaseDtoPage(Page<AlloyedMetalPurchase> alloyedMetalPurchasePage) {
        return new SearchDto<>(
                alloyedMetalPurchasePage.getContent().stream()
                        .map(AlloyedMetalPurchaseMapper::toAlloyedMetalPurchaseDto)
                        .toList(),
                alloyedMetalPurchasePage.getNumber(),
                alloyedMetalPurchasePage.getSize(),
                alloyedMetalPurchasePage.getTotalPages(),
                alloyedMetalPurchasePage.getTotalElements()
        );
    }
}
