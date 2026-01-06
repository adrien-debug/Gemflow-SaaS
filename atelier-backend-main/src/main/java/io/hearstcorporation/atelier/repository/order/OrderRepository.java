package io.hearstcorporation.atelier.repository.order;

import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.Order_;
import io.hearstcorporation.atelier.model.order.stock.OrderStock_;
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

public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {

    @NonNull
    @EntityGraph(attributePaths = {
            Order_.CLIENT,
            Order_.ITEM_CATEGORY,
            Order_.COLLECTION,
            Order_.SEGMENT,
            Order_.ORDER_STOCK,
            Order_.ORDER_STOCK + "." + OrderStock_.LOCATION,
            Order_.ORDER_STOCK + "." + OrderStock_.ISSUE_CLIENT
    })
    Page<Order> findAll(@Nullable Specification<Order> spec, @NonNull Pageable pageable);

    @NonNull
    @EntityGraph(attributePaths = {
            Order_.CLIENT,
            Order_.ITEM_CATEGORY,
            Order_.COLLECTION,
            Order_.SEGMENT,
            Order_.CREATED_BY,
            Order_.ORDER_STOCK,
            Order_.ORDER_STOCK + "." + OrderStock_.LOCATION,
            Order_.ORDER_STOCK + "." + OrderStock_.ISSUE_CLIENT
    })
    Optional<Order> findOrderById(@NonNull Long id);

    @Modifying
    @Query("DELETE FROM Order o WHERE o.id = :id")
    void deleteById(@NonNull Long id);
}
