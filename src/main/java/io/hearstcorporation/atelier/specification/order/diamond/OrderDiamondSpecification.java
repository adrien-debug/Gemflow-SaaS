package io.hearstcorporation.atelier.specification.order.diamond;

import io.hearstcorporation.atelier.dto.model.order.diamond.OrderDiamondSearchCriteriaDto;
import io.hearstcorporation.atelier.model.order.Order_;
import io.hearstcorporation.atelier.model.order.diamon.OrderDiamond;
import io.hearstcorporation.atelier.model.order.diamon.OrderDiamond_;
import io.hearstcorporation.atelier.specification.PredicateBuilder;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

@UtilityClass
public class OrderDiamondSpecification {

    public static Specification<OrderDiamond> create(OrderDiamondSearchCriteriaDto searchCriteria) {
        return (root, query, cb) -> {
            PredicateBuilder<OrderDiamond> builder = new PredicateBuilder<>(root, query, cb);

            if (searchCriteria == null) {
                return builder.build();
            }

            builder.in(OrderDiamond_.status, searchCriteria.getStatuses())
                    .in(root.get(OrderDiamond_.ORDER).get(Order_.ID), searchCriteria.getOrderIds());

            if (StringUtils.isNotBlank(searchCriteria.getSearchInput())) {
                builder.and(
                        builder.query()
                                .likeNumberOr(OrderDiamond_.id, searchCriteria.getSearchInput())
                                .build()
                );
            }

            return builder.build();
        };
    }
}
