package io.hearstcorporation.atelier.specification.inventory.alloyedmetal;

import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalPurchaseSearchCriteriaDto;
import io.hearstcorporation.atelier.model.inventory.alloy.Alloy_;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetalPurchase;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetalPurchase_;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetal_;
import io.hearstcorporation.atelier.specification.PredicateBuilder;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

@UtilityClass
public class AlloyedMetalPurchaseSpecification {

    public static Specification<AlloyedMetalPurchase> create(AlloyedMetalPurchaseSearchCriteriaDto searchCriteriaDto) {
        return (root, query, cb) -> {

            PredicateBuilder<AlloyedMetalPurchase> builder = new PredicateBuilder<>(root, query, cb);

            if (searchCriteriaDto == null) {
                return builder.build();
            }

            builder.in(root.get(AlloyedMetalPurchase_.alloy).get(Alloy_.id), searchCriteriaDto.getAlloyIds())
                    .in(root.get(AlloyedMetalPurchase_.alloyedMetal).get(AlloyedMetal_.id), searchCriteriaDto.getAlloyedMetalIds())
                    .equal(AlloyedMetalPurchase_.balanceDate, searchCriteriaDto.getBalanceDate());

            String searchInput = searchCriteriaDto.getSearchInput();
            if (StringUtils.isNotBlank(searchInput)) {
                builder.and(
                        builder.query()
                                .likeNumberOr(AlloyedMetalPurchase_.id, searchInput)
                                .build()
                );
            }

            return builder.build();
        };
    }
}
