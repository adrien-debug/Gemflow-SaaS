package io.hearstcorporation.atelier.repository.inventory.alloyedmetal;

import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetalPurchase;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetalPurchase_;
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

public interface AlloyedMetalPurchaseRepository extends JpaRepository<AlloyedMetalPurchase, Long>,
        JpaSpecificationExecutor<AlloyedMetalPurchase> {

    @NonNull
    @EntityGraph(attributePaths = {
            AlloyedMetalPurchase_.ALLOY,
            AlloyedMetalPurchase_.ALLOYED_METAL
    })
    Page<AlloyedMetalPurchase> findAll(@Nullable Specification<AlloyedMetalPurchase> spec, @NonNull Pageable pageable);

    @Modifying
    @Query("DELETE FROM AlloyedMetalPurchase amp WHERE amp.id = :id")
    void deleteById(@NonNull Long id);

    @NonNull
    @EntityGraph(attributePaths = {
            AlloyedMetalPurchase_.ALLOY,
            AlloyedMetalPurchase_.ALLOYED_METAL
    })
    Optional<AlloyedMetalPurchase> findAlloyedMetalPurchaseById(@NonNull Long id);

    @Query("SELECT amp FROM AlloyedMetalPurchase amp " +
            "WHERE amp.alloyedMetal.id = :alloyedMetalId " +
            "AND amp.remainingWeight IS NOT NULL " +
            "AND amp.remainingWeight > 0")
    Page<AlloyedMetalPurchase> findAllRemainingByAlloyedMetalId(@NonNull Long alloyedMetalId, @NonNull Pageable pageable);
}
