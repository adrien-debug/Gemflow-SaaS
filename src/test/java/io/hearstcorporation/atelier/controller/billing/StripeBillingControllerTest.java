package io.hearstcorporation.atelier.controller.billing;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.hearstcorporation.atelier.controller.advice.ExceptionControllerAdvice;
import io.hearstcorporation.atelier.dto.model.billing.CheckoutSessionDto;
import io.hearstcorporation.atelier.dto.model.billing.CreateCheckoutSessionRequestDto;
import io.hearstcorporation.atelier.service.billing.StripeBillingService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = StripeBillingController.class)
@AutoConfigureMockMvc(addFilters = false)
@Import(ExceptionControllerAdvice.class)
class StripeBillingControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    StripeBillingService stripeBillingService;

    @Test
    void checkoutSession_missingPrice_returns400() throws Exception {
        CreateCheckoutSessionRequestDto request = new CreateCheckoutSessionRequestDto();
        request.setCustomerEmail("test@example.com");

        mockMvc.perform(post("/api/v1/billing/checkout-session")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void checkoutSession_validRequest_returns200() throws Exception {
        when(stripeBillingService.createCheckoutSession(any()))
                .thenReturn(CheckoutSessionDto.builder().id("cs_test_123").url("https://checkout.stripe.test/cs_test_123").build());

        CreateCheckoutSessionRequestDto request = new CreateCheckoutSessionRequestDto();
        request.setPriceKey("basic-monthly");
        request.setCustomerEmail("test@example.com");

        mockMvc.perform(post("/api/v1/billing/checkout-session")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("cs_test_123"))
                .andExpect(jsonPath("$.url").value("https://checkout.stripe.test/cs_test_123"));
    }
}


