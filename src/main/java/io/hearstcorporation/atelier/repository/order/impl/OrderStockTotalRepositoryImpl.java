package io.hearstcorporation.atelier.repository.order.impl;

import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.Order_;
import io.hearstcorporation.atelier.model.order.stock.OrderStock;
import io.hearstcorporation.atelier.model.order.stock.OrderStockTotal;
import io.hearstcorporation.atelier.model.order.stock.OrderStock_;
import io.hearstcorporation.atelier.repository.order.OrderStockTotalRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
@RequiredArgsConstructor
public class OrderStockTotalRepositoryImpl implements OrderStockTotalRepository {

    private final EntityManager entityManager;

    @Override
    public OrderStockTotal calculateTotal(@NonNull Specification<Order> specification) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<OrderStockTotal> criteriaQuery = cb.createQuery(OrderStockTotal.class);

        Root<Order> root = criteriaQuery.from(Order.class);
        Join<Order, OrderStock> stockJoin = root.join(Order_.orderStock);

        Predicate wherePredicate = specification.toPredicate(root, criteriaQuery, cb);
        if (wherePredicate != null) {
            criteriaQuery.where(wherePredicate);
        }

        criteriaQuery.select(cb.construct(
                OrderStockTotal.class,
                cb.coalesce(cb.count(stockJoin.get(OrderStock_.id)), 0),
                cb.coalesce(cb.sum(stockJoin.get(OrderStock_.totalCost)), BigDecimal.ZERO),
                //todo: change to adjusted value
                cb.coalesce(cb.sum(stockJoin.get(OrderStock_.totalCost)), BigDecimal.ZERO)
        ));

        return entityManager.createQuery(criteriaQuery).getSingleResult();
    }
}