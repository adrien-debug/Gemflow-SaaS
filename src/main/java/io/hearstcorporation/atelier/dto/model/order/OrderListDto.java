package io.hearstcorporation.atelier.dto.model.order;

import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.administration.ClientShortDto;
import io.hearstcorporation.atelier.dto.model.order.stock.OrderStockDto;
import io.hearstcorporation.atelier.dto.model.setting.CollectionDto;
import io.hearstcorporation.atelier.dto.model.setting.ItemCategoryDto;
import io.hearstcorporation.atelier.dto.model.setting.SegmentDto;
import io.hearstcorporation.atelier.model.Priority;
import io.hearstcorporation.atelier.model.order.OrderStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
public class OrderListDto {

    private Long id;
    private String name;
    private Priority priority;
    private LocalDate dueDate;
    private OrderStatus status;
    private Instant createdAt;
    private ClientShortDto client;
    private SegmentDto segment;
    private ItemCategoryDto itemCategory;
    private CollectionDto collection;
    private List<ImageDto> productImages;
    private OrderStockDto stock;
}
