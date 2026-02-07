package io.hearstcorporation.atelier.dto.model.integration;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuickBooksAuthUrlDto {
    private String authorizationUrl;
    private String state;
}

