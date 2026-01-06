package io.hearstcorporation.atelier.repository.administration;

import io.hearstcorporation.atelier.model.administration.Client;
import io.hearstcorporation.atelier.model.administration.Client_;
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

public interface ClientRepository extends JpaRepository<Client, Long>, JpaSpecificationExecutor<Client> {

    @NonNull
    @EntityGraph(attributePaths = {
            Client_.COUNTRY,
            Client_.CURRENCY
    })
    Page<Client> findAll(@Nullable Specification<Client> spec, @NonNull Pageable pageable);

    @Modifying
    @Query("DELETE FROM Client c WHERE c.id = :id")
    void deleteById(@NonNull Long id);
}
