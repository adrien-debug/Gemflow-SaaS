package io.hearstcorporation.atelier.dto.model.order;

import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.administration.ClientShortDto;
import io.hearstcorporation.atelier.dto.model.inventory.gemstone.GemstoneShortDto;
import io.hearstcorporation.atelier.dto.model.order.stock.OrderStockDto;
import io.hearstcorporation.atelier.dto.model.setting.CollectionDto;
import io.hearstcorporation.atelier.dto.model.setting.ItemCategoryDto;
import io.hearstcorporation.atelier.dto.model.setting.SegmentDto;
import io.hearstcorporation.atelier.dto.model.user.UserShortDto;
import io.hearstcorporation.atelier.model.Priority;
import io.hearstcorporation.atelier.model.SettingType;
import io.hearstcorporation.atelier.model.SizeSystem;
import io.hearstcorporation.atelier.model.order.OrderStatus;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
public class OrderDto {

    private Long id;
    private String name;
    private Priority priority;
    private LocalDate dueDate;
    private LocalDate acceptanceDate;
    private OrderStatus status;
    private Integer length;
    private SizeSystem sizeSystem;
    private Integer fingerSize;
    private String description;
    private Instant createdAt;
    private ClientShortDto client;
    private ItemCategoryDto itemCategory;
    private CollectionDto collection;
    private SegmentDto segment;
    private Boolean stoneInPacket;
    private SettingType settingType;
    private List<GemstoneShortDto> gemstones;
    private List<ImageDto> productImages;
    private List<OrderMaterialDto> materials;
    private BigDecimal labourHourlyRate;
    private UserShortDto createdBy;
    private OrderStockDto stock;
}
