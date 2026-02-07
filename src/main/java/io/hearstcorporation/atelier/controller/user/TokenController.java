package io.hearstcorporation.atelier.controller.user;

import io.hearstcorporation.atelier.dto.model.token.TokenExpirationDto;
import io.hearstcorporation.atelier.model.user.TokenType;
import io.hearstcorporation.atelier.service.user.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

import static io.hearstcorporation.atelier.controller.user.TokenController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class TokenController {

    public static final String BASE_URL = "/api/v1/tokens";
    public static final String CHECK_TOKEN = "/values/{tokenValue}/types/{tokenType}/check";

    private final TokenService tokenService;

    @GetMapping(CHECK_TOKEN)
    public TokenExpirationDto checkToken(@PathVariable UUID tokenValue, @PathVariable TokenType tokenType) {
        return tokenService.getTokenExpirationDto(tokenValue, tokenType);
    }
}
