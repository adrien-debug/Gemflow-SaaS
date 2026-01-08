package io.hearstcorporation.atelier.service.integration;

import io.hearstcorporation.atelier.config.quickbooks.property.QuickBooksProperties;
import io.hearstcorporation.atelier.dto.model.integration.QuickBooksCompanyInfoDto;
import io.hearstcorporation.atelier.dto.model.integration.QuickBooksCustomerDto;
import io.hearstcorporation.atelier.dto.model.integration.QuickBooksDataSummaryDto;
import io.hearstcorporation.atelier.dto.model.integration.QuickBooksInvoiceDto;
import io.hearstcorporation.atelier.dto.model.integration.QuickBooksItemDto;
import io.hearstcorporation.atelier.exception.ServiceException;
import io.hearstcorporation.atelier.model.integration.AccountingIntegration;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuickBooksApiService {

    private final QuickBooksProperties properties;
    private final QuickBooksAuthService authService;
    
    @Qualifier("quickBooksRestTemplate")
    private final RestTemplate restTemplate;

    /**
     * Get company information
     */
    public QuickBooksCompanyInfoDto getCompanyInfo() {
        AccountingIntegration integration = authService.getValidIntegration();
        String url = buildApiUrl(integration, "/companyinfo/" + integration.getRealmId());
        
        Map<String, Object> response = executeGet(integration, url);
        Map<String, Object> companyInfo = extractQueryResponse(response, "CompanyInfo");
        
        return QuickBooksCompanyInfoDto.builder()
                .companyName(getString(companyInfo, "CompanyName"))
                .legalName(getString(companyInfo, "LegalName"))
                .country(getString(companyInfo, "Country"))
                .email(getNestedString(companyInfo, "Email", "Address"))
                .build();
    }

    /**
     * Get all customers
     */
    public List<QuickBooksCustomerDto> getCustomers() {
        return getCustomers(null, null);
    }

    /**
     * Get customers with pagination
     */
    public List<QuickBooksCustomerDto> getCustomers(Integer startPosition, Integer maxResults) {
        AccountingIntegration integration = authService.getValidIntegration();
        
        StringBuilder query = new StringBuilder("SELECT * FROM Customer");
        if (startPosition != null) {
            query.append(" STARTPOSITION ").append(startPosition);
        }
        if (maxResults != null) {
            query.append(" MAXRESULTS ").append(maxResults);
        }
        
        String url = buildQueryUrl(integration, query.toString());
        Map<String, Object> response = executeGet(integration, url);
        
        List<Map<String, Object>> customers = extractQueryResponseList(response, "Customer");
        List<QuickBooksCustomerDto> result = new ArrayList<>();
        
        for (Map<String, Object> customer : customers) {
            result.add(QuickBooksCustomerDto.builder()
                    .id(getString(customer, "Id"))
                    .displayName(getString(customer, "DisplayName"))
                    .companyName(getString(customer, "CompanyName"))
                    .givenName(getString(customer, "GivenName"))
                    .familyName(getString(customer, "FamilyName"))
                    .primaryEmailAddr(getNestedString(customer, "PrimaryEmailAddr", "Address"))
                    .primaryPhone(getNestedString(customer, "PrimaryPhone", "FreeFormNumber"))
                    .balance(getString(customer, "Balance"))
                    .active(getBoolean(customer, "Active"))
                    .build());
        }
        
        return result;
    }

    /**
     * Get all invoices
     */
    public List<QuickBooksInvoiceDto> getInvoices() {
        return getInvoices(null, null);
    }

    /**
     * Get invoices with pagination
     */
    public List<QuickBooksInvoiceDto> getInvoices(Integer startPosition, Integer maxResults) {
        AccountingIntegration integration = authService.getValidIntegration();
        
        StringBuilder query = new StringBuilder("SELECT * FROM Invoice");
        if (startPosition != null) {
            query.append(" STARTPOSITION ").append(startPosition);
        }
        if (maxResults != null) {
            query.append(" MAXRESULTS ").append(maxResults);
        }
        
        String url = buildQueryUrl(integration, query.toString());
        Map<String, Object> response = executeGet(integration, url);
        
        List<Map<String, Object>> invoices = extractQueryResponseList(response, "Invoice");
        List<QuickBooksInvoiceDto> result = new ArrayList<>();
        
        for (Map<String, Object> invoice : invoices) {
            result.add(mapInvoice(invoice));
        }
        
        return result;
    }

    /**
     * Get all items (products/services)
     */
    public List<QuickBooksItemDto> getItems() {
        return getItems(null, null);
    }

    /**
     * Get items with pagination
     */
    public List<QuickBooksItemDto> getItems(Integer startPosition, Integer maxResults) {
        AccountingIntegration integration = authService.getValidIntegration();
        
        StringBuilder query = new StringBuilder("SELECT * FROM Item");
        if (startPosition != null) {
            query.append(" STARTPOSITION ").append(startPosition);
        }
        if (maxResults != null) {
            query.append(" MAXRESULTS ").append(maxResults);
        }
        
        String url = buildQueryUrl(integration, query.toString());
        Map<String, Object> response = executeGet(integration, url);
        
        List<Map<String, Object>> items = extractQueryResponseList(response, "Item");
        List<QuickBooksItemDto> result = new ArrayList<>();
        
        for (Map<String, Object> item : items) {
            result.add(QuickBooksItemDto.builder()
                    .id(getString(item, "Id"))
                    .name(getString(item, "Name"))
                    .description(getString(item, "Description"))
                    .type(getString(item, "Type"))
                    .unitPrice(getBigDecimal(item, "UnitPrice"))
                    .qtyOnHand(getBigDecimal(item, "QtyOnHand"))
                    .active(getBoolean(item, "Active"))
                    .build());
        }
        
        return result;
    }

    /**
     * Get data summary (counts)
     */
    public QuickBooksDataSummaryDto getDataSummary() {
        AccountingIntegration integration = authService.getValidIntegration();
        
        int customerCount = countEntities(integration, "Customer");
        int invoiceCount = countEntities(integration, "Invoice");
        int itemCount = countEntities(integration, "Item");
        int vendorCount = countEntities(integration, "Vendor");
        int accountCount = countEntities(integration, "Account");
        
        QuickBooksCompanyInfoDto companyInfo = null;
        try {
            companyInfo = getCompanyInfo();
        } catch (Exception e) {
            log.warn("Failed to get company info: {}", e.getMessage());
        }
        
        return QuickBooksDataSummaryDto.builder()
                .companyInfo(companyInfo)
                .customerCount(customerCount)
                .invoiceCount(invoiceCount)
                .itemCount(itemCount)
                .vendorCount(vendorCount)
                .accountCount(accountCount)
                .build();
    }

    /**
     * Test connection by fetching company info
     */
    public boolean testConnection() {
        try {
            getCompanyInfo();
            return true;
        } catch (Exception e) {
            log.error("QuickBooks connection test failed: {}", e.getMessage());
            return false;
        }
    }

    // Helper methods
    
    private int countEntities(AccountingIntegration integration, String entityName) {
        try {
            String query = "SELECT COUNT(*) FROM " + entityName;
            String url = buildQueryUrl(integration, query);
            Map<String, Object> response = executeGet(integration, url);
            
            Map<String, Object> queryResponse = (Map<String, Object>) response.get("QueryResponse");
            if (queryResponse != null) {
                Object totalCount = queryResponse.get("totalCount");
                if (totalCount != null) {
                    return ((Number) totalCount).intValue();
                }
            }
            return 0;
        } catch (Exception e) {
            log.warn("Failed to count {}: {}", entityName, e.getMessage());
            return 0;
        }
    }

    private String buildApiUrl(AccountingIntegration integration, String endpoint) {
        return properties.getBaseUrl() + "/v3/company/" + integration.getRealmId() + endpoint;
    }

    private String buildQueryUrl(AccountingIntegration integration, String query) {
        String encodedQuery = java.net.URLEncoder.encode(query, java.nio.charset.StandardCharsets.UTF_8);
        return properties.getBaseUrl() + "/v3/company/" + integration.getRealmId() + "/query?query=" + encodedQuery;
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> executeGet(AccountingIntegration integration, String url) {
        try {
            HttpHeaders headers = createHeaders(integration);
            HttpEntity<Void> entity = new HttpEntity<>(headers);
            
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            
            return response.getBody();
        } catch (RestClientException e) {
            log.error("QuickBooks API call failed: {}", e.getMessage());
            throw new ServiceException("QuickBooks API error: " + e.getMessage());
        }
    }

    private HttpHeaders createHeaders(AccountingIntegration integration) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(integration.getAccessToken());
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> extractQueryResponse(Map<String, Object> response, String entityName) {
        if (response == null) return Collections.emptyMap();
        Map<String, Object> queryResponse = (Map<String, Object>) response.get("QueryResponse");
        if (queryResponse == null) {
            queryResponse = (Map<String, Object>) response.get(entityName);
            return queryResponse != null ? queryResponse : Collections.emptyMap();
        }
        List<Map<String, Object>> entities = (List<Map<String, Object>>) queryResponse.get(entityName);
        return entities != null && !entities.isEmpty() ? entities.get(0) : Collections.emptyMap();
    }

    @SuppressWarnings("unchecked")
    private List<Map<String, Object>> extractQueryResponseList(Map<String, Object> response, String entityName) {
        if (response == null) return Collections.emptyList();
        Map<String, Object> queryResponse = (Map<String, Object>) response.get("QueryResponse");
        if (queryResponse == null) return Collections.emptyList();
        List<Map<String, Object>> entities = (List<Map<String, Object>>) queryResponse.get(entityName);
        return entities != null ? entities : Collections.emptyList();
    }

    private String getString(Map<String, Object> map, String key) {
        Object value = map.get(key);
        return value != null ? value.toString() : null;
    }

    @SuppressWarnings("unchecked")
    private String getNestedString(Map<String, Object> map, String key1, String key2) {
        Object nested = map.get(key1);
        if (nested instanceof Map) {
            return getString((Map<String, Object>) nested, key2);
        }
        return null;
    }

    private boolean getBoolean(Map<String, Object> map, String key) {
        Object value = map.get(key);
        if (value instanceof Boolean) return (Boolean) value;
        if (value instanceof String) return Boolean.parseBoolean((String) value);
        return false;
    }

    private BigDecimal getBigDecimal(Map<String, Object> map, String key) {
        Object value = map.get(key);
        if (value == null) return null;
        if (value instanceof Number) return BigDecimal.valueOf(((Number) value).doubleValue());
        try {
            return new BigDecimal(value.toString());
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private LocalDate getLocalDate(Map<String, Object> map, String key) {
        String value = getString(map, key);
        if (value == null) return null;
        try {
            return LocalDate.parse(value);
        } catch (Exception e) {
            return null;
        }
    }

    @SuppressWarnings("unchecked")
    private QuickBooksInvoiceDto mapInvoice(Map<String, Object> invoice) {
        Map<String, Object> customerRef = (Map<String, Object>) invoice.get("CustomerRef");
        
        List<QuickBooksInvoiceDto.QuickBooksLineItemDto> lines = new ArrayList<>();
        List<Map<String, Object>> lineItems = (List<Map<String, Object>>) invoice.get("Line");
        if (lineItems != null) {
            for (Map<String, Object> line : lineItems) {
                String detailType = getString(line, "DetailType");
                if ("SalesItemLineDetail".equals(detailType)) {
                    Map<String, Object> detail = (Map<String, Object>) line.get("SalesItemLineDetail");
                    lines.add(QuickBooksInvoiceDto.QuickBooksLineItemDto.builder()
                            .id(getString(line, "Id"))
                            .description(getString(line, "Description"))
                            .amount(getBigDecimal(line, "Amount"))
                            .qty(detail != null ? getBigDecimal(detail, "Qty") : null)
                            .unitPrice(detail != null ? getBigDecimal(detail, "UnitPrice") : null)
                            .build());
                }
            }
        }
        
        return QuickBooksInvoiceDto.builder()
                .id(getString(invoice, "Id"))
                .docNumber(getString(invoice, "DocNumber"))
                .txnDate(getLocalDate(invoice, "TxnDate"))
                .dueDate(getLocalDate(invoice, "DueDate"))
                .customerRef(customerRef != null ? getString(customerRef, "value") : null)
                .customerName(customerRef != null ? getString(customerRef, "name") : null)
                .totalAmt(getBigDecimal(invoice, "TotalAmt"))
                .balance(getBigDecimal(invoice, "Balance"))
                .lines(lines)
                .build();
    }
}

