package io.hearstcorporation.atelier.service.user.impl;

import io.hearstcorporation.atelier.config.token.TokenExpirations;
import io.hearstcorporation.atelier.dto.model.token.TokenDto;
import io.hearstcorporation.atelier.dto.model.token.TokenExpirationDto;
import io.hearstcorporation.atelier.exception.TokenExpiredException;
import io.hearstcorporation.atelier.model.user.Token;
import io.hearstcorporation.atelier.model.user.TokenType;
import io.hearstcorporation.atelier.model.user.User;
import io.hearstcorporation.atelier.repository.user.TokenRepository;
import io.hearstcorporation.atelier.service.user.TokenService;
import io.hearstcorporation.atelier.util.ExceptionWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {

    private final TokenRepository tokenRepository;

    @Override
    @Transactional
    public TokenDto createTokenDto(User user, TokenType type) {
        Token token = tokenRepository.findByUserIdAndType(user.getId(), type)
                .orElseGet(Token::new);
        token.setValue(UUID.randomUUID());
        token.setUser(user);
        token.setType(type);
        token.setExpiredAt(getTokenExpirationTime(type));
        tokenRepository.save(token);
        return new TokenDto(token.getValue(), token.getType(), token.getExpiredAt());
    }

    private Instant getTokenExpirationTime(TokenType type) {
        return switch (type) {
            case RESTORE_PASSWORD -> Instant.now().plus(
                    TokenExpirations.RESTORE_PASSWORD_EXPIRATION_VALUE,
                    TokenExpirations.RESTORE_PASSWORD_EXPIRATION_UNIT
            );
        };
    }

    @Override
    public void isTokenExpiredOrThrow(UUID tokenValue, TokenType tokenType) {
        if (isTokenExpired(tokenValue, tokenType)) {
            throw new TokenExpiredException(tokenValue);
        }
    }

    @Override
    public void isTokenExpiredOrThrow(Token token) {
        if (isTokenExpired(token)) {
            throw new TokenExpiredException(token.getValue());
        }
    }

    @Override
    @Transactional
    public void deleteToken(Token token) {
        ExceptionWrapper.onDelete(() -> tokenRepository.deleteById(token.getId()),
                "Token %d cannot be deleted.".formatted(token.getId()));
    }

    @Override
    public TokenExpirationDto getTokenExpirationDto(UUID tokenValue, TokenType tokenType) {
        return new TokenExpirationDto(isTokenExpired(tokenValue, tokenType));
    }

    private boolean isTokenExpired(UUID tokenValue, TokenType tokenType) {
        return findToken(tokenValue, tokenType)
                .map(this::isTokenExpired)
                .orElse(true);
    }

    private boolean isTokenExpired(Token token) {
        return Instant.now().isAfter(token.getExpiredAt());
    }

    @Override
    @Transactional(readOnly = true)
    public Token getToken(UUID tokenValue, TokenType tokenType) {
        Token token = findToken(tokenValue, tokenType)
                .orElseThrow(() -> new TokenExpiredException(tokenValue));
        isTokenExpiredOrThrow(token);
        return token;
    }

    @Override
    public Optional<Token> findToken(UUID tokenValue, TokenType tokenType) {
        return tokenRepository.findByValueAndType(tokenValue, tokenType);
    }
}
