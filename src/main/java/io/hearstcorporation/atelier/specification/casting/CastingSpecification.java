package io.hearstcorporation.atelier.specification.casting;

import io.hearstcorporation.atelier.dto.model.casting.CastingSearchCriteriaDto;
import io.hearstcorporation.atelier.model.casting.Casting;
import io.hearstcorporation.atelier.model.casting.Casting_;
import io.hearstcorporation.atelier.specification.PredicateBuilder;
import lombok.experimental.UtilityClass;
import org.springframework.data.jpa.domain.Specification;

@UtilityClass
public class CastingSpecification {

    public static Specification<Casting> create(CastingSearchCriteriaDto castingSearchCriteria) {
        return (root, query, cb) -> {

            PredicateBuilder<Casting> castingBuilder = new PredicateBuilder<>(root, query, cb);

            if (castingSearchCriteria == null) {
                return castingBuilder.build();
            }

            castingBuilder.in(Casting_.status, castingSearchCriteria.getStatuses());

            return castingBuilder.build();
        };
    }
}
