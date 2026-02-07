package io.hearstcorporation.atelier.specification.inventory.alloyedmetal;

import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalSearchCriteriaDto;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetal;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetal_;
import io.hearstcorporation.atelier.model.setting.MetalPurity_;
import io.hearstcorporation.atelier.model.setting.Metal_;
import io.hearstcorporation.atelier.specification.PredicateBuilder;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

@UtilityClass
public class AlloyedMetalSpecification {

    public static Specification<AlloyedMetal> create(AlloyedMetalSearchCriteriaDto searchCriteriaDto) {
        return (root, query, cb) -> {

            PredicateBuilder<AlloyedMetal> builder = new PredicateBuilder<>(root, query, cb);

            if (searchCriteriaDto == null) {
                return builder.build();
            }

            builder.in(root.get(AlloyedMetal_.metal).get(Metal_.id), searchCriteriaDto.getMetalIds())
                    .in(root.get(AlloyedMetal_.metalPurity).get(MetalPurity_.id), searchCriteriaDto.getMetalPurityIds());

            String searchInput = searchCriteriaDto.getSearchInput();
            if (StringUtils.isNotBlank(searchInput)) {
                builder.and(
                        builder.query()
                                .likeOr(AlloyedMetal_.name, searchInput)
                                .likeNumberOr(AlloyedMetal_.id, searchInput)
                                .build()
                );
            }

            return builder.build();
        };
    }
}
