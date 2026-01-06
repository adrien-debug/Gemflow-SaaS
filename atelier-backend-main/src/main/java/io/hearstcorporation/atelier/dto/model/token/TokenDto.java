package io.hearstcorporation.atelier.dto.model.token;

import io.hearstcorporation.atelier.model.user.TokenType;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

@Getter
@AllArgsConstructor
public class TokenDto {

    private UUID value;
    private TokenType type;
    private Instant expiredAt;
}
