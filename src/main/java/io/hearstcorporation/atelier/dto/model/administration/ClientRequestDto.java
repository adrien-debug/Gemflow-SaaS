package io.hearstcorporation.atelier.dto.model.administration;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientRequestDto {

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

    private Long countryId;

    private Long currencyId;
}
