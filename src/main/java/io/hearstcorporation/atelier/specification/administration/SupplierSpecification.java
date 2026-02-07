package io.hearstcorporation.atelier.specification.administration;

import io.hearstcorporation.atelier.dto.model.administration.SupplierSearchCriteriaDto;
import io.hearstcorporation.atelier.model.administration.Supplier;
import io.hearstcorporation.atelier.model.administration.Supplier_;
import io.hearstcorporation.atelier.model.setting.SupplyType_;
import io.hearstcorporation.atelier.specification.PredicateBuilder;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

@UtilityClass
public class SupplierSpecification {

    public static Specification<Supplier> create(SupplierSearchCriteriaDto supplierSearchCriteria) {
        return (root, query, cb) -> {

            PredicateBuilder<Supplier> supplierBuilder = new PredicateBuilder<>(root, query, cb);

            if (supplierSearchCriteria == null) {
                return supplierBuilder.build();
            }

            supplierBuilder.in(root.get(Supplier_.supplyType).get(SupplyType_.id), supplierSearchCriteria.getSupplyTypeIds());

            String searchInput = supplierSearchCriteria.getSearchInput();
            if (StringUtils.isNotBlank(searchInput)) {
                supplierBuilder.or(
                        supplierBuilder.query()
                                .likeOr(Supplier_.name, searchInput)
                                .likeNumberOr(Supplier_.id, searchInput)
                                .build()
                );
            }

            return supplierBuilder.build();
        };
    }
}
