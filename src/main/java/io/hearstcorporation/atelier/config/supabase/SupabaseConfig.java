package io.hearstcorporation.atelier.config.supabase;

import io.hearstcorporation.atelier.config.supabase.property.SupabaseProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;

@Configuration
@EnableConfigurationProperties(SupabaseProperties.class)
public class SupabaseConfig {

    public static final String SUPABASE_ADMIN_REST_CLIENT = "supabaseAdminRestClient";
    public static final String SUPABASE_AUTH_REST_CLIENT = "supabaseAuthRestClient";

    @Bean(SUPABASE_ADMIN_REST_CLIENT)
    public RestClient supabaseAdminRestClient(SupabaseProperties properties) {
        return RestClient.builder()
                .baseUrl(properties.getUrl() + "/auth/v1")
                .defaultHeader("apikey", properties.getServiceRoleKey())
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + properties.getServiceRoleKey())
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    @Bean(SUPABASE_AUTH_REST_CLIENT)
    public RestClient supabaseAuthRestClient(SupabaseProperties properties) {
        return RestClient.builder()
                .baseUrl(properties.getUrl() + "/auth/v1")
                .defaultHeader("apikey", properties.getAnonKey())
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }
}
