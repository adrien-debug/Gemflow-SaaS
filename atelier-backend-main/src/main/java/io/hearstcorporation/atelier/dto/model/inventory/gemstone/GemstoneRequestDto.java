package io.hearstcorporation.atelier.dto.model.inventory.gemstone;

import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.dto.validation.ImageList;
import io.hearstcorporation.atelier.model.inventory.gemstone.GemstoneOwnerType;
import io.hearstcorporation.atelier.model.inventory.gemstone.GemstoneType;
import io.hearstcorporation.atelier.model.inventory.gemstone.MethodType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class GemstoneRequestDto {

    @NotBlank
    @Size(max = 16)
    private GemstoneType type;

    @NotBlank
    @Size(max = 256)
    private String name;

    @Size(max = 64)
    private String certificate;

    @Size(max = 1500)
    private String description;

    @NotNull
    @Min(value = 1)
    private Integer numberOfGems;

    @NotNull
    @Digits(integer = 3, fraction = 5)
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal totalWeight;

    @Size(max = 1500)
    private String comment;

    @Digits(integer = 10, fraction = 3)
    @DecimalMin(value = "0.0")
    private BigDecimal stonePrice;

    @Digits(integer = 10, fraction = 3)
    @DecimalMin(value = "0.0")
    private BigDecimal pricePerCarat;

    @NotNull
    private Boolean customsDutyPriceActive;

    @NotNull
    private Boolean vatPriceActive;

    @NotNull
    private Boolean tenPercentsPriceActive;

    @Digits(integer = 10, fraction = 3)
    @DecimalMin(value = "0.0")
    private BigDecimal certificateCost;

    @Digits(integer = 10, fraction = 3)
    @DecimalMin(value = "0.0")
    private BigDecimal shipment;

    @NotNull
    private MethodType methodType;

    @NotNull
    private Long supplierId;

    @NotNull
    private Long locationId;

    @Valid
    @ImageList
    private List<@NotNull ImageRequestDto> gemstoneImages;

    private LocalDate invoiceDate;

    @NotNull
    private GemstoneOwnerType ownerType;

    private Long invoiceId;
}
