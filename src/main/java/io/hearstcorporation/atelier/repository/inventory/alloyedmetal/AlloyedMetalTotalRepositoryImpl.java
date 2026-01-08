package io.hearstcorporation.atelier.repository.inventory.alloyedmetal;

import io.hearstcorporation.atelier.model.inventory.InventoryTotalCost;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetal;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetal_;
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
public class AlloyedMetalTotalRepositoryImpl implements AlloyedMetalTotalRepository {

    private final EntityManager entityManager;

    @Override
    public InventoryTotalCost calculateTotal(Specification<AlloyedMetal> specification) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<InventoryTotalCost> criteriaQuery = cb.createQuery(InventoryTotalCost.class);

        Root<AlloyedMetal> root = criteriaQuery.from(AlloyedMetal.class);
        Predicate wherePredicate = specification.toPredicate(root, criteriaQuery, cb);
        if (wherePredicate != null) {
            criteriaQuery.where(wherePredicate);
        }
        criteriaQuery.select(cb.construct(
                InventoryTotalCost.class,
                cb.coalesce(cb.sum(root.get(AlloyedMetal_.totalCost)), BigDecimal.ZERO)
        ));

        return entityManager.createQuery(criteriaQuery).getSingleResult();
    }
}
