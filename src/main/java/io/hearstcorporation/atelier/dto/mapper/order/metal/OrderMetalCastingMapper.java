package io.hearstcorporation.atelier.dto.mapper.order.metal;

import io.hearstcorporation.atelier.dto.mapper.casting.CastingMapper;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalCastingDto;
import io.hearstcorporation.atelier.dto.model.order.task.OrderTaskCastingDto;
import io.hearstcorporation.atelier.model.casting.Casting;
import io.hearstcorporation.atelier.model.order.metal.OrderMetalCasting;
import io.hearstcorporation.atelier.model.order.task.OrderTask;
import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Page;
import org.springframework.lang.NonNull;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@UtilityClass
public class OrderMetalCastingMapper {

    public static OrderMetalCasting toOrderMetalCasting(@NonNull BigDecimal priceGram, @NonNull Casting casting,
                                                        @NonNull OrderTask orderTask) {
        OrderMetalCasting orderMetalCasting = new OrderMetalCasting();
        orderMetalCasting.setCasting(casting);
        orderMetalCasting.setOrderTask(orderTask);
        orderMetalCasting.setCost(priceGram.multiply(orderTask.getWeight()));
        return orderMetalCasting;
    }

    public static SearchDto<OrderMetalCastingDto> toOrderMetalCastingDtoPage(Page<OrderMetalCasting> orderMetalCastingPage,
                                                                             Map<Long, OrderTaskCastingDto> orderTaskCastingDtoListMappedById) {
        return new SearchDto<>(
                orderMetalCastingPage.getContent().stream()
                        .map(orderMetalCasting -> OrderMetalCastingMapper.toOrderMetalCastingDto(
                                orderMetalCasting,
                                orderTaskCastingDtoListMappedById.get(orderMetalCasting.getOrderTask().getId()))
                        ).toList(),
                orderMetalCastingPage.getNumber(),
                orderMetalCastingPage.getSize(),
                orderMetalCastingPage.getTotalPages(),
                orderMetalCastingPage.getTotalElements()
        );
    }

    public static List<OrderMetalCastingDto> toOrderMetalCastingDtoList(List<OrderMetalCasting> orderMetalCastings,
                                                                        Map<Long, OrderTaskCastingDto> orderTaskCastingDtoListMappedById) {
        return orderMetalCastings.stream()
                .map(orderMetalCasting -> OrderMetalCastingMapper.toOrderMetalCastingDto(
                        orderMetalCasting,
                        orderTaskCastingDtoListMappedById.get(orderMetalCasting.getOrderTask().getId()))
                ).toList();
    }

    private static OrderMetalCastingDto toOrderMetalCastingDto(OrderMetalCasting orderMetalCasting, OrderTaskCastingDto orderTaskCastingDto) {
        if (orderMetalCasting == null) {
            return null;
        }
        return OrderMetalCastingDto.builder()
                .id(orderMetalCasting.getId())
                .cost(orderMetalCasting.getCost())
                .createdAt(orderMetalCasting.getCreatedAt())
                .casting(CastingMapper.toCastingMetalDto(orderMetalCasting.getCasting()))
                .orderTask(orderTaskCastingDto)
                .build();
    }
}
