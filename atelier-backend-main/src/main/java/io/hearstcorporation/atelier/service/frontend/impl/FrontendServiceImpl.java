package io.hearstcorporation.atelier.service.frontend.impl;

import io.hearstcorporation.atelier.config.frontend.property.FrontendProperties;
import io.hearstcorporation.atelier.service.frontend.FrontendService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FrontendServiceImpl implements FrontendService {

    private static final String HOST_PATH_TOKEN_TEMPLATE = "%s%s%s";

    private final FrontendProperties frontendProperties;

    @Override
    public String generateNewPasswordLink(UUID tokenValue) {
        return generateHostPathTokenLink(tokenValue, frontendProperties.getNewPasswordPath());
    }

    @Override
    public String generateRestorePasswordLink(UUID tokenValue) {
        return generateHostPathTokenLink(tokenValue, frontendProperties.getRestorePasswordPath());
    }

    private String generateHostPathTokenLink(UUID tokenValue, String pathPrefix) {
        return HOST_PATH_TOKEN_TEMPLATE.formatted(frontendProperties.getUrl(), pathPrefix, tokenValue);
    }
}
