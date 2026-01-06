package io.hearstcorporation.atelier.dto.model.administration;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class SupplierRequestDto {

    @NotBlank
    @Size(max = 256)
    private String name;

    @Email
    @Size(max = 256)
    private String email;

    @Size(max = 256)
    private String address;

    @Size(max = 128)
    private String city;

    @Size(max = 16)
    private String postalCode;

    @Size(max = 16)
    private String vatNumber;

    @Digits(integer = 3, fraction = 2)
    @DecimalMin(value = "0.0")
    private BigDecimal markupPercentage;

    @NotNull
    private Long supplyTypeId;

    private Long countryId;

    private Long currencyId;
}
