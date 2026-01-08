package io.hearstcorporation.atelier.service.order.metal.impl;

import io.hearstcorporation.atelier.dto.mapper.order.metal.OrderMetalCastingMapper;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.error.ErrorCode;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalCastingDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalCastingSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.order.task.OrderTaskCastingDto;
import io.hearstcorporation.atelier.exception.InvalidDataException;
import io.hearstcorporation.atelier.model.casting.Casting;
import io.hearstcorporation.atelier.model.order.metal.OrderMetalCasting;
import io.hearstcorporation.atelier.model.order.task.OrderTask;
import io.hearstcorporation.atelier.model.order.task.OrderTaskStatus;
import io.hearstcorporation.atelier.pagination.order.metal.OrderMetalCastingPaginationResolver;
import io.hearstcorporation.atelier.repository.order.metal.OrderMetalCastingRepository;
import io.hearstcorporation.atelier.service.order.metal.OrderMetalCastingService;
import io.hearstcorporation.atelier.service.order.metal.OrderMetalTotalService;
import io.hearstcorporation.atelier.service.order.task.OrderTaskService;
import io.hearstcorporation.atelier.specification.order.metal.OrderMetalCastingSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrderMetalCastingServiceImpl implements OrderMetalCastingService {

    private final OrderMetalCastingRepository orderMetalCastingRepository;
    private final OrderTaskService orderTaskService;
    private final OrderMetalTotalService orderMetalTotalService;
    private final OrderMetalCastingPaginationResolver orderMetalCastingPaginationResolver;

    @Override
    @Transactional
    public void createOrderMetalCastings(BigDecimal priceGram, Casting casting) {
        List<OrderTask> orderTasks = orderTaskService.getOrderTasksByCastingId(casting.getId());
        orderTasks.forEach(orderTask -> createOrderMetalCasting(priceGram, casting, orderTask));
    }

    private void createOrderMetalCasting(BigDecimal priceGram, Casting casting, OrderTask orderTask) {
        if (orderTask.getStatus() != OrderTaskStatus.COMPLETED) {
            throw new InvalidDataException(ErrorCode.ORDER_TASK_NOT_COMPLETED, "Order task with id %d is not completed".formatted(orderTask.getId()));
        }
        if (orderTask.getWeight() == null) {
            throw new InvalidDataException("Weight must not be null for order task with id %d".formatted(orderTask.getId()));
        }
        if (orderTask.getWeight().compareTo(BigDecimal.ZERO) < 0) {
            throw new InvalidDataException("Weight must be greater than 0 for order task with id %d".formatted(orderTask.getId()));
        }
        OrderMetalCasting orderMetalCasting = OrderMetalCastingMapper.toOrderMetalCasting(priceGram, casting, orderTask);
        orderMetalTotalService.addWeightAndCost(orderTask.getOrder().getId(), casting.getMetal().getId(),
                casting.getMetalPurity().getId(), orderTask.getWeight(), orderMetalCasting.getCost());
        orderMetalCastingRepository.save(orderMetalCasting);
    }

    @Override
    @Transactional(readOnly = true)
    public SearchDto<OrderMetalCastingDto> searchOrderMetalCastings(SearchRequestDto<OrderMetalCastingSearchCriteriaDto> orderMetalCastingSearchQueryDto) {
        Pageable pageable = orderMetalCastingPaginationResolver.createPageable(
                orderMetalCastingSearchQueryDto.getPage(),
                orderMetalCastingSearchQueryDto.getSize(),
                orderMetalCastingSearchQueryDto.getSorts()
        );
        Specification<OrderMetalCasting> specification = OrderMetalCastingSpecification.create(orderMetalCastingSearchQueryDto.getSearchCriteria());
        Page<OrderMetalCasting> result = orderMetalCastingRepository.findAll(specification, pageable);
        List<Long> orderTaskIds = result.getContent().stream()
                .map(OrderMetalCasting::getOrderTask)
                .map(OrderTask::getId)
                .toList();
        Map<Long, OrderTaskCastingDto> orderTaskCastingDtoListMappedById = orderTaskService.getOrderTaskCastingDtoListMappedById(orderTaskIds);
        return OrderMetalCastingMapper.toOrderMetalCastingDtoPage(result, orderTaskCastingDtoListMappedById);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderMetalCastingDto> getOrderMetalCastingsByOrderId(Long orderId) {
        List<OrderMetalCasting> orderMetalCastings = orderMetalCastingRepository.findAllByOrderTaskOrderId(orderId);
        List<Long> orderTaskIds = orderMetalCastings.stream()
                .map(OrderMetalCasting::getOrderTask)
                .map(OrderTask::getId)
                .toList();
        Map<Long, OrderTaskCastingDto> orderTaskCastingDtoListMappedById = orderTaskService.getOrderTaskCastingDtoListMappedById(orderTaskIds);
        return OrderMetalCastingMapper.toOrderMetalCastingDtoList(orderMetalCastings, orderTaskCastingDtoListMappedById);
    }
}
