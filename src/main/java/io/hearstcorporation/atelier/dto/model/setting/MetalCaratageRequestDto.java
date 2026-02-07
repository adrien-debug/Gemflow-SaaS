package io.hearstcorporation.atelier.dto.model.setting;

import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class MetalCaratageRequestDto {

    @NotBlank
    @Size(max = 256)
    private String name;

    @NotNull
    private Long priceMetalNameId;

    @NotNull
    @Digits(integer = 2, fraction = 2)
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal waxCastingValue;

    @Valid
    @NotNull
    @Size(min = 1)
    private List<@NotNull Long> metalIds;

    @Valid
    private BatchUpdateDto<MetalPurityUpdateInBatchDto, Long> metalPurities;
}
