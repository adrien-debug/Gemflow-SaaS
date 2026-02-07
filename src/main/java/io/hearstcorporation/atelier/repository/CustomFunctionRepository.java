package io.hearstcorporation.atelier.repository;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.BaseModel_;
import io.hearstcorporation.atelier.util.EntityHelper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CustomFunctionRepository {

    private final static String FUNCTION_IS_ROW_REFERENCED = "is_row_referenced";

    private final EntityManager entityManager;

    public <T extends BaseModel> boolean isIdReferenced(Long id, Class<T> entityClass) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Boolean> query = criteriaBuilder.createQuery(Boolean.class);

        Expression<Boolean> isIdReferencedExpression = criteriaBuilder.function(FUNCTION_IS_ROW_REFERENCED,
                Boolean.class,
                criteriaBuilder.literal(EntityHelper.getTableName(entityClass)),
                criteriaBuilder.literal(BaseModel_.ID),
                criteriaBuilder.literal(id));

        query.select(isIdReferencedExpression);
        return entityManager.createQuery(query).getSingleResult();
    }
}
