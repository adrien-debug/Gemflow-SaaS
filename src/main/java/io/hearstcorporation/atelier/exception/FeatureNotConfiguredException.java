package io.hearstcorporation.atelier.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
public class FeatureNotConfiguredException extends RuntimeException {

    public FeatureNotConfiguredException(String featureName) {
        super("Feature '" + featureName + "' is not configured. Please set the required environment variables.");
    }

    public FeatureNotConfiguredException(String featureName, String requiredVars) {
        super("Feature '" + featureName + "' requires configuration: " + requiredVars);
    }
}

