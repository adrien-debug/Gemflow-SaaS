package io.hearstcorporation.atelier.repository.order.diamond;

import io.hearstcorporation.atelier.model.inventory.diamond.Diamond_;
import io.hearstcorporation.atelier.model.order.diamon.OrderDiamond;
import io.hearstcorporation.atelier.model.order.diamon.OrderDiamond_;
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

import java.util.List;
import java.util.Optional;

public interface OrderDiamondRepository extends JpaRepository<OrderDiamond, Long>, JpaSpecificationExecutor<OrderDiamond> {

    @EntityGraph(attributePaths = {
            OrderDiamond_.EMPLOYEE,
            OrderDiamond_.DIAMOND,
            OrderDiamond_.ORDER,
            OrderDiamond_.DIAMOND + "." + Diamond_.SUPPLIER,
            OrderDiamond_.DIAMOND + "." + Diamond_.DIAMOND_SHAPE
    })
    Optional<OrderDiamond> findOrderDiamondById(Long id);

    @NonNull
    @EntityGraph(attributePaths = {
            OrderDiamond_.DIAMOND,
            OrderDiamond_.ORDER,
            OrderDiamond_.DIAMOND + "." + Diamond_.SUPPLIER,
            OrderDiamond_.DIAMOND + "." + Diamond_.DIAMOND_SHAPE
    })
    Page<OrderDiamond> findAll(@Nullable Specification<OrderDiamond> spec, @NonNull Pageable pageable);

    @Query("SELECT od.id FROM OrderDiamond od WHERE od.order.id = :orderId")
    List<Long> findOrderDiamondIdsByOrderId(Long orderId);

    @Modifying
    @Query("DELETE FROM OrderDiamond od WHERE od.id = :id")
    void deleteById(@NonNull Long id);
}
