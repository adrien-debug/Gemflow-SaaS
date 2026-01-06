package io.hearstcorporation.atelier.repository.inventory.alloy;

import io.hearstcorporation.atelier.model.inventory.InventoryTotalCost;
import io.hearstcorporation.atelier.model.inventory.alloy.Alloy;
import io.hearstcorporation.atelier.model.inventory.alloy.Alloy_;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
@RequiredArgsConstructor
public class AlloyTotalRepositoryImpl implements AlloyTotalRepository {

    private final EntityManager entityManager;

    @Override
    public InventoryTotalCost calculateTotal(Specification<Alloy> specification) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<InventoryTotalCost> criteriaQuery = cb.createQuery(InventoryTotalCost.class);

        Root<Alloy> root = criteriaQuery.from(Alloy.class);
        Predicate wherePredicate = specification.toPredicate(root, criteriaQuery, cb);
        if (wherePredicate != null) {
            criteriaQuery.where(wherePredicate);
        }
        criteriaQuery.select(cb.construct(
                InventoryTotalCost.class,
                cb.coalesce(cb.sum(root.get(Alloy_.totalCost)), BigDecimal.ZERO)
        ));

        return entityManager.createQuery(criteriaQuery).getSingleResult();
    }
}
