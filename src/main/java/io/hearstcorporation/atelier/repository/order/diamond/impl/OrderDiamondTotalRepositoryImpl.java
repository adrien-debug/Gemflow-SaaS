package io.hearstcorporation.atelier.repository.order.diamond.impl;

import io.hearstcorporation.atelier.model.inventory.diamond.Diamond;
import io.hearstcorporation.atelier.model.inventory.diamond.Diamond_;
import io.hearstcorporation.atelier.model.order.diamon.OrderDiamond;
import io.hearstcorporation.atelier.model.order.diamon.OrderDiamondTotal;
import io.hearstcorporation.atelier.model.order.diamon.OrderDiamond_;
import io.hearstcorporation.atelier.repository.order.diamond.OrderDiamondTotalRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
@RequiredArgsConstructor
public class OrderDiamondTotalRepositoryImpl implements OrderDiamondTotalRepository {

    private final EntityManager entityManager;

    @Override
    public OrderDiamondTotal calculateTotal(@NonNull Specification<OrderDiamond> specification) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<OrderDiamondTotal> criteriaQuery = cb.createQuery(OrderDiamondTotal.class);

        Root<OrderDiamond> root = criteriaQuery.from(OrderDiamond.class);
        Join<OrderDiamond, Diamond> diamondJoin = root.join(OrderDiamond_.diamond);

        Predicate wherePredicate = specification.toPredicate(root, criteriaQuery, cb);
        if (wherePredicate != null) {
            criteriaQuery.where(wherePredicate);
        }

        //todo: Create SQL function with LATERAL JOIN which will allow to calculate totalPriceEx once per row
        // and then apply markup if needed. Right now we calculating stonePrice * quantity two times in SQL
        Path<Integer> quantityPath = root.get(OrderDiamond_.quantity);
        Expression<Number> totalWeightEx = cb.prod(diamondJoin.get(Diamond_.stoneCarat), quantityPath);
        Expression<Number> totalWeightGramsEx = cb.prod(diamondJoin.get(Diamond_.stoneGrams), quantityPath);
        Expression<Number> totalPriceEx = cb.prod(diamondJoin.get(Diamond_.stonePrice), quantityPath);
        Path<BigDecimal> markupPercentageValuePath = root.get(OrderDiamond_.markupPercentageValue);
        Expression<BigDecimal> totalMarkupPriceEx = cb.selectCase()
                .when(markupPercentageValuePath.isNull(), totalPriceEx)
                .otherwise(cb.prod(markupPercentageValuePath, totalPriceEx))
                .as(BigDecimal.class);

        criteriaQuery.select(cb.construct(
                OrderDiamondTotal.class,
                cb.coalesce(cb.sum(quantityPath), 0),
                cb.coalesce(cb.sum(totalWeightEx), BigDecimal.ZERO),
                cb.coalesce(cb.sum(totalWeightGramsEx), BigDecimal.ZERO),
                cb.coalesce(cb.sum(totalPriceEx), BigDecimal.ZERO),
                cb.coalesce(cb.sum(totalMarkupPriceEx), BigDecimal.ZERO)
        ));

        return entityManager.createQuery(criteriaQuery).getSingleResult();
    }
}