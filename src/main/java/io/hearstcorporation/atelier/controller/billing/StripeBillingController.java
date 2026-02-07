package io.hearstcorporation.atelier.controller.billing;

import io.hearstcorporation.atelier.dto.model.billing.CheckoutSessionDto;
import io.hearstcorporation.atelier.dto.model.billing.CreateCheckoutSessionRequestDto;
import io.hearstcorporation.atelier.dto.model.billing.PortalSessionDto;
import io.hearstcorporation.atelier.service.billing.StripeBillingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static io.hearstcorporation.atelier.controller.billing.StripeBillingController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class StripeBillingController {

    public static final String BASE_URL = "/api/v1/billing";

    private final StripeBillingService stripeBillingService;

    @PostMapping("/checkout-session")
    public CheckoutSessionDto createCheckoutSession(@RequestBody @Valid CreateCheckoutSessionRequestDto request) {
        return stripeBillingService.createCheckoutSession(request);
    }

    @GetMapping("/portal")
    public PortalSessionDto createBillingPortalSession(
            @RequestParam String customerId,
            @RequestParam(required = false) String returnUrl) {
        return stripeBillingService.createBillingPortalSession(customerId, returnUrl);
    }
}


