package io.hearstcorporation.atelier.dto.mapper.inventory.gemstone;

import io.hearstcorporation.atelier.dto.mapper.administration.SupplierMapper;
import io.hearstcorporation.atelier.dto.mapper.order.OrderMapper;
import io.hearstcorporation.atelier.dto.mapper.setting.GemsPaymentMapper;
import io.hearstcorporation.atelier.dto.mapper.setting.LocationMapper;
import io.hearstcorporation.atelier.dto.mapper.user.UserMapper;
import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.dto.model.inventory.gemstone.GemstoneDto;
import io.hearstcorporation.atelier.dto.model.inventory.gemstone.GemstoneRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.gemstone.GemstoneShortDto;
import io.hearstcorporation.atelier.model.administration.Supplier;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.inventory.gemstone.Gemstone;
import io.hearstcorporation.atelier.model.inventory.gemstone.MethodType;
import io.hearstcorporation.atelier.model.setting.Location;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@UtilityClass
public class GemstoneMapper {

    public static GemstoneDto toGemstoneDto(Gemstone entity, List<ImageDto> gemstoneImages,
                                            AtelierDownloadFileDto invoice) {
        if (entity == null) {
            return null;
        }
        return GemstoneDto.builder()
                .id(entity.getId())
                .createdAt(entity.getCreatedAt())
                .type(entity.getType())
                .name(entity.getName())
                .certificate(entity.getCertificate())
                .description(entity.getDescription())
                .numberOfGems(entity.getNumberOfGems())
                .totalWeight(entity.getTotalWeight())
                .comment(entity.getComment())
                .stonePrice(entity.getStonePrice())
                .pricePerCarat(entity.getPricePerCarat())
                .customsDutyPriceActive(entity.getCustomsDutyPriceActive())
                .customsDutyPrice(entity.getCustomsDutyPrice())
                .vatPriceActive(entity.getVatPriceActive())
                .vatPrice(entity.getVatPrice())
                .tenPercentsPriceActive(entity.getTenPercentsPriceActive())
                .tenPercentsPrice(entity.getTenPercentsPrice())
                .certificateCost(entity.getCertificateCost())
                .shipment(entity.getShipment())
                .totalCost(entity.getTotalCost())
                .methodType(entity.getMethodType())
                .status(entity.getStatus())
                .paymentStatus(GemsPaymentMapper.toGemsPaymentDto(entity.getPaymentStatus()))
                .invoiceDate(entity.getInvoiceDate())
                .ownerType(entity.getOwnerType())
                .supplier(SupplierMapper.toModelNameDto(entity.getSupplier()))
                .location(LocationMapper.toLocationDto(entity.getLocation()))
                .gemstoneImages(gemstoneImages)
                .order(entity.getOrder() != null ? OrderMapper.toModelNameDto(entity.getOrder()) : null)
                .createdBy(UserMapper.toUserShortDto(entity.getCreatedBy()))
                .invoice(invoice)
                .build();
    }

    public static SearchDto<GemstoneDto> toGemstoneListDtoPage(Page<Gemstone> gemstonePage,
                                                               Map<Long, List<ImageDto>> gemstoneImages,
                                                               Map<Long, AtelierDownloadFileDto> invoiceMap) {
        return new SearchDto<>(
                gemstonePage.getContent().stream()
                        .map(gemstone -> {
                            Long invoiceId = Optional.ofNullable(gemstone.getInvoice()).map(AtelierFile::getId).orElse(null);
                            return GemstoneMapper.toGemstoneDto(gemstone, gemstoneImages.get(gemstone.getId()), invoiceMap.get(invoiceId));
                        })
                        .toList(),
                gemstonePage.getNumber(),
                gemstonePage.getSize(),
                gemstonePage.getTotalPages(),
                gemstonePage.getTotalElements()
        );
    }

    public static Gemstone toGemstone(GemstoneRequestDto requestDto, Supplier supplier, Location location,
                                      AtelierFile invoice) {
        Gemstone gemstone = new Gemstone();
        mapGemstone(gemstone, requestDto, supplier, location, invoice);
        return gemstone;
    }

    public static void mapGemstone(Gemstone gemstone, GemstoneRequestDto requestDto,
                                   Supplier supplier, Location location, AtelierFile invoice) {
        gemstone.setType(requestDto.getType());
        gemstone.setName(requestDto.getName());
        gemstone.setCertificate(requestDto.getCertificate());
        gemstone.setDescription(requestDto.getDescription());
        gemstone.setNumberOfGems(requestDto.getNumberOfGems());
        gemstone.setTotalWeight(requestDto.getTotalWeight());
        gemstone.setComment(requestDto.getComment());

        gemstone.setMethodType(requestDto.getMethodType());
        gemstone.setPricePerCarat(requestDto.getPricePerCarat());
        if (requestDto.getMethodType() == MethodType.WEIGHT) {
            gemstone.setStonePrice(requestDto.getTotalWeight().multiply(requestDto.getPricePerCarat()));
        } else {
            gemstone.setStonePrice(requestDto.getStonePrice());
        }
        BigDecimal stonePrice = gemstone.getStonePrice();

        boolean customsDutyPriceActive = requestDto.getCustomsDutyPriceActive();
        gemstone.setCustomsDutyPriceActive(customsDutyPriceActive);
        gemstone.setCustomsDutyPrice(calcGeneratedPrices(stonePrice, Gemstone.CUSTOM_DUTY_PERCENTAGE, customsDutyPriceActive));

        boolean vatPriceActive = requestDto.getVatPriceActive();
        gemstone.setVatPriceActive(vatPriceActive);
        gemstone.setVatPrice(calcGeneratedPrices(stonePrice, Gemstone.VAT_PERCENTAGE, vatPriceActive));

        boolean tenPercentsPriceActive = requestDto.getTenPercentsPriceActive();
        gemstone.setTenPercentsPriceActive(tenPercentsPriceActive);
        gemstone.setTenPercentsPrice(calcGeneratedPrices(stonePrice, Gemstone.TEN_PERCENTAGE, tenPercentsPriceActive));

        BigDecimal certificateCost = requestDto.getCertificateCost();
        gemstone.setCertificateCost(ObjectUtils.defaultIfNull(certificateCost, BigDecimal.ZERO));
        BigDecimal shipment = requestDto.getShipment();
        gemstone.setShipment(ObjectUtils.defaultIfNull(shipment, BigDecimal.ZERO));

        gemstone.setInvoiceDate(requestDto.getInvoiceDate());
        gemstone.setOwnerType(requestDto.getOwnerType());
        gemstone.setSupplier(supplier);
        gemstone.setLocation(location);
        gemstone.setInvoice(invoice);
    }

    public static GemstoneShortDto toGemstoneShortDto(Gemstone entity) {
        if (entity == null) {
            return null;
        }
        return GemstoneShortDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .certificate(entity.getCertificate())
                .build();
    }

    private static BigDecimal calcGeneratedPrices(BigDecimal price, BigDecimal multiplier, boolean active) {
        return active ? price.multiply(multiplier) : BigDecimal.ZERO;
    }
}
