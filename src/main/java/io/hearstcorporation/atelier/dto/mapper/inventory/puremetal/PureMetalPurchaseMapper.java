package io.hearstcorporation.atelier.dto.mapper.inventory.puremetal;

import io.hearstcorporation.atelier.dto.mapper.administration.SupplierMapper;
import io.hearstcorporation.atelier.dto.mapper.setting.PriceMetalNameMapper;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.dto.model.inventory.puremetal.PureMetalPurchaseDto;
import io.hearstcorporation.atelier.dto.model.inventory.puremetal.PureMetalPurchaseRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.puremetal.PureMetalPurchaseUpdateDto;
import io.hearstcorporation.atelier.model.administration.Supplier;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.inventory.puremetal.PureMetalPurchase;
import io.hearstcorporation.atelier.model.setting.PriceMetalName;
import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.util.Map;
import java.util.Optional;

@UtilityClass
public class PureMetalPurchaseMapper {

    public static PureMetalPurchaseDto toPureMetalPurchaseDto(PureMetalPurchase entity, AtelierDownloadFileDto invoice) {
        if (entity == null) {
            return null;
        }
        return PureMetalPurchaseDto.builder()
                .id(entity.getId())
                .coc(entity.getCoc())
                .barNumber(entity.getBarNumber())
                .balanceDate(entity.getBalanceDate())
                .batchWeight(entity.getBatchWeight())
                .batchPrice(entity.getBatchPrice())
                .remainingWeight(entity.getRemainingWeight())
                .remainingPrice(entity.getRemainingPrice())
                .priceGram(entity.getPriceGram())
                .priceMetalName(PriceMetalNameMapper.toPriceMetalNameDto(entity.getPriceMetalName()))
                .supplier(SupplierMapper.toModelNameDto(entity.getSupplier()))
                .invoice(invoice)
                .build();
    }

    public static PureMetalPurchase toPureMetalPurchase(PureMetalPurchaseRequestDto dto, PriceMetalName priceMetalName,
                                                        Supplier supplier, AtelierFile invoice) {
        PureMetalPurchase entity = new PureMetalPurchase();
        entity.setPriceMetalName(priceMetalName);
        mapPureMetalPurchase(entity, dto, dto.getBatchWeight(), supplier, invoice);
        return entity;
    }

    public static void mapPureMetalPurchase(PureMetalPurchase entity, PureMetalPurchaseUpdateDto dto,
                                            BigDecimal newRemainingWeight, Supplier supplier, AtelierFile invoice) {
        entity.setRemainingWeight(newRemainingWeight);
        entity.setCoc(dto.getCoc());
        entity.setBarNumber(dto.getBarNumber());
        entity.setBalanceDate(dto.getBalanceDate());
        entity.setBatchWeight(dto.getBatchWeight());
        entity.setPriceGram(dto.getPriceGram());
        entity.setSupplier(supplier);
        entity.setInvoice(invoice);
    }

    public static SearchDto<PureMetalPurchaseDto> toPureMetalPurchaseDtoPage(Page<PureMetalPurchase> pureMetalPurchasePage,
                                                                             Map<Long, AtelierDownloadFileDto> invoiceMap) {
        return new SearchDto<>(
                pureMetalPurchasePage.getContent().stream()
                        .map(pmp -> {
                            Long invoiceId = Optional.ofNullable(pmp.getInvoice()).map(AtelierFile::getId).orElse(null);
                            return PureMetalPurchaseMapper.toPureMetalPurchaseDto(pmp, invoiceMap.get(invoiceId));
                        })
                        .toList(),
                pureMetalPurchasePage.getNumber(),
                pureMetalPurchasePage.getSize(),
                pureMetalPurchasePage.getTotalPages(),
                pureMetalPurchasePage.getTotalElements()
        );
    }
}
