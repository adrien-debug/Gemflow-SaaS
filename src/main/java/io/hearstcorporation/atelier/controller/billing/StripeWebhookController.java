package io.hearstcorporation.atelier.controller.billing;

import io.hearstcorporation.atelier.dto.model.error.ErrorCode;
import io.hearstcorporation.atelier.exception.InvalidDataException;
import io.hearstcorporation.atelier.service.billing.StripeBillingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static io.hearstcorporation.atelier.controller.billing.StripeWebhookController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class StripeWebhookController {

    public static final String BASE_URL = "/api/v1/billing";

    private final StripeBillingService stripeBillingService;

    @PostMapping(value = "/webhook", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> webhook(
            @RequestBody String payload,
            @RequestHeader(value = "Stripe-Signature", required = false) String stripeSignatureHeader) {
        if (stripeSignatureHeader == null || stripeSignatureHeader.isBlank()) {
            throw new InvalidDataException(ErrorCode.INVALID_REQUEST, "Missing Stripe-Signature header");
        }
        if (payload == null || payload.isBlank()) {
            throw new InvalidDataException(ErrorCode.INVALID_REQUEST, "Missing webhook payload");
        }
        stripeBillingService.handleWebhook(payload, stripeSignatureHeader);
        return ResponseEntity.ok().build();
    }
}


