package io.hearstcorporation.atelier.dto.mapper.order;

import io.hearstcorporation.atelier.dto.mapper.administration.ClientMapper;
import io.hearstcorporation.atelier.dto.mapper.inventory.gemstone.GemstoneMapper;
import io.hearstcorporation.atelier.dto.mapper.order.stock.OrderStockMapper;
import io.hearstcorporation.atelier.dto.mapper.setting.CollectionMapper;
import io.hearstcorporation.atelier.dto.mapper.setting.ItemCategoryMapper;
import io.hearstcorporation.atelier.dto.mapper.setting.SegmentMapper;
import io.hearstcorporation.atelier.dto.mapper.user.UserMapper;
import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.ModelNameDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.dto.model.order.OrderCadDetailsDto;
import io.hearstcorporation.atelier.dto.model.order.OrderCadDto;
import io.hearstcorporation.atelier.dto.model.order.OrderCadRequestDto;
import io.hearstcorporation.atelier.dto.model.order.OrderDto;
import io.hearstcorporation.atelier.dto.model.order.OrderListDto;
import io.hearstcorporation.atelier.dto.model.order.OrderMaterialDto;
import io.hearstcorporation.atelier.dto.model.order.OrderRequestDto;
import io.hearstcorporation.atelier.dto.model.order.OrderSearchCriteriaDto;
import io.hearstcorporation.atelier.model.administration.Client;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.OrderSearchCriteria;
import io.hearstcorporation.atelier.model.setting.Collection;
import io.hearstcorporation.atelier.model.setting.ItemCategory;
import io.hearstcorporation.atelier.model.setting.Segment;
import io.hearstcorporation.atelier.util.PatchHelper;
import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

@UtilityClass
public class OrderMapper {

    public static void mapOrder(Order order, OrderRequestDto orderRequestDto, Client client, ItemCategory itemCategory,
                                Collection collection, Segment segment) {
        PatchHelper.setIfNotNull(orderRequestDto.getName(), order::setName);
        PatchHelper.setIfNotNull(orderRequestDto.getPriority(), order::setPriority);
        PatchHelper.setIfNotNull(orderRequestDto.getDueDate(), order::setDueDate);
        PatchHelper.setIfNotNull(orderRequestDto.getAcceptanceDate(), order::setAcceptanceDate);
        PatchHelper.setIfNotNull(orderRequestDto.getLength(), order::setLength);
        PatchHelper.setIfNotNull(orderRequestDto.getSizeSystem(), order::setSizeSystem);
        PatchHelper.setIfNotNull(orderRequestDto.getFingerSize(), order::setFingerSize);
        PatchHelper.setIfNotNull(orderRequestDto.getDescription(), order::setDescription);
        PatchHelper.setIfNotNull(orderRequestDto.getStoneInPacket(), order::setStoneInPacket);
        PatchHelper.setIfNotNull(orderRequestDto.getSettingType(), order::setSettingType);
        order.setClient(client);
        order.setItemCategory(itemCategory);
        order.setCollection(collection);
        order.setSegment(segment);
    }

    public static void mapOrderCad(Order order, OrderCadRequestDto orderRequestDto) {
        PatchHelper.setIfNotNull(orderRequestDto.getStlCount(), order::setStlCount);
    }

    public static void copyOrderCad(Order order, Order fromOrder) {
        order.setStlCount(fromOrder.getStlCount());
    }

    public static OrderDto toOrderDto(Order order, List<ImageDto> productImages, List<OrderMaterialDto> materials) {
        if (order == null) {
            return null;
        }
        return OrderDto.builder()
                .id(order.getId())
                .name(order.getName())
                .priority(order.getPriority())
                .dueDate(order.getDueDate())
                .acceptanceDate(order.getAcceptanceDate())
                .status(order.getStatus())
                .length(order.getLength())
                .sizeSystem(order.getSizeSystem())
                .fingerSize(order.getFingerSize())
                .description(order.getDescription())
                .createdAt(order.getCreatedAt())
                .client(ClientMapper.toClientShortDto(order.getClient()))
                .itemCategory(ItemCategoryMapper.toItemCategoryDto(order.getItemCategory()))
                .collection(CollectionMapper.toCollectionDto(order.getCollection()))
                .segment(SegmentMapper.toSegmentDto(order.getSegment()))
                .stoneInPacket(order.getStoneInPacket())
                .settingType(order.getSettingType())
                .gemstones(order.getGemstones().stream().map(GemstoneMapper::toGemstoneShortDto).toList())
                .productImages(productImages)
                .materials(materials)
                .labourHourlyRate(order.getLabourHourlyRate())
                .stock(OrderStockMapper.toOrderStockDto(order.getOrderStock()))
                .createdBy(UserMapper.toUserShortDto(order.getCreatedBy()))
                .build();
    }

    public static OrderCadDto toOrderCadDto(Order order, List<ImageDto> cadImages,
                                            List<ImageDto> castingPartsImages,
                                            List<ImageDto> diamondMapImages,
                                            List<AtelierDownloadFileDto> stlFiles,
                                            List<AtelierDownloadFileDto> cadFiles) {
        if (order == null) {
            return null;
        }
        return OrderCadDto.builder()
                .stlCount(order.getStlCount())
                .cadImages(cadImages)
                .castingPartsImages(castingPartsImages)
                .diamondMapImages(diamondMapImages)
                .stlFiles(stlFiles)
                .cadFiles(cadFiles)
                .build();
    }

    public static OrderCadDetailsDto toOrderCadDetailsDto(Order order, List<ImageDto> cadImages,
                                                          List<ImageDto> castingPartsImages,
                                                          List<ImageDto> diamondMapImages) {
        if (order == null) {
            return null;
        }
        return OrderCadDetailsDto.builder()
                .stlCount(order.getStlCount())
                .cadImages(cadImages)
                .castingPartsImages(castingPartsImages)
                .diamondMapImages(diamondMapImages)
                .build();
    }

    public static SearchDto<OrderListDto> toOrderListDtoPage(Page<Order> orderPage,
                                                             Map<Long, List<ImageDto>> productImagesGroupedByOrderId) {
        return new SearchDto<>(
                orderPage.getContent().stream()
                        .map(order -> OrderMapper.toOrderListDto(order,
                                productImagesGroupedByOrderId.get(order.getId())))
                        .toList(),
                orderPage.getNumber(),
                orderPage.getSize(),
                orderPage.getTotalPages(),
                orderPage.getTotalElements()
        );
    }

    public static OrderListDto toOrderListDto(Order order, List<ImageDto> productImages) {
        if (order == null) {
            return null;
        }
        return OrderListDto.builder()
                .id(order.getId())
                .name(order.getName())
                .priority(order.getPriority())
                .dueDate(order.getDueDate())
                .status(order.getStatus())
                .createdAt(order.getCreatedAt())
                .client(ClientMapper.toClientShortDto(order.getClient()))
                .segment(SegmentMapper.toSegmentDto(order.getSegment()))
                .itemCategory(ItemCategoryMapper.toItemCategoryDto(order.getItemCategory()))
                .collection(CollectionMapper.toCollectionDto(order.getCollection()))
                .productImages(productImages)
                .stock(OrderStockMapper.toOrderStockDto(order.getOrderStock()))
                .build();
    }

    public static ModelNameDto toModelNameDto(Order order) {
        if (order == null) {
            return null;
        }
        return ModelNameDto.builder()
                .id(order.getId())
                .name(order.getName())
                .build();
    }

    public static Long toOrderId(Order order) {
        return order != null ? order.getId() : null;
    }

    public static OrderSearchCriteria toOrderSearchCriteria(OrderSearchCriteriaDto orderSearchCriteriaDto) {
        OrderSearchCriteria searchCriteria = new OrderSearchCriteria();
        searchCriteria.setSearchInput(orderSearchCriteriaDto.getSearchInput());
        searchCriteria.setStatuses(orderSearchCriteriaDto.getStatuses());
        searchCriteria.setInStock(false);
        return searchCriteria;
    }
}
