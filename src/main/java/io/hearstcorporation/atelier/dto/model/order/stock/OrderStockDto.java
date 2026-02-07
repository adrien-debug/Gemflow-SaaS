package io.hearstcorporation.atelier.dto.model.order.stock;

import io.hearstcorporation.atelier.dto.model.administration.ClientShortDto;
import io.hearstcorporation.atelier.dto.model.setting.LocationDto;
import io.hearstcorporation.atelier.model.order.stock.OrderStockStatus;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Getter
@Builder
public class OrderStockDto {

    private Long id;
    private OrderStockStatus status;
    private LocalDate saleDate;
    private LocalDate returnDate;
    private LocalDate issueDate;
    private ClientShortDto issueClient;
    private BigDecimal totalCost;
    private LocationDto location;
    private Instant createdAt;

    // Labour
    private BigDecimal labourTotalCost;
    private Long labourTotalMinutes;

    // Gemstones
    private BigDecimal gemstonesTotalCost;
    private BigDecimal gemstonesTotalWeight;
    private BigDecimal gemstonesTotalWeightGrams;

    // Diamonds
    private Integer diamondsTotalQuantity;
    private BigDecimal diamondsTotalCost;
    private BigDecimal diamondsTotalMarkupCost;
    private BigDecimal diamondsTotalWeight;
    private BigDecimal diamondsTotalWeightGrams;

    // Metals
    private BigDecimal metalsTotalCost;
    private BigDecimal metalsTotalWeightIn;
    private BigDecimal metalsTotalWeightOut;
}
