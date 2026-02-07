package io.hearstcorporation.atelier.config.security;

import io.hearstcorporation.atelier.config.security.property.CorsProperties;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class CorsConfigTest {

    @Test
    void corsConfigurationSource_shouldExposeConfiguredOriginPatterns() {
        CorsProperties props = new CorsProperties();
        props.setAllowedOrigins(List.of("https://gemflow-saas.vercel.app", "https://*.vercel.app"));
        props.setAllowedMethods(List.of("*"));
        props.setAllowedHeaders(List.of("*"));

        CorsConfigurationSource source = new CorsConfig().corsConfigurationSource(props);

        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/api/v1/orders/search");
        CorsConfiguration config = source.getCorsConfiguration(request);

        assertThat(config).isNotNull();
        assertThat(config.getAllowedOriginPatterns()).contains("https://gemflow-saas.vercel.app", "https://*.vercel.app");
        assertThat(config.getAllowedMethods()).contains("*");
        assertThat(config.getAllowedHeaders()).contains("*");
    }
}

