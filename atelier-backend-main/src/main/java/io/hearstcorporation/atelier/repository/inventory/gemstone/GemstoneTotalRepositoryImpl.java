package io.hearstcorporation.atelier.repository.inventory.gemstone;

import io.hearstcorporation.atelier.model.inventory.InventoryTotal;
import io.hearstcorporation.atelier.model.inventory.gemstone.Gemstone;
import io.hearstcorporation.atelier.model.inventory.gemstone.Gemstone_;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
@RequiredArgsConstructor
public class GemstoneTotalRepositoryImpl implements GemstoneTotalRepository {

    private final EntityManager entityManager;

    @Override
    public InventoryTotal calculateTotal(@NonNull Specification<Gemstone> specification) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<InventoryTotal> criteriaQuery = cb.createQuery(InventoryTotal.class);

        Root<Gemstone> root = criteriaQuery.from(Gemstone.class);
        Predicate wherePredicate = specification.toPredicate(root, criteriaQuery, cb);
        if (wherePredicate != null) {
            criteriaQuery.where(wherePredicate);
        }
        criteriaQuery.select(cb.construct(
                InventoryTotal.class,
                cb.coalesce(cb.sum(root.get(Gemstone_.totalCost)), BigDecimal.ZERO),
                cb.coalesce(cb.sum(root.get(Gemstone_.totalWeight)), BigDecimal.ZERO),
                cb.coalesce(cb.sum(root.get(Gemstone_.totalWeightGrams)), BigDecimal.ZERO),
                cb.coalesce(cb.sum(root.get(Gemstone_.numberOfGems)), BigDecimal.ZERO)
        ));

        return entityManager.createQuery(criteriaQuery).getSingleResult();
    }
}
