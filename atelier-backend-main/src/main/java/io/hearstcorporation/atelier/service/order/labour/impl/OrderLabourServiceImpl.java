package io.hearstcorporation.atelier.service.order.labour.impl;

import io.hearstcorporation.atelier.dto.mapper.order.labour.OrderLabourMapper;
import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.LogTimeRequestDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourRequestDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourSummaryDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourUpdateDto;
import io.hearstcorporation.atelier.dto.model.order.labour.TaskTypeSummaryDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.labour.LabourTaskType;
import io.hearstcorporation.atelier.model.order.labour.OrderLabour;
import io.hearstcorporation.atelier.model.order.labour.OrderLabourTaskTypeSummary;
import io.hearstcorporation.atelier.model.user.User;
import io.hearstcorporation.atelier.pagination.PaginationResolver;
import io.hearstcorporation.atelier.repository.order.labour.OrderLabourRepository;
import io.hearstcorporation.atelier.service.order.OrderService;
import io.hearstcorporation.atelier.service.order.labour.OrderLabourService;
import io.hearstcorporation.atelier.service.user.UserImageService;
import io.hearstcorporation.atelier.service.user.UserService;
import io.hearstcorporation.atelier.specification.order.labour.OrderLabourSpecification;
import io.hearstcorporation.atelier.util.ExceptionWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderLabourServiceImpl implements OrderLabourService {

    private final OrderLabourRepository orderLabourRepository;
    private final UserService userService;
    private final OrderService orderService;
    private final PaginationResolver orderLabourPaginationResolver;
    private final UserImageService userImageService;

    @Override
    @Transactional
    public Long createOrderLabour(OrderLabourRequestDto orderLabourRequestDto) {
        User employee = userService.getUser(orderLabourRequestDto.getEmployeeId());
        Order order = orderService.getOrder(orderLabourRequestDto.getOrderId());
        OrderLabour orderLabour = OrderLabourMapper.toOrderLabour(orderLabourRequestDto, employee, order);
        orderLabour = orderLabourRepository.save(orderLabour);
        return orderLabour.getId();
    }

    @Override
    @Transactional
    public void updateOrderLabour(Long orderLabourId, OrderLabourUpdateDto orderLabourRequestDto) {
        OrderLabour orderLabour = getOrderLabour(orderLabourId);
        User employee = userService.getUser(orderLabourRequestDto.getEmployeeId());
        OrderLabourMapper.mapOrderLabour(orderLabour, orderLabourRequestDto, employee);
        orderLabourRepository.save(orderLabour);
    }

    @Override
    @Transactional
    public void deleteOrderLabour(Long orderLabourId) {
        OrderLabour orderLabour = getOrderLabour(orderLabourId);
        ExceptionWrapper.onDelete(() -> orderLabourRepository.deleteById(orderLabour.getId()),
                "Order labour %d cannot be deleted.".formatted(orderLabour.getId()));
    }

    @Override
    @Transactional
    public void createOrderLabour(Long orderId, LogTimeRequestDto spentSeconds, LabourTaskType taskType) {
        User employee = userService.getUser(spentSeconds.getEmployeeId());
        Order order = orderService.getOrder(orderId);

        OrderLabour orderLabour = new OrderLabour();
        orderLabour.setTaskType(taskType);
        orderLabour.setSpentSeconds(spentSeconds.getSpentSeconds());
        orderLabour.setDate(LocalDate.now());
        orderLabour.setEmployee(employee);
        orderLabour.setOrder(order);
        orderLabourRepository.save(orderLabour);
    }

    @Override
    public boolean isOrderLabourExists(Long orderId) {
        return orderLabourRepository.existsByOrderId(orderId);
    }

    @Override
    public OrderLabourDto getOrderLabourDto(Long orderLabourId) {
        OrderLabour orderLabour = getFullOrderLabour(orderLabourId);
        List<ImageDto> employeeImages = userImageService.getImageDtoList(orderLabour.getEmployee().getId());
        return OrderLabourMapper.toOrderLabourDto(orderLabour, employeeImages);
    }

    @Override
    @Transactional(readOnly = true)
    public SearchDto<OrderLabourDto> searchOrderLabours(SearchRequestDto<OrderLabourSearchCriteriaDto> searchQuery) {
        Pageable pageable = orderLabourPaginationResolver.createPageable(
                searchQuery.getPage(),
                searchQuery.getSize(),
                searchQuery.getSorts()
        );
        Specification<OrderLabour> specification = OrderLabourSpecification.create(searchQuery.getSearchCriteria());
        Page<OrderLabour> result = orderLabourRepository.findAll(specification, pageable);
        List<Long> userIds = result.getContent().stream().map(OrderLabour::getEmployee).map(User::getId).toList();
        Map<Long, List<ImageDto>> imagesGroupedByUserId = userImageService.getImageDtoListGroupedByUserId(userIds);
        return OrderLabourMapper.toOrderLabourDtoPage(result, imagesGroupedByUserId);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderLabourSummaryDto getOrderLaboursSummary(Long orderId) {
        OrderLabourSummaryDto result = new OrderLabourSummaryDto();
        Order order = orderService.getOrder(orderId);
        BigDecimal hourlyRate = order.getLabourHourlyRate();
        List<OrderLabourTaskTypeSummary> orderTaskTypeSummaries = orderLabourRepository.getOrderLabourTaskTypeSummary(orderId);
        orderTaskTypeSummaries.forEach(summary -> {
            TaskTypeSummaryDto taskTypeSummary = new TaskTypeSummaryDto(summary, hourlyRate);
            result.addTaskTypeSummary(taskTypeSummary);
        });
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public OrderLabour getOrderLabour(Long orderLabourId) {
        return retrieveLabour(orderLabourId, orderLabourRepository.findById(orderLabourId));
    }

    @Override
    public OrderLabour getFullOrderLabour(Long orderLabourId) {
        return retrieveLabour(orderLabourId, orderLabourRepository.findLabourById(orderLabourId));
    }

    private OrderLabour retrieveLabour(Long labourId, Optional<OrderLabour> labourOpt) {
        return labourOpt.orElseThrow(
                () -> new NotFoundException("Order labour with id %d was not found.".formatted(labourId))
        );
    }

    @Override
    @Transactional(readOnly = true)
    public OrderLabourTaskTypeSummary getOrderLabourTaskTypeSummary(Long orderId, Long userId, LabourTaskType taskType) {
        return orderLabourRepository.getOrderLabourTaskTypeSummary(orderId, userId, taskType);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderLabourTaskTypeSummary> getOrderLabourTaskTypeSummaries(Long orderId, Long userId) {
        return orderLabourRepository.getOrderLabourTaskTypeSummary(orderId, userId);
    }
}
