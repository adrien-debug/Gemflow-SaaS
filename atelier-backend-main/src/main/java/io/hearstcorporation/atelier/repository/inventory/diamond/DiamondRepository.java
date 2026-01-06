package io.hearstcorporation.atelier.repository.inventory.diamond;

import io.hearstcorporation.atelier.model.inventory.diamond.Diamond;
import io.hearstcorporation.atelier.model.inventory.diamond.Diamond_;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import java.util.Optional;

public interface DiamondRepository extends JpaRepository<Diamond, Long>, JpaSpecificationExecutor<Diamond>, DiamondTotalRepository {

    @NonNull
    @EntityGraph(attributePaths = {
            Diamond_.DIAMOND_SHAPE,
            Diamond_.SUPPLIER
    })
    Page<Diamond> findAll(@Nullable Specification<Diamond> spec, @NonNull Pageable pageable);

    @Modifying
    @Query("DELETE FROM Diamond d WHERE d.id = :id")
    void deleteById(@NonNull Long id);

    @NonNull
    @EntityGraph(attributePaths = {
            Diamond_.DIAMOND_SHAPE,
            Diamond_.SUPPLIER
    })
    Optional<Diamond> findDiamondById(@NonNull Long id);

    @Lock(value = LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT d FROM Diamond d WHERE d.id = :id")
    Optional<Diamond> findLockDiamondById(@NonNull Long id);
}
