package io.hearstcorporation.atelier.dto.mapper.inventory.alloy;

import io.hearstcorporation.atelier.dto.mapper.administration.SupplierMapper;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloyPurchaseDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloyPurchaseRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloyPurchaseUpdateDto;
import io.hearstcorporation.atelier.model.administration.Supplier;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.inventory.alloy.Alloy;
import io.hearstcorporation.atelier.model.inventory.alloy.AlloyPurchase;
import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.util.Map;
import java.util.Optional;

@UtilityClass
public class AlloyPurchaseMapper {

    public static AlloyPurchaseDto toAlloyPurchaseDto(AlloyPurchase entity, AtelierDownloadFileDto invoice) {
        if (entity == null) {
            return null;
        }
        return AlloyPurchaseDto.builder()
                .id(entity.getId())
                .balanceDate(entity.getBalanceDate())
                .batchWeight(entity.getBatchWeight())
                .batchPrice(entity.getBatchPrice())
                .remainingWeight(entity.getRemainingWeight())
                .remainingPrice(entity.getRemainingPrice())
                .priceGram(entity.getPriceGram())
                .alloy(AlloyMapper.toAlloyDto(entity.getAlloy()))
                .supplier(SupplierMapper.toModelNameDto(entity.getSupplier()))
                .invoice(invoice)
                .build();
    }

    public static AlloyPurchase toAlloyPurchase(AlloyPurchaseRequestDto dto, Alloy alloy, Supplier supplier,
                                                AtelierFile invoice) {
        AlloyPurchase entity = new AlloyPurchase();
        entity.setAlloy(alloy);
        mapAlloyPurchase(entity, dto, dto.getBatchWeight(), supplier, invoice);
        return entity;
    }

    public static void mapAlloyPurchase(AlloyPurchase entity, AlloyPurchaseUpdateDto dto,
                                        BigDecimal newRemainingWeight, Supplier supplier, AtelierFile invoice) {
        entity.setRemainingWeight(newRemainingWeight);
        entity.setBalanceDate(dto.getBalanceDate());
        entity.setBatchWeight(dto.getBatchWeight());
        entity.setPriceGram(dto.getPriceGram());
        entity.setSupplier(supplier);
        entity.setInvoice(invoice);
    }

    public static SearchDto<AlloyPurchaseDto> toAlloyPurchaseDtoPage(Page<AlloyPurchase> alloyPurchasePage,
                                                                     Map<Long, AtelierDownloadFileDto> invoiceMap) {
        return new SearchDto<>(
                alloyPurchasePage.getContent().stream()
                        .map(pmp -> {
                            Long invoiceId = Optional.ofNullable(pmp.getInvoice()).map(AtelierFile::getId).orElse(null);
                            return AlloyPurchaseMapper.toAlloyPurchaseDto(pmp, invoiceMap.get(invoiceId));
                        })
                        .toList(),
                alloyPurchasePage.getNumber(),
                alloyPurchasePage.getSize(),
                alloyPurchasePage.getTotalPages(),
                alloyPurchasePage.getTotalElements()
        );
    }
}
