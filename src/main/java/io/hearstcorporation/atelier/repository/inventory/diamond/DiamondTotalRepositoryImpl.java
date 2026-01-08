package io.hearstcorporation.atelier.repository.inventory.diamond;

import io.hearstcorporation.atelier.model.inventory.InventoryTotal;
import io.hearstcorporation.atelier.model.inventory.diamond.Diamond;
import io.hearstcorporation.atelier.model.inventory.diamond.Diamond_;
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
public class DiamondTotalRepositoryImpl implements DiamondTotalRepository {

    private final EntityManager entityManager;

    public InventoryTotal calculateTotal(@NonNull Specification<Diamond> specification) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<InventoryTotal> criteriaQuery = cb.createQuery(InventoryTotal.class);

        Root<Diamond> root = criteriaQuery.from(Diamond.class);
        Predicate wherePredicate = specification.toPredicate(root, criteriaQuery, cb);
        if (wherePredicate != null) {
            criteriaQuery.where(wherePredicate);
        }
        criteriaQuery.select(cb.construct(
                InventoryTotal.class,
                cb.coalesce(cb.sum(root.get(Diamond_.totalPrice)), BigDecimal.ZERO),
                cb.coalesce(cb.sum(root.get(Diamond_.caratLeft)), BigDecimal.ZERO),
                cb.coalesce(cb.sum(root.get(Diamond_.gramsLeft)), BigDecimal.ZERO),
                cb.coalesce(cb.sum(root.get(Diamond_.quantity)), BigDecimal.ZERO)
        ));

        return entityManager.createQuery(criteriaQuery).getSingleResult();
    }

}
