package io.hearstcorporation.atelier.config.audit;

import io.hearstcorporation.atelier.model.user.User;
import io.hearstcorporation.atelier.service.user.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "currentUserIdAuditorAware")
public class AuditConfig {

    @Bean
    public AuditorAware<User> currentUserIdAuditorAware(UserService userService) {
        return new CurrentUserIdAuditorAware(userService);
    }
}
