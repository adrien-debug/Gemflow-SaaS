package io.hearstcorporation.atelier.controller.billing;

import io.hearstcorporation.atelier.controller.advice.ExceptionControllerAdvice;
import io.hearstcorporation.atelier.service.billing.StripeBillingService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = StripeWebhookController.class)
@AutoConfigureMockMvc(addFilters = false)
@Import(ExceptionControllerAdvice.class)
class StripeWebhookControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    StripeBillingService stripeBillingService;

    @Test
    void webhook_missingSignatureHeader_returns400() throws Exception {
        mockMvc.perform(post("/api/v1/billing/webhook")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"type\":\"checkout.session.completed\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void webhook_withSignatureHeader_returns200() throws Exception {
        mockMvc.perform(post("/api/v1/billing/webhook")
                        .header("Stripe-Signature", "t=1700000000,v1=dummy")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"type\":\"checkout.session.completed\"}"))
                .andExpect(status().isOk());
    }
}


