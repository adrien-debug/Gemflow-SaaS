package io.hearstcorporation.atelier.specification.order.task;

import io.hearstcorporation.atelier.dto.model.order.task.OrderTaskSearchCriteriaDto;
import io.hearstcorporation.atelier.model.casting.Casting_;
import io.hearstcorporation.atelier.model.order.Order_;
import io.hearstcorporation.atelier.model.order.task.OrderTask;
import io.hearstcorporation.atelier.model.order.task.OrderTaskMetal;
import io.hearstcorporation.atelier.model.order.task.OrderTaskMetal_;
import io.hearstcorporation.atelier.model.order.task.OrderTask_;
import io.hearstcorporation.atelier.model.setting.Cylinder_;
import io.hearstcorporation.atelier.model.setting.Metal_;
import io.hearstcorporation.atelier.specification.PredicateBuilder;
import lombok.experimental.UtilityClass;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

@UtilityClass
public class OrderTaskSpecification {

    public static Specification<OrderTask> create(OrderTaskSearchCriteriaDto orderTaskSearchCriteria) {
        return (root, query, cb) -> {
            PredicateBuilder<OrderTask> builder = new PredicateBuilder<>(root, query, cb);

            if (orderTaskSearchCriteria == null) {
                return builder.build();
            }

            builder.in(OrderTask_.status, orderTaskSearchCriteria.getStatuses())
                    .equal(builder.getField(OrderTask_.order).get(Order_.id), orderTaskSearchCriteria.getOrderId())
                    .in(builder.getField(OrderTask_.casting).get(Casting_.cylinder).get(Cylinder_.id), orderTaskSearchCriteria.getCylinderIds());

            if (CollectionUtils.isNotEmpty(orderTaskSearchCriteria.getMetalIds())) {
                PredicateBuilder<OrderTaskMetal> orderMetalBuilder = builder.subquery(OrderTaskMetal.class);
                builder.and(
                        orderMetalBuilder
                                .equal(orderMetalBuilder.getField(OrderTaskMetal_.orderTask).get(OrderTask_.id), builder.getField(OrderTask_.id))
                                .in(orderMetalBuilder.getField(OrderTaskMetal_.metal).get(Metal_.id), orderTaskSearchCriteria.getMetalIds())
                                .exists()
                );
            }

            if (StringUtils.isNotBlank(orderTaskSearchCriteria.getSearchInput())) {
                builder.and(
                        builder.query().likeOr(builder.getField(OrderTask_.order).get(Order_.name), orderTaskSearchCriteria.getSearchInput())
                                .likeNumberOr(OrderTask_.id, orderTaskSearchCriteria.getSearchInput())
                                .build()
                );
            }

            return builder.build();
        };
    }
}
