package io.hearstcorporation.atelier.specification.inventory.diamond;

import io.hearstcorporation.atelier.dto.model.inventory.diamond.DiamondSearchCriteriaDto;
import io.hearstcorporation.atelier.model.administration.Supplier_;
import io.hearstcorporation.atelier.model.inventory.diamond.Diamond;
import io.hearstcorporation.atelier.model.inventory.diamond.Diamond_;
import io.hearstcorporation.atelier.model.setting.DiamondShape_;
import io.hearstcorporation.atelier.specification.PredicateBuilder;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

@UtilityClass
public class DiamondSpecification {

    public static Specification<Diamond> create(DiamondSearchCriteriaDto searchCriteriaDto) {
        return (root, query, cb) -> {

            PredicateBuilder<Diamond> builder = new PredicateBuilder<>(root, query, cb);

            if (searchCriteriaDto == null) {
                return builder.build();
            }

            builder.in(Diamond_.qualityType, searchCriteriaDto.getQualityTypes())
                    .in(root.get(Diamond_.diamondShape).get(DiamondShape_.id), searchCriteriaDto.getDiamondShapeIds())
                    .in(root.get(Diamond_.supplier).get(Supplier_.id), searchCriteriaDto.getSupplierIds());

            String searchInput = searchCriteriaDto.getSearchInput();
            if (StringUtils.isNotBlank(searchInput)) {
                builder.and(
                        builder.query()
                                .likeOr(Diamond_.parcelName, searchInput)
                                .likeNumberOr(Diamond_.id, searchInput)
                                .build()
                );
            }

            return builder.build();
        };
    }
}
