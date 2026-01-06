package io.hearstcorporation.atelier.specification.order;

import io.hearstcorporation.atelier.model.administration.Client_;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.OrderSearchCriteria;
import io.hearstcorporation.atelier.model.order.Order_;
import io.hearstcorporation.atelier.model.order.stock.OrderStock_;
import io.hearstcorporation.atelier.specification.PredicateBuilder;
import lombok.experimental.UtilityClass;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

@UtilityClass
public class OrderSpecification {

    public static Specification<Order> create(OrderSearchCriteria orderSearchCriteria) {
        return (root, query, cb) -> {

            PredicateBuilder<Order> orderBuilder = new PredicateBuilder<>(root, query, cb);

            if (orderSearchCriteria == null) {
                return orderBuilder.build();
            }

            orderBuilder.in(Order_.status, orderSearchCriteria.getStatuses());

            if (StringUtils.isNotBlank(orderSearchCriteria.getSearchInput())) {
                orderBuilder.and(
                        orderBuilder.query().likeOr(Order_.name, orderSearchCriteria.getSearchInput())
                                .likeOr(orderBuilder.getField(Order_.client).get(Client_.name), orderSearchCriteria.getSearchInput())
                                .likeNumberOr(Order_.id, orderSearchCriteria.getSearchInput())
                                .build()
                );
            }

            if (BooleanUtils.isFalse(orderSearchCriteria.getInStock())) {
                orderBuilder.isNull(Order_.orderStock);
            } else if (BooleanUtils.isTrue(orderSearchCriteria.getInStock())) {
                orderBuilder.isNotNull(Order_.orderStock);
            }

            if (CollectionUtils.isNotEmpty(orderSearchCriteria.getStockStatuses())) {
                orderBuilder.in(orderBuilder.getField(Order_.orderStock).get(OrderStock_.status), orderSearchCriteria.getStockStatuses());
            }

            return orderBuilder.build();
        };
    }
}
