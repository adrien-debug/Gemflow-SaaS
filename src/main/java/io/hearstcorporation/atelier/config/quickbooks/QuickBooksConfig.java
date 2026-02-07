package io.hearstcorporation.atelier.config.quickbooks;

import io.hearstcorporation.atelier.config.quickbooks.property.QuickBooksProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
@RequiredArgsConstructor
public class QuickBooksConfig {

    private final QuickBooksProperties quickBooksProperties;

    @Bean(name = "quickBooksRestTemplate")
    public RestTemplate quickBooksRestTemplate() {
        return new RestTemplate();
    }
}

