package io.hearstcorporation.atelier.repository.inventory.puremetal;

import io.hearstcorporation.atelier.model.inventory.puremetal.PureMetalPurchase;
import io.hearstcorporation.atelier.model.inventory.puremetal.PureMetalPurchase_;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import java.util.Optional;

public interface PureMetalPurchaseRepository extends JpaRepository<PureMetalPurchase, Long>,
        JpaSpecificationExecutor<PureMetalPurchase> {

    @NonNull
    @EntityGraph(attributePaths = {
            PureMetalPurchase_.PRICE_METAL_NAME,
            PureMetalPurchase_.SUPPLIER
    })
    Page<PureMetalPurchase> findAll(@Nullable Specification<PureMetalPurchase> spec, @NonNull Pageable pageable);

    @Modifying
    @Query("DELETE FROM PureMetalPurchase pmp WHERE pmp.id = :id")
    void deleteById(@NonNull Long id);

    @NonNull
    @EntityGraph(attributePaths = {
            PureMetalPurchase_.PRICE_METAL_NAME,
            PureMetalPurchase_.SUPPLIER
    })
    Optional<PureMetalPurchase> findPureMetalPurchaseById(@NonNull Long id);

    @Query("SELECT pmp FROM PureMetalPurchase pmp " +
            "WHERE pmp.priceMetalName.id = :priceMetalNameId " +
            "AND pmp.remainingWeight IS NOT NULL " +
            "AND pmp.remainingWeight > 0")
    Page<PureMetalPurchase> findAllRemainingByPriceMetalNameId(@NonNull Long priceMetalNameId, @NonNull Pageable pageable);
}
