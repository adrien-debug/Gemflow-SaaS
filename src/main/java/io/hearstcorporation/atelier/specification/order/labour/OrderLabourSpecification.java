package io.hearstcorporation.atelier.specification.order.labour;

import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourSearchCriteriaDto;
import io.hearstcorporation.atelier.model.order.Order_;
import io.hearstcorporation.atelier.model.order.labour.OrderLabour;
import io.hearstcorporation.atelier.model.order.labour.OrderLabour_;
import io.hearstcorporation.atelier.model.user.User_;
import io.hearstcorporation.atelier.specification.PredicateBuilder;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

@UtilityClass
public class OrderLabourSpecification {

    public static Specification<OrderLabour> create(OrderLabourSearchCriteriaDto searchCriteria) {
        return (root, query, cb) -> {
            PredicateBuilder<OrderLabour> labourBuilder = new PredicateBuilder<>(root, query, cb);

            if (searchCriteria == null) {
                return labourBuilder.build();
            }

            labourBuilder.in(OrderLabour_.taskType, searchCriteria.getTaskTypes())
                    .in(root.get(OrderLabour_.EMPLOYEE).get(User_.ID), searchCriteria.getEmployeeIds())
                    .in(root.get(OrderLabour_.ORDER).get(Order_.ID), searchCriteria.getOrderIds());

            if (StringUtils.isNotBlank(searchCriteria.getSearchInput())) {
                labourBuilder.and(
                        labourBuilder.query()
                                .likeNumberOr(OrderLabour_.id, searchCriteria.getSearchInput())
                                .build()
                );
            }

            return labourBuilder.build();
        };
    }
}
