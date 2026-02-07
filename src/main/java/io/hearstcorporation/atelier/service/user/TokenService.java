package io.hearstcorporation.atelier.service.user;

import io.hearstcorporation.atelier.dto.model.token.TokenDto;
import io.hearstcorporation.atelier.dto.model.token.TokenExpirationDto;
import io.hearstcorporation.atelier.model.user.Token;
import io.hearstcorporation.atelier.model.user.TokenType;
import io.hearstcorporation.atelier.model.user.User;

import java.util.Optional;
import java.util.UUID;

public interface TokenService {

    // Business logic methods

    TokenDto createTokenDto(User user, TokenType type);

    void isTokenExpiredOrThrow(UUID tokenValue, TokenType tokenType);

    void isTokenExpiredOrThrow(Token token);

    void deleteToken(Token token);

    // Get Dto methods

    TokenExpirationDto getTokenExpirationDto(UUID tokenValue, TokenType tokenType);

    // Get Entity methods

    Token getToken(UUID tokenValue, TokenType tokenType);

    // Find Entity methods

    Optional<Token> findToken(UUID tokenValue, TokenType tokenType);
}
