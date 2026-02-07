package io.hearstcorporation.atelier.specification.inventory.gemstone;

import io.hearstcorporation.atelier.dto.model.inventory.gemstone.GemstoneSearchCriteriaDto;
import io.hearstcorporation.atelier.model.inventory.gemstone.Gemstone;
import io.hearstcorporation.atelier.model.inventory.gemstone.Gemstone_;
import io.hearstcorporation.atelier.model.order.Order_;
import io.hearstcorporation.atelier.model.setting.GemsPayment_;
import io.hearstcorporation.atelier.model.setting.Location_;
import io.hearstcorporation.atelier.specification.PredicateBuilder;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

@UtilityClass
public class GemstoneSpecification {

    public static Specification<Gemstone> create(GemstoneSearchCriteriaDto searchCriteria) {
        return (root, query, cb) -> {

            PredicateBuilder<Gemstone> builder = new PredicateBuilder<>(root, query, cb);

            if (searchCriteria == null) {
                return builder.build();
            }

            builder.in(Gemstone_.status, searchCriteria.getStatuses())
                    .in(root.get(Gemstone_.paymentStatus).get(GemsPayment_.id), searchCriteria.getPaymentStatusIds())
                    .in(root.get(Gemstone_.location).get(Location_.id), searchCriteria.getLocationIds());

            if (StringUtils.isNotBlank(searchCriteria.getSearchInput())) {
                builder.and(
                        builder.query().likeOr(Gemstone_.name, searchCriteria.getSearchInput())
                                .likeNumberOr(Gemstone_.id, searchCriteria.getSearchInput())
                                .build()
                );
            }

            // OR conditions

            if (BooleanUtils.toBoolean(searchCriteria.getAlwaysIncludeUsedInOrder())) {
                builder.or(
                        builder.query().in(root.get(Gemstone_.order).get(Order_.id), searchCriteria.getOrderIds()).build()
                );
            } else {
                builder.in(root.get(Gemstone_.order).get(Order_.id), searchCriteria.getOrderIds());
            }

            return builder.build();
        };
    }
}
