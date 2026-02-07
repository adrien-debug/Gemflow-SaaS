package io.hearstcorporation.atelier.specification.inventory.other;

import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialSearchCriteriaDto;
import io.hearstcorporation.atelier.model.inventory.other.OtherMaterial;
import io.hearstcorporation.atelier.model.inventory.other.OtherMaterial_;
import io.hearstcorporation.atelier.specification.PredicateBuilder;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

@UtilityClass
public class OtherMaterialSpecification {

    public static Specification<OtherMaterial> create(OtherMaterialSearchCriteriaDto searchCriteriaDto) {
        return (root, query, cb) -> {

            PredicateBuilder<OtherMaterial> builder = new PredicateBuilder<>(root, query, cb);

            if (searchCriteriaDto == null) {
                return builder.build();
            }

            String searchInput = searchCriteriaDto.getSearchInput();
            if (StringUtils.isNotBlank(searchInput)) {
                builder.and(
                        builder.query()
                                .likeOr(OtherMaterial_.name, searchInput)
                                .likeNumberOr(OtherMaterial_.id, searchInput)
                                .build()
                );
            }

            return builder.build();
        };
    }
}
