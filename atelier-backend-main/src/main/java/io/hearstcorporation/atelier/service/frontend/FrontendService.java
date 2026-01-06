package io.hearstcorporation.atelier.service.frontend;

import java.util.UUID;

public interface FrontendService {

    String generateNewPasswordLink(UUID tokenValue);

    String generateRestorePasswordLink(UUID tokenValue);
}
