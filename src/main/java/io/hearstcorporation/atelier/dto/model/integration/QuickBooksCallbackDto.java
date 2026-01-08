package io.hearstcorporation.atelier.dto.model.integration;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class QuickBooksCallbackDto {
    @NotBlank
    private String code;
    
    @NotBlank
    private String realmId;
    
    private String state;
}

