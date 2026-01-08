package io.hearstcorporation.atelier.controller.integration;

import io.hearstcorporation.atelier.dto.model.integration.AccountingIntegrationDto;
import io.hearstcorporation.atelier.dto.model.integration.AccountingSyncLogDto;
import io.hearstcorporation.atelier.dto.model.integration.QuickBooksAuthUrlDto;
import io.hearstcorporation.atelier.dto.model.integration.QuickBooksCallbackDto;
import io.hearstcorporation.atelier.dto.model.integration.QuickBooksCompanyInfoDto;
import io.hearstcorporation.atelier.dto.model.integration.QuickBooksCustomerDto;
import io.hearstcorporation.atelier.dto.model.integration.QuickBooksDataSummaryDto;
import io.hearstcorporation.atelier.dto.model.integration.QuickBooksInvoiceDto;
import io.hearstcorporation.atelier.dto.model.integration.QuickBooksItemDto;
import io.hearstcorporation.atelier.dto.mapper.integration.AccountingIntegrationMapper;
import io.hearstcorporation.atelier.model.integration.AccountingSyncLog;
import io.hearstcorporation.atelier.repository.integration.AccountingSyncLogRepository;
import io.hearstcorporation.atelier.service.integration.QuickBooksApiService;
import io.hearstcorporation.atelier.service.integration.QuickBooksAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static io.hearstcorporation.atelier.controller.integration.QuickBooksIntegrationController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class QuickBooksIntegrationController {

    public static final String BASE_URL = "/api/v1/integrations/quickbooks";

    private final QuickBooksAuthService authService;
    private final QuickBooksApiService apiService;
    private final AccountingSyncLogRepository syncLogRepository;
    private final AccountingIntegrationMapper mapper;

    // ============ Authentication Endpoints ============

    /**
     * Get the OAuth2 authorization URL to start the connection flow
     */
    @GetMapping("/connect")
    public QuickBooksAuthUrlDto getAuthorizationUrl() {
        return authService.getAuthorizationUrl();
    }

    /**
     * Handle the OAuth2 callback after user authorization (GET - from QuickBooks redirect)
     */
    @GetMapping("/callback")
    public ResponseEntity<String> handleCallbackGet(
            @RequestParam String code,
            @RequestParam String state,
            @RequestParam String realmId) {
        QuickBooksCallbackDto callback = new QuickBooksCallbackDto();
        callback.setCode(code);
        callback.setState(state);
        callback.setRealmId(realmId);
        
        authService.handleCallback(callback);
        
        // Redirect to frontend success page
        return ResponseEntity.status(302)
                .header("Location", "http://localhost:7101/integrations?connected=true")
                .build();
    }

    /**
     * Handle the OAuth2 callback after user authorization (POST - from frontend)
     */
    @PostMapping("/callback")
    public AccountingIntegrationDto handleCallback(@RequestBody @Valid QuickBooksCallbackDto callback) {
        return authService.handleCallback(callback);
    }

    /**
     * Get current integration status
     */
    @GetMapping("/status")
    public ResponseEntity<AccountingIntegrationDto> getStatus() {
        return authService.getIntegrationStatus()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

    /**
     * Disconnect QuickBooks integration
     */
    @DeleteMapping
    public ResponseEntity<Void> disconnect() {
        authService.disconnect();
        return ResponseEntity.noContent().build();
    }

    /**
     * Test the connection
     */
    @GetMapping("/test")
    public ResponseEntity<Boolean> testConnection() {
        boolean connected = apiService.testConnection();
        return ResponseEntity.ok(connected);
    }

    // ============ Data Retrieval Endpoints ============

    /**
     * Get company information
     */
    @GetMapping("/company")
    public QuickBooksCompanyInfoDto getCompanyInfo() {
        return apiService.getCompanyInfo();
    }

    /**
     * Get data summary (counts of all entities)
     */
    @GetMapping("/summary")
    public QuickBooksDataSummaryDto getDataSummary() {
        return apiService.getDataSummary();
    }

    /**
     * Get all customers
     */
    @GetMapping("/customers")
    public List<QuickBooksCustomerDto> getCustomers(
            @RequestParam(required = false) Integer startPosition,
            @RequestParam(required = false) Integer maxResults) {
        return apiService.getCustomers(startPosition, maxResults);
    }

    /**
     * Get all invoices
     */
    @GetMapping("/invoices")
    public List<QuickBooksInvoiceDto> getInvoices(
            @RequestParam(required = false) Integer startPosition,
            @RequestParam(required = false) Integer maxResults) {
        return apiService.getInvoices(startPosition, maxResults);
    }

    /**
     * Get all items (products/services)
     */
    @GetMapping("/items")
    public List<QuickBooksItemDto> getItems(
            @RequestParam(required = false) Integer startPosition,
            @RequestParam(required = false) Integer maxResults) {
        return apiService.getItems(startPosition, maxResults);
    }

    // ============ Sync Logs ============

    /**
     * Get sync history
     */
    @GetMapping("/sync-logs")
    public Page<AccountingSyncLogDto> getSyncLogs(
            @RequestParam Long integrationId,
            Pageable pageable) {
        return syncLogRepository
                .findByIntegrationIdOrderBySyncedAtDesc(integrationId, pageable)
                .map(mapper::toSyncLogDto);
    }
}

