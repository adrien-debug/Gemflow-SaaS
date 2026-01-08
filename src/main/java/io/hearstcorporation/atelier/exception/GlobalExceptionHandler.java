package io.hearstcorporation.atelier.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

import java.util.Map;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(FeatureNotConfiguredException.class)
    public ResponseEntity<Map<String, Object>> handleFeatureNotConfigured(FeatureNotConfiguredException ex) {
        log.warn("Feature not configured: {}", ex.getMessage());
        
        return ResponseEntity
                .status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(Map.of(
                        "status", "unavailable",
                        "message", ex.getMessage(),
                        "hint", "Please configure the required environment variables. See RAILWAY_DEPLOY.md for details.",
                        "documentation", "/under-construction.html"
                ));
    }
}

