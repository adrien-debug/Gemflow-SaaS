package io.hearstcorporation.atelier.repository.inventory.gemstone;

import io.hearstcorporation.atelier.model.inventory.gemstone.Gemstone;
import io.hearstcorporation.atelier.model.inventory.gemstone.Gemstone_;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Optional;

public interface GemstoneRepository extends JpaRepository<Gemstone, Long>, JpaSpecificationExecutor<Gemstone>, GemstoneTotalRepository {

    //todo: verify that all findAll methods are using the entity graph
    @NonNull
    @EntityGraph(attributePaths = {
            Gemstone_.PAYMENT_STATUS,
            Gemstone_.SUPPLIER,
            Gemstone_.LOCATION,
            Gemstone_.ORDER,
            //todo: verify that created is using in the search, if not, create the separate DTO for search GemstoneListDto
            Gemstone_.CREATED_BY
    })
    Page<Gemstone> findAll(Specification<Gemstone> specification, @NonNull Pageable pageable);

    List<Gemstone> findAllByIdInOrderByIdAsc(List<Long> ids);

    List<Gemstone> findAllByOrderId(Long orderId);

    Optional<Gemstone> findByIdAndOrderId(Long id, Long orderId);

    @Modifying
    @Query("DELETE FROM Gemstone g WHERE g.id = :id")
    void deleteById(@NonNull Long id);

    @NonNull
    @EntityGraph(attributePaths = {
            Gemstone_.PAYMENT_STATUS,
            Gemstone_.SUPPLIER,
            Gemstone_.LOCATION,
            Gemstone_.ORDER,
            Gemstone_.CREATED_BY
    })
    Optional<Gemstone> findGemstoneById(@NonNull Long id);
}
