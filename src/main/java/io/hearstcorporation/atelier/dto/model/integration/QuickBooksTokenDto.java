package io.hearstcorporation.atelier.dto.model.integration;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class QuickBooksTokenDto {
    @JsonProperty("access_token")
    private String accessToken;
    
    @JsonProperty("refresh_token")
    private String refreshToken;
    
    @JsonProperty("expires_in")
    private Long expiresIn;
    
    @JsonProperty("token_type")
    private String tokenType;
    
    @JsonProperty("x_refresh_token_expires_in")
    private Long refreshTokenExpiresIn;
}

