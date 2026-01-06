package io.hearstcorporation.atelier.dto.model.order.task;

import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.ModelNameDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalDto;
import io.hearstcorporation.atelier.model.order.task.OrderTaskStatus;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Getter
@Builder
public class OrderTaskDto {

    private Long id;
    private Instant createdAt;
    private Integer stlCount;
    private BigDecimal weight;
    private OrderTaskStatus status;
    private Long castingId;
    private ModelNameDto order;
    private ModelNameDto cylinder;
    private List<MetalDto> metals;
    private List<ImageDto> orderTaskImages;
}
