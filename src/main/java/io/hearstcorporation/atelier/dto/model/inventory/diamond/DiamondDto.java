package io.hearstcorporation.atelier.dto.model.inventory.diamond;

import io.hearstcorporation.atelier.dto.model.ModelNameDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.dto.model.setting.DiamondShapeDto;
import io.hearstcorporation.atelier.model.inventory.diamond.DiamondColourType;
import io.hearstcorporation.atelier.model.inventory.diamond.DiamondQualityType;
import io.hearstcorporation.atelier.model.inventory.diamond.DiamondType;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Builder
public class DiamondDto {

    private Long id;
    private DiamondType type;
    private DiamondColourType colourType;
    private String parcelName;
    private BigDecimal sizeFrom;
    private BigDecimal sizeTo;
    private String sizeName;
    private DiamondQualityType qualityType;
    private BigDecimal stoneCarat;
    private BigDecimal stonePrice;
    private Integer quantity;
    private BigDecimal caratLeft;
    private BigDecimal totalPrice;
    private LocalDate invoiceDate;
    private DiamondShapeDto diamondShape;
    private ModelNameDto supplier;
    private AtelierDownloadFileDto invoice;
}
