package io.hearstcorporation.atelier.dto.model.administration;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ClientShortDto {

    private Long id;
    private String name;
    private String email;
    private String address;
    private String city;
    private String postalCode;
    private String vatNumber;
}
