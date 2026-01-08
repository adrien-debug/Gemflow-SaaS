package io.hearstcorporation.atelier.dto.mapper.order.stock;

import io.hearstcorporation.atelier.dto.mapper.administration.ClientMapper;
import io.hearstcorporation.atelier.dto.mapper.setting.LocationMapper;
import io.hearstcorporation.atelier.dto.model.inventory.InventoryTotalDto;
import io.hearstcorporation.atelier.dto.model.order.OrderProfitDto;
import io.hearstcorporation.atelier.dto.model.order.OrderStockSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondTotalDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourSummaryDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalFullTotalDto;
import io.hearstcorporation.atelier.dto.model.order.stock.OrderStockDto;
import io.hearstcorporation.atelier.dto.model.order.stock.OrderStockTotalDto;
import io.hearstcorporation.atelier.model.order.OrderSearchCriteria;
import io.hearstcorporation.atelier.model.order.stock.OrderStock;
import io.hearstcorporation.atelier.model.order.stock.OrderStockTotal;
import io.hearstcorporation.atelier.model.setting.Location;
import lombok.experimental.UtilityClass;

import java.math.BigDecimal;

@UtilityClass
public class OrderStockMapper {

    public static OrderStock toOrderStock(Location location, OrderLabourSummaryDto orderLabourSummary,
                                          InventoryTotalDto orderGemstonesTotal, OrderDiamondTotalDto orderDiamondsTotal,
                                          OrderMetalFullTotalDto orderMetalFullTotal, OrderProfitDto orderProfit) {
        OrderStock orderStock = new OrderStock();
        orderStock.setLocation(location);

        // Labour
        orderStock.setLabourTotalCost(orderLabourSummary.getTotalCost().multiply(getProfitMultiplayer(orderProfit.getLabourProfitPercentage())));
        orderStock.setLabourTotalMinutes(orderLabourSummary.getTotalSpentSeconds());

        // Gemstones
        orderStock.setGemstonesTotalCost(orderGemstonesTotal.totalCost().multiply(getProfitMultiplayer(orderProfit.getGemstoneProfitPercentage())));
        orderStock.setGemstonesTotalWeight(orderGemstonesTotal.totalWeight());
        orderStock.setGemstonesTotalWeightGrams(orderGemstonesTotal.totalWeightGrams());

        // Diamonds
        orderStock.setDiamondsTotalQuantity(orderDiamondsTotal.totalQuantity());
        orderStock.setDiamondsTotalCost(orderDiamondsTotal.totalPrice().multiply(getProfitMultiplayer(orderProfit.getDiamondProfitPercentage())));
        orderStock.setDiamondsTotalMarkupCost(orderDiamondsTotal.totalMarkupPrice());
        orderStock.setDiamondsTotalWeight(orderDiamondsTotal.totalWeight());
        orderStock.setDiamondsTotalWeightGrams(orderDiamondsTotal.totalWeightGrams());

        // Metals
        orderStock.setMetalsTotalCost(orderMetalFullTotal.getTotalCost().multiply(getProfitMultiplayer(orderProfit.getMetalProfitPercentage())));
        orderStock.setMetalsTotalWeightIn(orderMetalFullTotal.getTotalWeightIn());
        orderStock.setMetalsTotalWeightOut(orderMetalFullTotal.getTotalWeightOut());

        return orderStock;
    }

    public static OrderStockDto toOrderStockDto(OrderStock orderStock) {
        if (orderStock == null) {
            return null;
        }
        return OrderStockDto.builder()
                .id(orderStock.getId())
                .status(orderStock.getStatus())
                .saleDate(orderStock.getSaleDate())
                .returnDate(orderStock.getReturnDate())
                .issueDate(orderStock.getIssueDate())
                .issueClient(ClientMapper.toClientShortDto(orderStock.getIssueClient()))
                .totalCost(orderStock.getTotalCost())
                .createdAt(orderStock.getCreatedAt())
                .location(LocationMapper.toLocationDto(orderStock.getLocation()))

                // Labour
                .labourTotalCost(orderStock.getLabourTotalCost())
                .labourTotalMinutes(orderStock.getLabourTotalMinutes())

                // Gemstones
                .gemstonesTotalCost(orderStock.getGemstonesTotalCost())
                .gemstonesTotalWeight(orderStock.getGemstonesTotalWeight())
                .gemstonesTotalWeightGrams(orderStock.getGemstonesTotalWeightGrams())

                // Diamonds
                .diamondsTotalQuantity(orderStock.getDiamondsTotalQuantity())
                .diamondsTotalCost(orderStock.getDiamondsTotalCost())
                .diamondsTotalMarkupCost(orderStock.getDiamondsTotalMarkupCost())
                .diamondsTotalWeight(orderStock.getDiamondsTotalWeight())
                .diamondsTotalWeightGrams(orderStock.getDiamondsTotalWeightGrams())

                // Metals
                .metalsTotalCost(orderStock.getMetalsTotalCost())
                .metalsTotalWeightIn(orderStock.getMetalsTotalWeightIn())
                .metalsTotalWeightOut(orderStock.getMetalsTotalWeightOut())
                .build();
    }

    public static OrderStockTotalDto toOrderStockTotalDto(OrderStockTotal orderStockTotal) {
        if (orderStockTotal == null) {
            return null;
        }
        return new OrderStockTotalDto(orderStockTotal.getTotalCount(),
                orderStockTotal.getTotalCost(),
                orderStockTotal.getTotalAdjustedCost());
    }

    public static OrderSearchCriteria toOrderSearchCriteria(OrderStockSearchCriteriaDto orderStockSearchCriteriaDto) {
        OrderSearchCriteria searchCriteria = new OrderSearchCriteria();
        searchCriteria.setSearchInput(orderStockSearchCriteriaDto.getSearchInput());
        searchCriteria.setStockStatuses(orderStockSearchCriteriaDto.getStatuses());
        searchCriteria.setInStock(true);
        return searchCriteria;
    }

    private static BigDecimal getProfitMultiplayer(Short profit) {
        return BigDecimal.valueOf(1 + profit / 100);
    }
}
