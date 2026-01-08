package io.hearstcorporation.atelier.specification.inventory.other;

import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialTransactionSearchCriteriaDto;
import io.hearstcorporation.atelier.model.inventory.other.OtherMaterialTransaction;
import io.hearstcorporation.atelier.model.inventory.other.OtherMaterialTransaction_;
import io.hearstcorporation.atelier.model.inventory.other.OtherMaterial_;
import io.hearstcorporation.atelier.model.order.Order_;
import io.hearstcorporation.atelier.specification.PredicateBuilder;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

@UtilityClass
public class OtherMaterialTransactionSpecification {

    public static Specification<OtherMaterialTransaction> create(OtherMaterialTransactionSearchCriteriaDto searchCriteriaDto) {
        return (root, query, cb) -> {

            PredicateBuilder<OtherMaterialTransaction> builder = new PredicateBuilder<>(root, query, cb);

            if (searchCriteriaDto == null) {
                return builder.build();
            }

            builder.in(root.get(OtherMaterialTransaction_.order).get(Order_.id), searchCriteriaDto.getOrderIds())
                    .in(root.get(OtherMaterialTransaction_.otherMaterial).get(OtherMaterial_.id), searchCriteriaDto.getOtherMaterialIds())
                    .equal(OtherMaterialTransaction_.balanceDate, searchCriteriaDto.getBalanceDate());

            String searchInput = searchCriteriaDto.getSearchInput();
            if (StringUtils.isNotBlank(searchInput)) {
                builder.and(
                        builder.query()
                                .likeNumberOr(OtherMaterialTransaction_.id, searchInput)
                                .build()
                );
            }

            return builder.build();
        };
    }
}
