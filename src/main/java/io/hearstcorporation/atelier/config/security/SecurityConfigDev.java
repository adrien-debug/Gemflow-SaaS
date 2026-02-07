package io.hearstcorporation.atelier.config.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

/**
 * Configuration de sécurité pour le profil DEV
 * Désactive l'authentification pour faciliter le développement local
 */
@Slf4j
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true)
@Profile("dev")
public class SecurityConfigDev {

    @Bean
    public SecurityFilterChain devSecurityFilterChain(HttpSecurity http,
                                                      CorsConfigurationSource corsConfigurationSource) throws Exception {
        log.warn("⚠️  SECURITY DISABLED - Running in DEV mode without authentication");
        log.warn("⚠️  All endpoints are publicly accessible");
        
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(corsConfigurer -> corsConfigurer.configurationSource(corsConfigurationSource))
            .authorizeHttpRequests(requests -> requests.anyRequest().permitAll());

        return http.build();
    }
}
