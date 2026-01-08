package io.hearstcorporation.atelier.repository.inventory.alloy;

import io.hearstcorporation.atelier.model.inventory.alloy.AlloyPurchase;
import io.hearstcorporation.atelier.model.inventory.alloy.AlloyPurchase_;
import io.hearstcorporation.atelier.model.inventory.alloy.Alloy_;
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

public interface AlloyPurchaseRepository extends JpaRepository<AlloyPurchase, Long>, JpaSpecificationExecutor<AlloyPurchase> {

    @NonNull
    @EntityGraph(attributePaths = {
            AlloyPurchase_.ALLOY,
            AlloyPurchase_.SUPPLIER,
            AlloyPurchase_.ALLOY + "." + Alloy_.METAL
    })
    Page<AlloyPurchase> findAll(@Nullable Specification<AlloyPurchase> spec, @NonNull Pageable pageable);

    @Modifying
    @Query("DELETE FROM AlloyPurchase ap WHERE ap.id = :id")
    void deleteById(@NonNull Long id);

    @NonNull
    @EntityGraph(attributePaths = {
            AlloyPurchase_.ALLOY,
            AlloyPurchase_.SUPPLIER,
            AlloyPurchase_.ALLOY + "." + Alloy_.METAL
    })
    Optional<AlloyPurchase> findAlloyPurchaseById(@NonNull Long id);

    @Query("SELECT ap FROM AlloyPurchase ap " +
            "WHERE ap.alloy.id = :alloyId " +
            "AND ap.remainingWeight IS NOT NULL " +
            "AND ap.remainingWeight > 0")
    Page<AlloyPurchase> findAllRemainingByAlloyId(@NonNull Long alloyId, @NonNull Pageable pageable);
}
