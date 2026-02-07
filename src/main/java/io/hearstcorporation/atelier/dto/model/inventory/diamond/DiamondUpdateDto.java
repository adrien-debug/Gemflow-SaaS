package io.hearstcorporation.atelier.dto.model.inventory.diamond;

import io.hearstcorporation.atelier.model.inventory.diamond.DiamondColourType;
import io.hearstcorporation.atelier.model.inventory.diamond.DiamondQualityType;
import io.hearstcorporation.atelier.model.inventory.diamond.DiamondType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class DiamondUpdateDto {

    @NotBlank
    @Size(max = 16)
    private DiamondType type;

    @NotBlank
    @Size(max = 8)
    private DiamondColourType colourType;

    @NotBlank
    @Size(max = 256)
    private String parcelName;

    @NotNull
    @Digits(integer = 2, fraction = 2)
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal sizeFrom;

    @NotNull
    @Digits(integer = 2, fraction = 2)
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal sizeTo;

    @NotNull
    private DiamondQualityType qualityType;

    @NotNull
    @Digits(integer = 3, fraction = 4)
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal stoneCarat;

    @NotNull
    @Digits(integer = 10, fraction = 3)
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal stonePrice;

    private LocalDate invoiceDate;

    @NotNull
    private Long diamondShapeId;

    @NotNull
    private Long supplierId;

    private Long invoiceId;
}
