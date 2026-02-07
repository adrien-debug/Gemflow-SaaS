package io.hearstcorporation.atelier.repository.inventory.puremetal;

import io.hearstcorporation.atelier.model.inventory.puremetal.PureMetalSummary;
import io.hearstcorporation.atelier.model.inventory.puremetal.PureMetalSummary_;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PureMetalSummaryRepository extends JpaRepository<PureMetalSummary, Long> {

    @Override
    @EntityGraph(attributePaths = {
            PureMetalSummary_.PRICE_METAL_NAME
    })
    List<PureMetalSummary> findAll(Sort sort);

    @EntityGraph(attributePaths = {
            PureMetalSummary_.PRICE_METAL_NAME
    })
    Optional<PureMetalSummary> findByPriceMetalNameId(Long priceMetalNameId);
}
