package io.hearstcorporation.atelier.specification.inventory.alloy;

import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloySearchCriteriaDto;
import io.hearstcorporation.atelier.model.inventory.alloy.Alloy;
import io.hearstcorporation.atelier.model.inventory.alloy.Alloy_;
import io.hearstcorporation.atelier.model.setting.Metal_;
import io.hearstcorporation.atelier.specification.PredicateBuilder;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

@UtilityClass
public class AlloySpecification {

    public static Specification<Alloy> create(AlloySearchCriteriaDto searchCriteriaDto) {
        return (root, query, cb) -> {

            PredicateBuilder<Alloy> builder = new PredicateBuilder<>(root, query, cb);

            if (searchCriteriaDto == null) {
                return builder.build();
            }

            builder.in(root.get(Alloy_.metal).get(Metal_.id), searchCriteriaDto.getMetalIds());

            String searchInput = searchCriteriaDto.getSearchInput();
            if (StringUtils.isNotBlank(searchInput)) {
                builder.and(
                        builder.query()
                                .likeOr(Alloy_.name, searchInput)
                                .likeNumberOr(Alloy_.id, searchInput)
                                .build()
                );
            }

            return builder.build();
        };
    }
}
