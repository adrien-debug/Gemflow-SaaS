package io.hearstcorporation.atelier.service.order.impl;

import io.hearstcorporation.atelier.dto.mapper.order.OrderMapper;
import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.PriorityRequestDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.dto.model.order.OrderCadDetailsDto;
import io.hearstcorporation.atelier.dto.model.order.OrderCadDto;
import io.hearstcorporation.atelier.dto.model.order.OrderCadRequestDto;
import io.hearstcorporation.atelier.dto.model.order.OrderDto;
import io.hearstcorporation.atelier.dto.model.order.OrderListDto;
import io.hearstcorporation.atelier.dto.model.order.OrderMaterialDto;
import io.hearstcorporation.atelier.dto.model.order.OrderRequestDto;
import io.hearstcorporation.atelier.dto.model.order.OrderStatusRequestDto;
import io.hearstcorporation.atelier.exception.AlreadyExistsException;
import io.hearstcorporation.atelier.exception.IllegalStateException;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.administration.Client;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.OrderFileType;
import io.hearstcorporation.atelier.model.order.OrderImageType;
import io.hearstcorporation.atelier.model.order.OrderSearchCriteria;
import io.hearstcorporation.atelier.model.order.OrderStatus;
import io.hearstcorporation.atelier.model.order.stock.OrderStock;
import io.hearstcorporation.atelier.model.setting.Collection;
import io.hearstcorporation.atelier.model.setting.ItemCategory;
import io.hearstcorporation.atelier.model.setting.LabourSetting;
import io.hearstcorporation.atelier.model.setting.Segment;
import io.hearstcorporation.atelier.pagination.PaginationResolver;
import io.hearstcorporation.atelier.repository.order.OrderRepository;
import io.hearstcorporation.atelier.service.administration.ClientService;
import io.hearstcorporation.atelier.service.order.OrderFileService;
import io.hearstcorporation.atelier.service.order.OrderImageService;
import io.hearstcorporation.atelier.service.order.OrderMaterialService;
import io.hearstcorporation.atelier.service.order.OrderService;
import io.hearstcorporation.atelier.service.setting.CollectionService;
import io.hearstcorporation.atelier.service.setting.ItemCategoryService;
import io.hearstcorporation.atelier.service.setting.LabourSettingService;
import io.hearstcorporation.atelier.service.setting.SegmentService;
import io.hearstcorporation.atelier.specification.order.OrderSpecification;
import io.hearstcorporation.atelier.util.ExceptionWrapper;
import io.hearstcorporation.atelier.util.PatchHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ClientService clientService;
    private final ItemCategoryService itemCategoryService;
    private final SegmentService segmentService;
    private final CollectionService collectionService;
    private final OrderImageService orderImageService;
    private final OrderFileService orderFileService;
    private final OrderMaterialService orderMaterialService;
    private final LabourSettingService labourSettingService;
    private final PaginationResolver orderPaginationResolver;

    @Override
    @Transactional
    public Order createOrder(OrderRequestDto orderRequestDto) {
        Order order = new Order();
        setCurrentHourlyRate(order);
        return updateOrder(order, orderRequestDto);
    }

    private void setCurrentHourlyRate(Order order) {
        LabourSetting labourSetting = labourSettingService.getLabourSetting();
        if (labourSetting == null || labourSetting.getHourlyRate() == null) {
            throw new IllegalStateException("Labour hourly rate in setting must not be null");
        }
        order.setLabourHourlyRate(labourSetting.getHourlyRate());
    }

    @Override
    @Transactional
    public void updateOrder(Long orderId, OrderRequestDto orderRequestDto) {
        Order order = getOrder(orderId);
        updateOrder(order, orderRequestDto);
    }

    private Order updateOrder(Order order, OrderRequestDto orderRequestDto) {
        Client client = clientService.getClient(orderRequestDto.getClientId().orElseThrow());
        ItemCategory itemCategory = itemCategoryService.getItemCategory(orderRequestDto.getItemCategoryId().orElseThrow());
        Segment segment = segmentService.getSegment(orderRequestDto.getSegmentId().orElseThrow());
        Collection collection = PatchHelper.mapOrNull(orderRequestDto.getCollectionId(), collectionService::getCollection);
        OrderMapper.mapOrder(order, orderRequestDto, client, itemCategory, collection, segment);
        order = orderRepository.save(order);
        if (Objects.nonNull(orderRequestDto.getProductImages())) {
            orderImageService.updateOrderImages(OrderImageType.PRODUCT, PatchHelper.getOrEmptyList(orderRequestDto.getProductImages()), order);
        }
        orderMaterialService.updateOrderMaterials(order, PatchHelper.getOrNull(orderRequestDto.getMaterials()));
        orderMaterialService.orderMaterialExistsOrThrow(order.getId());
        return order;
    }

    @Override
    @Transactional
    public void updateOrderCad(Long orderId, OrderCadRequestDto orderCadRequestDto) {
        Order order = getOrder(orderId);
        OrderMapper.mapOrderCad(order, orderCadRequestDto);
        orderRepository.save(order);
        if (Objects.nonNull(orderCadRequestDto.getCadImages())) {
            orderImageService.updateOrderImages(OrderImageType.CAD, PatchHelper.getOrEmptyList(orderCadRequestDto.getCadImages()), order);
        }
        if (Objects.nonNull(orderCadRequestDto.getCastingPartsImages())) {
            orderImageService.updateOrderImages(OrderImageType.CASTING_PARTS, PatchHelper.getOrEmptyList(orderCadRequestDto.getCastingPartsImages()), order);
        }
        if (Objects.nonNull(orderCadRequestDto.getDiamondMapImages())) {
            orderImageService.updateOrderImages(OrderImageType.DIAMOND_MAP, PatchHelper.getOrEmptyList(orderCadRequestDto.getDiamondMapImages()), order);
        }
        orderFileService.updateOrderFiles(OrderFileType.STL, PatchHelper.getOrEmptyList(orderCadRequestDto.getCreateStlFileIds()),
                PatchHelper.getOrEmptyList(orderCadRequestDto.getDeletedStlFileIds()), order);
        orderFileService.updateOrderFiles(OrderFileType.CAD, PatchHelper.getOrEmptyList(orderCadRequestDto.getCreateCadFileIds()),
                PatchHelper.getOrEmptyList(orderCadRequestDto.getDeletedCadFileIds()), order);
    }

    @Override
    @Transactional
    public void copyCadFromOrder(Long orderId, Long fromOrderId) {
        Order order = getOrder(orderId);
        Order fromOrder = getOrder(fromOrderId);
        OrderMapper.copyOrderCad(order, fromOrder);
        orderRepository.save(order);
        orderImageService.copyOrderImages(OrderImageType.CAD, order, fromOrder);
        orderFileService.copyOrderFiles(OrderFileType.STL, order, fromOrder);
        orderFileService.copyOrderFiles(OrderFileType.CAD, order, fromOrder);
    }

    @Override
    @Transactional(readOnly = true)
    public void orderCadExistsOrThrow(Long orderId) {
        Order order = getOrder(orderId);
        if (order.getStlCount() == null || order.getStlCount() == 0
                || !orderImageService.isOrderImagesExists(orderId, OrderImageType.CAD)) {
            throw new IllegalStateException("Order %d must contain CAD image and the number of STLs must be greater than 0."
                    .formatted(orderId));
        }
    }

    @Override
    @Transactional
    public void updateOrderStatus(Long orderId, OrderStatusRequestDto orderStatusRequestDto) {
        updateOrderStatus(orderId, orderStatusRequestDto.getStatus());
    }

    @Override
    @Transactional
    public void updateOrderStatus(Long orderId, OrderStatus orderStatus) {
        Order order = getOrder(orderId);
        order.setStatus(orderStatus);
        orderRepository.save(order);
    }

    @Override
    @Transactional
    public void updateOrderPriority(Long orderId, PriorityRequestDto priorityRequestDto) {
        Order order = getOrder(orderId);
        order.setPriority(priorityRequestDto.getPriority());
        orderRepository.save(order);
    }

    @Override
    @Transactional
    public void updateAcceptanceDate(Long orderId, LocalDate acceptanceDate) {
        Order order = getOrder(orderId);
        order.setAcceptanceDate(acceptanceDate);
        orderRepository.save(order);
    }

    @Override
    @Transactional
    public void updateOrderClient(Long orderId, Long clientId) {
        Order order = getOrder(orderId);
        Client client = clientService.getClient(clientId);
        order.setClient(client);
        orderRepository.save(order);
    }

    @Override
    public void orderStockNotExistsOrThrow(Long orderId) {
        Order order = getOrder(orderId);
        if (order.getOrderStock() != null) {
            throw new AlreadyExistsException("Stock for order with id %d already exists.".formatted(orderId));
        }
    }

    @Override
    @Transactional
    public void finishProduction(Long orderId, OrderStock orderStock) {
        Order order = getOrder(orderId);
        order.setStatus(OrderStatus.FINISHED);
        order.setOrderStock(orderStock);
        orderRepository.save(order);
    }

    @Override
    @Transactional
    public void deleteOrder(Long orderId) {
        Order order = getOrder(orderId);
        ExceptionWrapper.onDelete(() -> orderRepository.deleteById(order.getId()),
                "Order %d cannot be deleted.".formatted(orderId));
    }

    @Override
    @Transactional(readOnly = true)
    public SearchDto<OrderListDto> searchOrders(SearchRequestDto<OrderSearchCriteria> orderSearchQueryDto) {
        Pageable pageable = orderPaginationResolver.createPageable(
                orderSearchQueryDto.getPage(),
                orderSearchQueryDto.getSize(),
                orderSearchQueryDto.getSorts()
        );
        Specification<Order> specification = OrderSpecification.create(orderSearchQueryDto.getSearchCriteria());
        Page<Order> result = orderRepository.findAll(specification, pageable);
        List<Long> orderIds = result.getContent().stream().map(Order::getId).toList();
        Map<Long, List<ImageDto>> productImagesGroupedByOrderId =
                orderImageService.getImageDtoListGroupedByOrderId(orderIds, OrderImageType.PRODUCT);
        return OrderMapper.toOrderListDtoPage(result, productImagesGroupedByOrderId);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderDto getOrderDto(Long orderId) {
        Order order = getFullOrder(orderId);
        List<ImageDto> orderImages = orderImageService.getImageDtoList(orderId, OrderImageType.PRODUCT);
        List<OrderMaterialDto> materials = orderMaterialService.getOrderMaterialDtoList(orderId);
        return OrderMapper.toOrderDto(order, orderImages, materials);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderCadDto getOrderCadDto(Long orderId) {
        Order order = getOrder(orderId);
        List<ImageDto> cadImages = orderImageService.getImageDtoList(orderId, OrderImageType.CAD);
        List<ImageDto> castingPartsImages = orderImageService.getImageDtoList(orderId, OrderImageType.CASTING_PARTS);
        List<ImageDto> diamondMapImages = orderImageService.getImageDtoList(orderId, OrderImageType.DIAMOND_MAP);
        List<AtelierDownloadFileDto> stlFiles = orderFileService.getAtelierDownloadFileDtoList(orderId, OrderFileType.STL);
        List<AtelierDownloadFileDto> cadFiles = orderFileService.getAtelierDownloadFileDtoList(orderId, OrderFileType.CAD);

        return OrderMapper.toOrderCadDto(order, cadImages, castingPartsImages, diamondMapImages, stlFiles, cadFiles);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderCadDetailsDto getOrderCadDetailsDto(Long orderId) {
        Order order = getOrder(orderId);
        List<ImageDto> cadImages = orderImageService.getImageDtoList(orderId, OrderImageType.CAD);
        List<ImageDto> castingPartsImages = orderImageService.getImageDtoList(orderId, OrderImageType.CASTING_PARTS);
        List<ImageDto> diamondMapImages = orderImageService.getImageDtoList(orderId, OrderImageType.DIAMOND_MAP);
        return OrderMapper.toOrderCadDetailsDto(order, cadImages, castingPartsImages, diamondMapImages);
    }

    @Override
    public Order getOrder(Long orderId) {
        return retrieveOrder(orderId, orderRepository.findById(orderId));
    }

    // Method must work without transactional, because collecting all with EntityGraph
    @Override
    public Order getFullOrder(Long orderId) {
        return retrieveOrder(orderId, orderRepository.findOrderById(orderId));
    }

    private Order retrieveOrder(Long orderId, Optional<Order> orderOpt) {
        return orderOpt.orElseThrow(
                () -> new NotFoundException("Order with id %d was not found.".formatted(orderId))
        );
    }

    @Override
    public List<Long> getOrderMetalIds(Long orderId) {
        return orderMaterialService.getOrderMetalIds(orderId);
    }
}
