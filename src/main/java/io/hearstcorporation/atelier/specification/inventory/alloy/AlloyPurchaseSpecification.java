package io.hearstcorporation.atelier.specification.inventory.alloy;

import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloyPurchaseSearchCriteriaDto;
import io.hearstcorporation.atelier.model.administration.Supplier_;
import io.hearstcorporation.atelier.model.inventory.alloy.AlloyPurchase;
import io.hearstcorporation.atelier.model.inventory.alloy.AlloyPurchase_;
import io.hearstcorporation.atelier.model.inventory.alloy.Alloy_;
import io.hearstcorporation.atelier.specification.PredicateBuilder;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

@UtilityClass
public class AlloyPurchaseSpecification {

    public static Specification<AlloyPurchase> create(AlloyPurchaseSearchCriteriaDto searchCriteriaDto) {
        return (root, query, cb) -> {

            PredicateBuilder<AlloyPurchase> builder = new PredicateBuilder<>(root, query, cb);

            if (searchCriteriaDto == null) {
                return builder.build();
            }

            builder.in(root.get(AlloyPurchase_.alloy).get(Alloy_.id), searchCriteriaDto.getAlloyIds())
                    .in(root.get(AlloyPurchase_.supplier).get(Supplier_.id), searchCriteriaDto.getSupplierIds())
                    .equal(AlloyPurchase_.balanceDate, searchCriteriaDto.getBalanceDate());

            String searchInput = searchCriteriaDto.getSearchInput();
            if (StringUtils.isNotBlank(searchInput)) {
                builder.and(
                        builder.query()
                                .likeNumberOr(AlloyPurchase_.id, searchInput)
                                .build()
                );
            }

            return builder.build();
        };
    }
}
