package io.hearstcorporation.atelier.specification.inventory.puremetal;

import io.hearstcorporation.atelier.dto.model.inventory.puremetal.PureMetalPurchaseSearchCriteriaDto;
import io.hearstcorporation.atelier.model.administration.Supplier_;
import io.hearstcorporation.atelier.model.inventory.puremetal.PureMetalPurchase;
import io.hearstcorporation.atelier.model.inventory.puremetal.PureMetalPurchase_;
import io.hearstcorporation.atelier.model.setting.PriceMetalName_;
import io.hearstcorporation.atelier.specification.PredicateBuilder;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

@UtilityClass
public class PureMetalPurchaseSpecification {

    public static Specification<PureMetalPurchase> create(PureMetalPurchaseSearchCriteriaDto searchCriteriaDto) {
        return (root, query, cb) -> {

            PredicateBuilder<PureMetalPurchase> builder = new PredicateBuilder<>(root, query, cb);

            if (searchCriteriaDto == null) {
                return builder.build();
            }

            builder.in(root.get(PureMetalPurchase_.priceMetalName).get(PriceMetalName_.id), searchCriteriaDto.getMetalPriceNameIds())
                    .in(root.get(PureMetalPurchase_.supplier).get(Supplier_.id), searchCriteriaDto.getSupplierIds())
                    .equal(PureMetalPurchase_.balanceDate, searchCriteriaDto.getBalanceDate());

            String searchInput = searchCriteriaDto.getSearchInput();
            if (StringUtils.isNotBlank(searchInput)) {
                builder.and(
                        builder.query()
                                .likeNumberOr(PureMetalPurchase_.id, searchInput)
                                .build()
                );
            }

            return builder.build();
        };
    }
}
