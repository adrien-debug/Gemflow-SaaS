package io.hearstcorporation.atelier.config.audit;

import io.hearstcorporation.atelier.model.user.User;
import io.hearstcorporation.atelier.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.AuditorAware;
import org.springframework.lang.NonNull;

import java.util.Optional;

@RequiredArgsConstructor
public class CurrentUserIdAuditorAware implements AuditorAware<User> {

    private final UserService userService;

    @NonNull
    @Override
    public Optional<User> getCurrentAuditor() {
        return Optional.of(userService.getCurrentUser());
    }

}