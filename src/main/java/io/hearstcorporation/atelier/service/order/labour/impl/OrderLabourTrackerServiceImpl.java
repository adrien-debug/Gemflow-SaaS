package io.hearstcorporation.atelier.service.order.labour.impl;

import io.hearstcorporation.atelier.dto.mapper.order.labour.OrderLabourTrackerMapper;
import io.hearstcorporation.atelier.dto.model.LogTimeRequestDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourTrackerDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourTrackerStartDto;
import io.hearstcorporation.atelier.exception.AlreadyExistsException;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.labour.OrderLabourTaskTypeSummary;
import io.hearstcorporation.atelier.model.order.labour.OrderLabourTracker;
import io.hearstcorporation.atelier.model.user.User;
import io.hearstcorporation.atelier.repository.order.labour.OrderLabourTrackerRepository;
import io.hearstcorporation.atelier.service.order.OrderService;
import io.hearstcorporation.atelier.service.order.labour.OrderLabourService;
import io.hearstcorporation.atelier.service.order.labour.OrderLabourTrackerService;
import io.hearstcorporation.atelier.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderLabourTrackerServiceImpl implements OrderLabourTrackerService {

    private final OrderLabourTrackerRepository orderLabourTrackerRepository;
    private final OrderService orderService;
    private final UserService userService;
    private final OrderLabourService orderLabourService;

    @Override
    @Transactional
    public void startTracking(OrderLabourTrackerStartDto startDto) {
        User currentUser = userService.getCurrentUser();
        Long currentUserId = currentUser.getId();
        Optional<OrderLabourTracker> startedTrackerOpt = orderLabourTrackerRepository.findByEmployeeIdAndEndDateNull(currentUserId);
        if (startedTrackerOpt.isPresent()) {
            throw new AlreadyExistsException("Active tracker already exists for user with id %d related to order with id %d"
                    .formatted(currentUserId, startedTrackerOpt.get().getOrder().getId()));
        }
        Order order = orderService.getOrder(startDto.getOrderId());
        OrderLabourTracker startedTracker = OrderLabourTrackerMapper.toOrderLabourTracker(startDto, order, currentUser);
        orderLabourTrackerRepository.save(startedTracker);
    }

    @Override
    @Transactional
    public void stopTracking() {
        User currentUser = userService.getCurrentUser();
        Long currentUserId = currentUser.getId();
        Optional<OrderLabourTracker> startedTrackerOpt = orderLabourTrackerRepository.findByEmployeeIdAndEndDateNull(currentUserId);
        if (startedTrackerOpt.isEmpty()) {
            throw new NotFoundException("Active tracker not exists for user with id %d".formatted(currentUserId));
        }
        OrderLabourTracker startedTracker = startedTrackerOpt.get();
        startedTracker.setEndDate(Instant.now());
        orderLabourTrackerRepository.save(startedTracker);

        LogTimeRequestDto logTime = toLogTimeRequestDto(currentUserId, startedTracker);
        orderLabourService.createOrderLabour(startedTracker.getOrder().getId(), logTime, startedTracker.getTaskType());
    }

    private LogTimeRequestDto toLogTimeRequestDto(Long userId, OrderLabourTracker startedTracker) {
        LogTimeRequestDto logTime = new LogTimeRequestDto();
        logTime.setEmployeeId(userId);
        logTime.setSpentSeconds(ChronoUnit.SECONDS.between(startedTracker.getStartDate(), startedTracker.getEndDate()));
        return logTime;
    }

    @Override
    @Transactional(readOnly = true)
    public OrderLabourTrackerDto getActiveTracker() {
        User currentUser = userService.getCurrentUser();
        Long currentUserId = currentUser.getId();
        Optional<OrderLabourTracker> startedTrackerOpt = orderLabourTrackerRepository.findByEmployeeIdAndEndDateNull(currentUserId);
        if (startedTrackerOpt.isEmpty()) {
            throw new NotFoundException("Active tracker not exists for user with id %d".formatted(currentUserId));
        }
        OrderLabourTracker startedTracker = startedTrackerOpt.get();
        OrderLabourTaskTypeSummary taskTypeSummary = orderLabourService.getOrderLabourTaskTypeSummary(startedTracker.getOrder().getId(),
                startedTracker.getEmployee().getId(), startedTracker.getTaskType());
        return OrderLabourTrackerMapper.toOrderLabourTrackerDto(startedTracker, taskTypeSummary);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderLabourTrackerDto> getTrackers(Long orderId) {
        User currentUser = userService.getCurrentUser();
        Long currentUserId = currentUser.getId();
        Optional<OrderLabourTracker> startedTrackerOpt = orderLabourTrackerRepository.findByEmployeeIdAndOrderIdAndEndDateNull(currentUserId, orderId);
        List<OrderLabourTaskTypeSummary> taskTypeSummaries = orderLabourService.getOrderLabourTaskTypeSummaries(orderId, currentUserId);
        List<OrderLabourTrackerDto> trackerDtoList = taskTypeSummaries.stream()
                .filter(summary -> startedTrackerOpt.isEmpty() || summary.getTaskType() != startedTrackerOpt.get().getTaskType())
                .map(summary -> OrderLabourTrackerMapper.toOrderLabourTrackerDto(orderId, summary))
                .collect(Collectors.toList());
        if (startedTrackerOpt.isPresent()) {
            OrderLabourTaskTypeSummary activeTaskSummary = taskTypeSummaries.stream()
                    .filter(summary -> summary.getTaskType() == startedTrackerOpt.get().getTaskType())
                    .findFirst()
                    .orElse(null);
            trackerDtoList.add(OrderLabourTrackerMapper.toOrderLabourTrackerDto(startedTrackerOpt.get(), activeTaskSummary));
        }
        return trackerDtoList;
    }
}
