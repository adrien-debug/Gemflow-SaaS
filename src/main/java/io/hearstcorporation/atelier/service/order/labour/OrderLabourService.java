package io.hearstcorporation.atelier.service.order.labour;

import io.hearstcorporation.atelier.dto.model.LogTimeRequestDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourRequestDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourSummaryDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourUpdateDto;
import io.hearstcorporation.atelier.model.order.labour.LabourTaskType;
import io.hearstcorporation.atelier.model.order.labour.OrderLabour;
import io.hearstcorporation.atelier.model.order.labour.OrderLabourTaskTypeSummary;

import java.util.List;

public interface OrderLabourService {

    // Business logic methods

    Long createOrderLabour(OrderLabourRequestDto orderLabourRequestDto);

    void updateOrderLabour(Long orderLabourId, OrderLabourUpdateDto orderLabourRequestDto);

    void deleteOrderLabour(Long orderLabourId);

    void createOrderLabour(Long orderId, LogTimeRequestDto spentSeconds, LabourTaskType taskType);

    boolean isOrderLabourExists(Long orderId);

    // Get Dto methods

    OrderLabourDto getOrderLabourDto(Long orderLabourId);

    SearchDto<OrderLabourDto> searchOrderLabours(SearchRequestDto<OrderLabourSearchCriteriaDto> labourSearchQueryDto);

    OrderLabourSummaryDto getOrderLaboursSummary(Long orderId);

    // Get Entity methods

    OrderLabour getOrderLabour(Long orderLabourId);

    OrderLabour getFullOrderLabour(Long orderLabourId);

    OrderLabourTaskTypeSummary getOrderLabourTaskTypeSummary(Long orderId, Long userId, LabourTaskType taskType);

    List<OrderLabourTaskTypeSummary> getOrderLabourTaskTypeSummaries(Long orderId, Long userId);
}
