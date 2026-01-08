package io.hearstcorporation.atelier.dto.mapper.inventory.diamond;

import io.hearstcorporation.atelier.dto.mapper.administration.SupplierMapper;
import io.hearstcorporation.atelier.dto.mapper.setting.DiamondShapeMapper;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.dto.model.inventory.diamond.DiamondDto;
import io.hearstcorporation.atelier.dto.model.inventory.diamond.DiamondRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.diamond.DiamondUpdateDto;
import io.hearstcorporation.atelier.model.administration.Supplier;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.inventory.diamond.Diamond;
import io.hearstcorporation.atelier.model.setting.DiamondShape;
import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.util.Map;
import java.util.Optional;

@UtilityClass
public class DiamondMapper {

    public static DiamondDto toDiamondDto(Diamond entity, AtelierDownloadFileDto invoice) {
        if (entity == null) {
            return null;
        }
        Supplier supplier = entity.getSupplier();
        return DiamondDto.builder()
                .id(entity.getId())
                .type(entity.getType())
                .colourType(entity.getColourType())
                .parcelName(entity.getParcelName())
                .sizeFrom(entity.getSizeFrom())
                .sizeTo(entity.getSizeTo())
                .sizeName(entity.getSizeName())
                .qualityType(entity.getQualityType())
                .stoneCarat(entity.getStoneCarat())
                .stonePrice(entity.getStonePrice())
                .quantity(entity.getQuantity())
                .caratLeft(entity.getCaratLeft())
                .totalPrice(entity.getTotalPrice())
                .invoiceDate(entity.getInvoiceDate())
                .diamondShape(DiamondShapeMapper.toDiamondShapeDto(entity.getDiamondShape()))
                .supplier(SupplierMapper.toModelNameDto(supplier))
                .invoice(invoice)
                .build();
    }

    public static Diamond toDiamond(DiamondRequestDto dto, DiamondShape diamondShape,
                                    Supplier supplier, AtelierFile invoice) {
        Diamond entity = new Diamond();
        mapDiamond(entity, dto, diamondShape, supplier, invoice);
        return entity;
    }

    public static void mapUpdateDiamond(Diamond entity, DiamondUpdateDto dto,
                                        DiamondShape diamondShape, Supplier supplier, AtelierFile invoice) {
        entity.setType(dto.getType());
        entity.setColourType(dto.getColourType());
        entity.setParcelName(dto.getParcelName());
        entity.setSizeTo(dto.getSizeTo());
        entity.setSizeFrom(dto.getSizeFrom());
        entity.setQualityType(dto.getQualityType());
        entity.setStoneCarat(dto.getStoneCarat());
        entity.setStonePrice(dto.getStonePrice());
        entity.setInvoiceDate(dto.getInvoiceDate());
        entity.setDiamondShape(diamondShape);
        entity.setSupplier(supplier);
        entity.setInvoice(invoice);
    }

    public static void mapDiamond(Diamond entity, DiamondRequestDto dto,
                                  DiamondShape diamondShape, Supplier supplier, AtelierFile invoice) {
        mapUpdateDiamond(entity, dto, diamondShape, supplier, invoice);
        entity.setQuantity(dto.getQuantity());
    }

    public static SearchDto<DiamondDto> toDiamondDtoPage(Page<Diamond> diamondPage, Map<Long, AtelierDownloadFileDto> invoiceMap) {
        return new SearchDto<>(
                diamondPage.getContent().stream()
                        .map(diamond -> {
                            Long invoiceId = Optional.ofNullable(diamond.getInvoice()).map(AtelierFile::getId).orElse(null);
                            return DiamondMapper.toDiamondDto(diamond, invoiceMap.get(invoiceId));
                        })
                        .toList(),
                diamondPage.getNumber(),
                diamondPage.getSize(),
                diamondPage.getTotalPages(),
                diamondPage.getTotalElements()
        );
    }

    public static BigDecimal toSupplierMarkupPercentage(Diamond diamond) {
        if (diamond == null) {
            return null;
        }
        return SupplierMapper.toMarkupPercentage(diamond.getSupplier());
    }
}
