package io.hearstcorporation.atelier.config.quickbooks.property;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "quickbooks")
public class QuickBooksProperties {

    private String clientId;
    private String clientSecret;
    private String redirectUri;
    private String environment = "sandbox"; // sandbox or production
    private String scope = "com.intuit.quickbooks.accounting";
    
    public String getBaseUrl() {
        return "sandbox".equalsIgnoreCase(environment) 
            ? "https://sandbox-quickbooks.api.intuit.com"
            : "https://quickbooks.api.intuit.com";
    }
    
    public String getAuthUrl() {
        return "https://appcenter.intuit.com/connect/oauth2";
    }
    
    public String getTokenUrl() {
        return "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer";
    }
}

