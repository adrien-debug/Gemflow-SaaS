package io.hearstcorporation.atelier.repository.order.metal;

import io.hearstcorporation.atelier.model.order.metal.OrderMetalFullTotal;
import io.hearstcorporation.atelier.model.order.metal.OrderMetalTotal;
import io.hearstcorporation.atelier.model.order.metal.OrderMetalTotal_;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Optional;

public interface OrderMetalTotalRepository extends JpaRepository<OrderMetalTotal, Long> {

    @NonNull
    @EntityGraph(attributePaths = {
            OrderMetalTotal_.METAL,
            OrderMetalTotal_.METAL_PURITY
    })
    List<OrderMetalTotal> findAllByOrderId(@NonNull Long orderId);

    Optional<OrderMetalTotal> findByOrderIdAndMetalIdAndMetalPurityId(@NonNull Long orderId, @NonNull Long metalId,
                                                                      @NonNull Long metalPurityId);

    @Query("""
            SELECT new io.hearstcorporation.atelier.model.order.metal.OrderMetalFullTotal(
                        :orderId,
                        sum(COALESCE(omt.totalCost, 0)),
                        sum(COALESCE(omt.weightIn, 0)),
                        sum(COALESCE(omt.weightOut, 0))
            )
            FROM OrderMetalTotal omt
            WHERE omt.order.id = :orderId
            GROUP BY omt.order.id""")
    OrderMetalFullTotal getOrderMetalFullTotal(@NonNull Long orderId);
}
