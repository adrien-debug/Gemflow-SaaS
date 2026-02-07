package io.hearstcorporation.atelier.specification.order.metal;

import io.hearstcorporation.atelier.dto.model.order.metal.OrderMetalCastingSearchCriteriaDto;
import io.hearstcorporation.atelier.model.order.Order_;
import io.hearstcorporation.atelier.model.order.metal.OrderMetalCasting;
import io.hearstcorporation.atelier.model.order.metal.OrderMetalCasting_;
import io.hearstcorporation.atelier.model.order.task.OrderTask_;
import io.hearstcorporation.atelier.specification.PredicateBuilder;
import lombok.experimental.UtilityClass;
import org.springframework.data.jpa.domain.Specification;

@UtilityClass
public class OrderMetalCastingSpecification {

    public static Specification<OrderMetalCasting> create(OrderMetalCastingSearchCriteriaDto orderMetalCastingSearchCriteriaDto) {
        return (root, query, cb) -> {

            PredicateBuilder<OrderMetalCasting> orderMetalCastingBuilder = new PredicateBuilder<>(root, query, cb);

            if (orderMetalCastingSearchCriteriaDto == null) {
                return orderMetalCastingBuilder.build();
            }

            orderMetalCastingBuilder.in(orderMetalCastingBuilder.getField(OrderMetalCasting_.orderTask).get(OrderTask_.order).get(Order_.id),
                    orderMetalCastingSearchCriteriaDto.getOrderIds());

            return orderMetalCastingBuilder.build();
        };
    }
}
