package io.hearstcorporation.atelier.repository.administration;

import io.hearstcorporation.atelier.model.administration.Supplier;
import io.hearstcorporation.atelier.model.administration.Supplier_;
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

public interface SupplierRepository extends JpaRepository<Supplier, Long>, JpaSpecificationExecutor<Supplier> {

    @NonNull
    @EntityGraph(attributePaths = {
            Supplier_.SUPPLY_TYPE,
            Supplier_.COUNTRY,
            Supplier_.CURRENCY
    })
    Page<Supplier> findAll(@Nullable Specification<Supplier> spec, @NonNull Pageable pageable);

    @Modifying
    @Query("DELETE FROM Supplier c WHERE c.id = :id")
    void deleteById(@NonNull Long id);
}
