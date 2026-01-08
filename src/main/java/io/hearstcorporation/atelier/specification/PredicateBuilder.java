package io.hearstcorporation.atelier.specification;

import jakarta.persistence.criteria.AbstractQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.From;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import jakarta.persistence.metamodel.SingularAttribute;
import lombok.Data;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.query.criteria.JpaExpression;
import org.springframework.data.domain.Sort;

import java.util.Arrays;
import java.util.Collection;
import java.util.Objects;
import java.util.function.BiFunction;

public class PredicateBuilder<C> {

    private static final char WILDCARD = '%';

    private final AbstractQuery<?> query;

    private final CriteriaBuilder cb;

    private final From<?, C> root;

    private final PredicateHolder mainHolder;

    /**
     * Create Predicate Builder.
     */
    public PredicateBuilder(final From<?, C> root, final AbstractQuery<?> query, final CriteriaBuilder cb) {
        this.root = root;
        this.query = query;
        this.cb = cb;
        this.mainHolder = new PredicateHolder();
    }

    /**
     * Create Predicate Builder.
     */
    public PredicateBuilder(final From<?, C> root, final AbstractQuery<?> query, final CriteriaBuilder cb, PredicateHolder mainHolder) {
        this.root = root;
        this.query = query;
        this.cb = cb;
        this.mainHolder = mainHolder == null ? new PredicateHolder() : mainHolder;
    }

    public <T> PredicateBuilder<T> joinAndInherit(SingularAttribute<? super C, T> attribute) {
        return joinAndInherit(attribute, JoinType.LEFT);
    }

    @SuppressWarnings("unchecked")
    public <T> PredicateBuilder<T> joinAndInherit(SingularAttribute<? super C, T> attribute, JoinType joinType) {
        Join<C, T> join = (Join<C, T>) root.getJoins().stream()
                .filter(j -> j.getAttribute().equals(attribute))
                .filter(j -> j.getJoinType().equals(joinType))
                .findFirst()
                .orElseGet(() -> root.join(attribute, joinType));
        return new PredicateBuilder<>(join, query, cb, mainHolder);
    }

    public <T> PredicateBuilder<T> joinAndInheritIfNull(PredicateBuilder<T> predicateBuilder,
                                                        SingularAttribute<? super C, T> attribute) {
        if (predicateBuilder != null) {
            return predicateBuilder;
        }
        return joinAndInherit(attribute);
    }

    public <T> PredicateBuilder<T> joinAndInheritIfNull(PredicateBuilder<T> predicateBuilder,
                                                        SingularAttribute<? super C, T> attribute,
                                                        JoinType joinType) {
        if (predicateBuilder != null) {
            return predicateBuilder;
        }
        return joinAndInherit(attribute, joinType);
    }

    /**
     * Create predicate which find object by equal value.
     *
     * @param attribute search attribute
     * @param criteria  search value
     * @param <T>       attribute type
     * @return predicate builder
     */
    public <T> PredicateBuilder<C> equal(SingularAttribute<? super C, T> attribute, T criteria) {
        return equal(getField(attribute), criteria);
    }

    /**
     * Create predicate which find object by equal value.
     *
     * @param attribute search attribute
     * @param criteria  search value
     * @param <T>       attribute type
     * @return predicate builder
     */
    public <T> PredicateBuilder<C> equal(Path<T> attribute, T criteria) {
        if (criteria == null) {
            return this;
        }
        return and(cb.equal(attribute, criteria));
    }

    /**
     * Create predicate which find object by equal expression.
     *
     * @param attribute  search attribute
     * @param expression search expression
     * @param <T>        attribute type
     * @return predicate builder
     */
    public <T> PredicateBuilder<C> equal(SingularAttribute<? super C, T> attribute, Expression<T> expression) {
        return equal(getField(attribute), expression);
    }

    /**
     * Create predicate which find object by equal expression.
     *
     * @param attribute  search attribute
     * @param expression search value
     * @param <T>        attribute type
     * @return predicate builder
     */
    public <T> PredicateBuilder<C> equal(Path<T> attribute, Expression<T> expression) {
        if (expression == null) {
            return this;
        }
        return and(cb.equal(attribute, expression));
    }

    /**
     * Create predicate which find object by not equal value.
     *
     * @param attribute search attribute
     * @param criteria  search value
     * @param <T>       attribute type
     * @return predicate builder
     */
    public <T> PredicateBuilder<C> notEqual(SingularAttribute<? super C, T> attribute, T criteria) {
        return notEqual(getField(attribute), criteria);
    }

    /**
     * Create predicate which find object by not equal value.
     *
     * @param attribute search attribute
     * @param criteria  search value
     * @param <T>       attribute type
     * @return predicate builder
     */
    public <T> PredicateBuilder<C> notEqual(Path<T> attribute, T criteria) {
        if (criteria == null) {
            return this;
        }
        return and(cb.notEqual(attribute, criteria));
    }

    /**
     * Create predicate which find object by equal value.
     *
     * @param attribute search attribute
     * @param criteria  search value
     * @param <T>       attribute type
     * @return predicate builder
     */
    public <T> PredicateBuilder<C> equalOr(SingularAttribute<? super C, T> attribute, T criteria) {
        return equalOr(getField(attribute), criteria);
    }

    /**
     * Create predicate which find object by equal value.
     *
     * @param attribute search attribute
     * @param criteria  search value
     * @param <T>       attribute type
     * @return predicate builder
     */
    public <T> PredicateBuilder<C> equalOr(Path<T> attribute, T criteria) {
        if (criteria == null) {
            return this;
        }
        return or(cb.equal(attribute, criteria));
    }

    /**
     * Create predicate which find object by equal value.
     *
     * @param attribute search attribute
     * @param criteria  search value
     * @return predicate builder
     */
    public PredicateBuilder<C> equalNumbersOr(SingularAttribute<? super C, ? extends Number> attribute, Number criteria) {
        return equalNumbersOr(getField(attribute), criteria);
    }

    /**
     * Create predicate which find object by equal value.
     *
     * @param attribute search attribute
     * @param criteria  search value
     * @return predicate builder
     */
    public PredicateBuilder<C> equalNumbersOr(Path<? extends Number> attribute, Number criteria) {
        if (criteria == null) {
            return this;
        }
        return or(cb.equal(attribute, criteria));
    }

    /**
     * Create predicate which compare attributes and find object where first attribute equal to second attribute.
     */
    public <T> PredicateBuilder<C> equal(Path<T> attribute1, Path<T> attribute2) {
        return and(cb.equal(attribute1, attribute2));
    }

    /**
     * Create a predicate that finds an object by an expression that is equal to a value.
     */
    public <T> PredicateBuilder<C> equal(Expression<T> expression, T criteria) {
        if (criteria == null) {
            return this;
        }
        return and(cb.equal(expression, criteria));
    }

    /**
     * Create a predicate that finds an object by an expression that is equal to a value.
     */
    public <T> PredicateBuilder<C> equalOr(Expression<T> expression, T criteria) {
        if (criteria == null) {
            return this;
        }
        return or(cb.equal(expression, criteria));
    }

    /**
     * Create predicate which find object by string entry.
     *
     * @param attribute search attribute
     * @param criteria  search value
     * @return predicate builder
     */
    public PredicateBuilder<C> like(SingularAttribute<? super C, String> attribute, String criteria) {
        return like(getField(attribute), criteria);
    }

    /**
     * Create predicate which find object by string entry.
     *
     * @param attribute search attribute
     * @param criteria  search value
     * @return predicate builder
     */
    public PredicateBuilder<C> like(Path<String> attribute, String criteria) {
        if (StringUtils.isEmpty(criteria)) {
            return this;
        }
        Predicate predicate = cb.like(cb.upper(attribute), containsUpperCase(criteria));
        return and(predicate);
    }

    /**
     * Create predicate which find object by string entry.
     *
     * @param attribute search attribute
     * @param criteria  search value
     * @return predicate builder
     */
    public PredicateBuilder<C> likeOr(SingularAttribute<? super C, String> attribute, String criteria) {
        return likeOr(getField(attribute), criteria);
    }

    /**
     * Create predicate which find object by string entry.
     *
     * @param attribute search attribute
     * @param criteria  search value
     * @return predicate builder
     */
    public PredicateBuilder<C> likeOr(Path<String> attribute, String criteria) {
        if (StringUtils.isEmpty(criteria)) {
            return this;
        }
        Predicate predicate = cb.like(cb.upper(attribute), containsUpperCase(criteria));
        return or(predicate);
    }

    /**
     * Create predicate which find object by string entry.
     *
     * @param attribute search attribute
     * @param criteria  search value
     * @return predicate builder
     */
    public PredicateBuilder<C> likeNumber(SingularAttribute<? super C, ? extends Number> attribute, String criteria) {
        return likeNumber(getField(attribute), criteria);
    }

    /**
     * Create predicate which find object by string entry.
     *
     * @param attribute search attribute
     * @param criteria  search value
     * @return predicate builder
     */
    @SuppressWarnings("unchecked")
    public PredicateBuilder<C> likeNumber(Path<? extends Number> attribute, String criteria) {
        if (StringUtils.isEmpty(criteria)) {
            return this;
        }
        Predicate predicate = cb.like(((JpaExpression<? extends Number>) attribute).cast(String.class), contains(criteria));
        return and(predicate);
    }

    /**
     * Create predicate which find object by string entry.
     *
     * @param attribute search attribute
     * @param criteria  search value
     * @return predicate builder
     */
    public PredicateBuilder<C> likeNumberOr(SingularAttribute<? super C, ? extends Number> attribute, String criteria) {
        return likeNumberOr(getField(attribute), criteria);
    }

    /**
     * Create predicate which find object by string entry.
     *
     * @param attribute search attribute
     * @param criteria  search value
     * @return predicate builder
     */
    @SuppressWarnings("unchecked")
    public PredicateBuilder<C> likeNumberOr(Path<? extends Number> attribute, String criteria) {
        if (StringUtils.isEmpty(criteria)) {
            return this;
        }
        Predicate predicate = cb.like(((JpaExpression<? extends Number>) attribute).cast(String.class), contains(criteria));
        return or(predicate);
    }

    /**
     * Create predicate which find object which start with string entry.
     *
     * @param attribute search attribute
     * @param criteria  search value
     * @return predicate builder
     */
    public PredicateBuilder<C> startWith(SingularAttribute<? super C, String> attribute, String criteria) {
        return startWith(getField(attribute), criteria);
    }

    /**
     * Create predicate which find object which start with string entry.
     *
     * @param attribute search attribute
     * @param criteria  search value
     * @return predicate builder
     */
    public PredicateBuilder<C> startWith(Path<String> attribute, String criteria) {
        if (StringUtils.isEmpty(criteria)) {
            return this;
        }
        Predicate predicate = cb.like(cb.upper(attribute), startWithUpperCase(criteria));
        return and(predicate);
    }

    /**
     * Create predicate which find object which start with string entry.
     *
     * @param attribute search attribute
     * @param criteria  search value
     * @return predicate builder
     */
    public PredicateBuilder<C> startWithOr(SingularAttribute<? super C, String> attribute, String criteria) {
        return startWithOr(getField(attribute), criteria);
    }

    /**
     * Create predicate which find object which start with string entry.
     *
     * @param attribute search attribute
     * @param criteria  search value
     * @return predicate builder
     */
    public PredicateBuilder<C> startWithOr(Path<String> attribute, String criteria) {
        if (StringUtils.isEmpty(criteria)) {
            return this;
        }
        Predicate predicate = cb.like(cb.upper(attribute), startWithUpperCase(criteria));
        return or(predicate);
    }

    /**
     * Create predicate which find object which start with string entry.
     *
     * @param attribute search attribute
     * @param criteria  search value
     * @return predicate builder
     */
    public PredicateBuilder<C> startNumberWith(SingularAttribute<? super C, ? extends Number> attribute, String criteria) {
        return startNumberWith(getField(attribute), criteria);
    }

    /**
     * Create predicate which find object which start with string entry.
     *
     * @param attribute search attribute
     * @param criteria  search value
     * @return predicate builder
     */
    @SuppressWarnings("unchecked")
    public PredicateBuilder<C> startNumberWith(Path<? extends Number> attribute, String criteria) {
        if (StringUtils.isEmpty(criteria)) {
            return this;
        }
        Predicate predicate = cb.like(((JpaExpression<? extends Number>) attribute).cast(String.class), startWith(criteria));
        return and(predicate);
    }

    /**
     * Create predicate which find object which start with string entry.
     *
     * @param attribute search attribute
     * @param criteria  search value
     * @return predicate builder
     */
    public PredicateBuilder<C> startNumberWithOr(SingularAttribute<? super C, ? extends Number> attribute, String criteria) {
        return startNumberWithOr(getField(attribute), criteria);
    }

    /**
     * Create predicate which find object which start with string entry.
     *
     * @param attribute search attribute
     * @param criteria  search value
     * @return predicate builder
     */
    @SuppressWarnings("unchecked")
    public PredicateBuilder<C> startNumberWithOr(Path<? extends Number> attribute, String criteria) {
        if (StringUtils.isEmpty(criteria)) {
            return this;
        }
        Predicate predicate = cb.like(((JpaExpression<? extends Number>) attribute).cast(String.class), startWith(criteria));
        return or(predicate);
    }

    /**
     * Create predicate which find object which attribute equal one of the values.
     *
     * @param attribute search attribute
     * @param criteria  search values
     * @return predicate builder
     */
    public <T> PredicateBuilder<C> in(SingularAttribute<? super C, T> attribute, Collection<T> criteria) {
        return in(getField(attribute), criteria);
    }

    /**
     * Create predicate which find object which attribute equal one of the values.
     *
     * @param attribute search attribute
     * @param criteria  search values
     * @return predicate builder
     */
    public <T> PredicateBuilder<C> in(Path<T> attribute, Collection<T> criteria) {
        if (CollectionUtils.isEmpty(criteria)) {
            return this;
        }
        return and(inPredicate(attribute, criteria));
    }

    /**
     * Create predicate which find object which attribute equal one of the values.
     *
     * @param attribute search attribute
     * @param criteria  search values
     * @return predicate builder
     */
    public <T> PredicateBuilder<C> inOr(SingularAttribute<? super C, T> attribute, Collection<T> criteria) {
        return inOr(getField(attribute), criteria);
    }

    /**
     * Create predicate which find object which attribute equal one of the values.
     *
     * @param attribute search attribute
     * @param criteria  search values
     * @return predicate builder
     */
    public <T> PredicateBuilder<C> inOr(Path<T> attribute, Collection<T> criteria) {
        if (CollectionUtils.isEmpty(criteria)) {
            return this;
        }
        return or(inPredicate(attribute, criteria));
    }

    /**
     * Create predicate which find object which attribute not equal one of the values.
     *
     * @param attribute search attribute
     * @param criteria  search values
     * @return predicate builder
     */
    public <T> PredicateBuilder<C> notIn(SingularAttribute<? super C, T> attribute, Collection<T> criteria) {
        return notIn(getField(attribute), criteria);
    }

    /**
     * Create predicate which find object which attribute not equal one of the values.
     *
     * @param attribute search attribute
     * @param criteria  search values
     * @return predicate builder
     */
    public <T> PredicateBuilder<C> notIn(Path<T> attribute, Collection<T> criteria) {
        if (CollectionUtils.isEmpty(criteria)) {
            return this;
        }
        return and(cb.not(inPredicate(attribute, criteria)));
    }

    /**
     * Create predicate which find object which attribute not equal one of the values.
     *
     * @param attribute search attribute
     * @param criteria  search values
     * @return predicate builder
     */
    public <T> PredicateBuilder<C> notInOr(SingularAttribute<? super C, T> attribute, Collection<T> criteria) {
        return notInOr(getField(attribute), criteria);
    }

    /**
     * Create predicate which find object which attribute not equal one of the values.
     *
     * @param attribute search attribute
     * @param criteria  search values
     * @return predicate builder
     */
    public <T> PredicateBuilder<C> notInOr(Path<T> attribute, Collection<T> criteria) {
        if (CollectionUtils.isEmpty(criteria)) {
            return this;
        }
        return or(cb.not(inPredicate(attribute, criteria)));
    }

    /**
     * Create predicate which find object which attribute equal one of the values.
     *
     * @param attribute search attribute
     * @param criteria  search values
     * @return predicate
     */
    public <T> Predicate inPredicate(Path<T> attribute, Collection<T> criteria) {
        CriteriaBuilder.In<T> in = cb.in(attribute);
        criteria.forEach(in::value);
        return in;
    }

    /**
     * Create predicate which find object which attribute between from and to values.
     *
     * @param attribute search attribute
     * @param from      search from value
     * @param to        search to value
     * @return predicate builder
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> interval(SingularAttribute<? super C, T> attribute, T from, T to) {
        return interval(getField(attribute), from, to);
    }

    /**
     * Create predicate which find object which attribute between from and to values.
     *
     * @param attribute search attribute
     * @param from      search from value
     * @param to        search to value
     * @return predicate builder
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> interval(Path<T> attribute, T from, T to) {
        if (from == null && to == null) {
            return this;
        }
        Predicate predicate;
        if (from != null && to != null) {
            predicate = cb.between(attribute, from, to);
        } else if (from != null) {
            predicate = cb.greaterThanOrEqualTo(attribute, from);
        } else {
            predicate = cb.lessThanOrEqualTo(attribute, to);
        }
        return and(predicate);
    }

    /**
     * Create predicate which find object which attribute between from and to values, not including them.
     *
     * @param attribute search attribute
     * @param from      search from value
     * @param to        search to value
     * @return predicate builder
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> intervalNotInclude(SingularAttribute<? super C, T> attribute, T from, T to) {
        return intervalNotInclude(getField(attribute), from, to);
    }

    /**
     * Create predicate which find object which attribute between from and to values, not including them.
     *
     * @param attribute search attribute
     * @param from      search from value
     * @param to        search to value
     * @return predicate builder
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> intervalNotInclude(Path<T> attribute, T from, T to) {
        if (from == null && to == null) {
            return this;
        }
        return and(intervalNotIncludePredicate(attribute, from, to));
    }

    /**
     * Create predicate which find object which attribute between from and to values, not including them.
     *
     * @param attribute search attribute
     * @param from      search from value
     * @param to        search to value
     * @return predicate builder
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> intervalNotIncludeOr(SingularAttribute<? super C, T> attribute, T from, T to) {
        return intervalNotIncludeOr(getField(attribute), from, to);
    }

    /**
     * Create predicate which find object which attribute between from and to values, not including them.
     *
     * @param attribute search attribute
     * @param from      search from value
     * @param to        search to value
     * @return predicate builder
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> intervalNotIncludeOr(Path<T> attribute, T from, T to) {
        if (from == null && to == null) {
            return this;
        }
        return or(intervalNotIncludePredicate(attribute, from, to));
    }

    /**
     * Create predicate which find object which attribute between from and to values, not including them.
     *
     * @param attribute search attribute
     * @param from      search from value
     * @param to        search to value
     * @return predicate
     */
    public <T extends Comparable<? super T>> Predicate intervalNotIncludePredicate(Path<T> attribute, T from, T to) {
        if (from != null && to != null) {
            return cb.and(cb.greaterThan(attribute, from), cb.lessThan(attribute, to));
        } else if (from != null) {
            return cb.greaterThan(attribute, from);
        } else {
            return cb.lessThan(attribute, to);
        }
    }

    /**
     * Create predicate which compare attributes and find object where first attribute greater than second attribute.
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> greaterThan(SingularAttribute<? super C, T> firstAttribute, SingularAttribute<? super C, T> secondAttribute) {
        return greaterThan(getField(firstAttribute), getField(secondAttribute));
    }

    /**
     * Create predicate which compare attributes and find object where first attribute greater than second attribute.
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> greaterThan(Path<T> firstAttribute, Path<T> secondAttribute) {
        Predicate predicate = cb.greaterThan(firstAttribute, secondAttribute);
        return and(predicate);
    }

    /**
     * Create predicate which find object which attribute greater than value.
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> greaterThan(SingularAttribute<? super C, T> attribute, T criteria) {
        return greaterThan(getField(attribute), criteria);
    }

    /**
     * Create predicate which find object which attribute greater than value.
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> greaterThan(Path<T> attribute, T criteria) {
        if (criteria == null) {
            return this;
        }
        Predicate predicate = cb.greaterThan(attribute, criteria);
        return and(predicate);
    }

    /**
     * Create predicate which compare attributes and find object where first attribute greater than or equal to second attribute.
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> greaterThanOrEqualTo(SingularAttribute<? super C, T> firstAttribute, SingularAttribute<? super C, T> secondAttribute) {
        return greaterThanOrEqualTo(getField(firstAttribute), getField(secondAttribute));
    }

    /**
     * Create predicate which compare attributes and find object where first attribute greater than or equal to second attribute.
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> greaterThanOrEqualTo(Path<T> firstAttribute, Path<T> secondAttribute) {
        Predicate predicate = cb.greaterThanOrEqualTo(firstAttribute, secondAttribute);
        return and(predicate);
    }

    /**
     * Create predicate which find object which attribute greater than or equal to value.
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> greaterThanOrEqualTo(SingularAttribute<? super C, T> attribute, T criteria) {
        return greaterThanOrEqualTo(getField(attribute), criteria);
    }

    /**
     * Create predicate which find object which attribute greater than or equal to value.
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> greaterThanOrEqualTo(Path<T> attribute, T criteria) {
        if (criteria == null) {
            return this;
        }
        Predicate predicate = cb.greaterThanOrEqualTo(attribute, criteria);
        return and(predicate);
    }

    /**
     * Create predicate which compare attributes and find object where first attribute less than second attribute.
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> lessThan(SingularAttribute<? super C, T> firstAttribute, SingularAttribute<? super C, T> secondAttribute) {
        return lessThan(getField(firstAttribute), getField(secondAttribute));
    }

    /**
     * Create predicate which compare attributes and find object where first attribute less than second attribute.
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> lessThan(Path<T> firstAttribute, Path<T> secondAttribute) {
        return and(cb.lessThan(firstAttribute, secondAttribute));
    }

    /**
     * Create predicate which find object which attribute less than value.
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> lessThan(SingularAttribute<? super C, T> attribute, T criteria) {
        return lessThan(getField(attribute), criteria);
    }

    /**
     * Create predicate which find object which attribute less than or equal to value.
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> lessThanOrEqualTo(SingularAttribute<? super C, T> attribute, T criteria) {
        return lessThanOrEqualTo(getField(attribute), criteria);
    }

    /**
     * Create predicate which find object which attribute less than or equal to expression.
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> lessThanOrEqualTo(SingularAttribute<? super C, T> attribute, Expression<T> expression) {
        return lessThanOrEqualTo(getField(attribute), expression);
    }

    /**
     * Create predicate which find object which attribute less than value.
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> lessThan(Path<T> attribute, T criteria) {
        if (criteria == null) {
            return this;
        }
        return and(cb.lessThan(attribute, criteria));
    }

    /**
     * Create predicate which find object which attribute less than or equal to value.
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> lessThanOrEqualTo(Path<T> attribute, T criteria) {
        if (criteria == null) {
            return this;
        }
        return and(cb.lessThanOrEqualTo(attribute, criteria));
    }

    /**
     * Create predicate which find object which attribute less than or equal to expression.
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> lessThanOrEqualTo(Path<T> attribute, Expression<T> expression) {
        if (expression == null) {
            return this;
        }
        return and(cb.lessThanOrEqualTo(attribute, expression));
    }

    /**
     * Create predicate which find object which attribute less than expression.
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> lessThan(SingularAttribute<? super C, T> attribute, Expression<T> expression) {
        return lessThan(getField(attribute), expression);
    }

    /**
     * Create predicate which find object which attribute less than expression.
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> lessThan(Path<T> attribute, Expression<T> expression) {
        return and(cb.lessThan(attribute, expression));
    }

    /**
     * Create predicate which find object which attribute less than value.
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> lessThanOr(SingularAttribute<? super C, T> attribute, T criteria) {
        return lessThanOr(getField(attribute), criteria);
    }

    /**
     * Create predicate which find object which attribute less than value.
     */
    public <T extends Comparable<? super T>> PredicateBuilder<C> lessThanOr(Path<T> attribute, T criteria) {
        if (criteria == null) {
            return this;
        }
        return or(cb.lessThan(attribute, criteria));
    }

    /**
     * Create an expression that calculates the difference between two numbers.
     */
    public <T extends Number> Expression<T> diff(SingularAttribute<? super C, T> attribute1, SingularAttribute<? super C, T> attribute2) {
        return diff(getField(attribute1), getField(attribute2));
    }

    /**
     * Create an expression that calculates the difference between two numbers.
     */
    public <T extends Number> Expression<T> diff(Path<T> attribute1, Path<T> attribute2) {
        return cb.diff(attribute1, attribute2);
    }

    /**
     * Create predicate which allow only not null values for attribute.
     */
    public <T> PredicateBuilder<C> isNotNull(SingularAttribute<? super C, T> attribute) {
        return isNotNull(getField(attribute));
    }

    /**
     * Create predicate which allow only not null values for attribute.
     */
    public <T> PredicateBuilder<C> isNotNull(Path<T> attribute) {
        Predicate predicate = cb.isNotNull(attribute);
        return and(predicate);
    }

    /**
     * Create predicate which allow only null values for attribute.
     */
    public <T> PredicateBuilder<C> isNull(SingularAttribute<? super C, T> attribute) {
        return isNull(getField(attribute));
    }

    /**
     * Create predicate which allow only null values for attribute.
     */
    public <T> PredicateBuilder<C> isNull(Path<T> attribute) {
        return and(cb.isNull(attribute));
    }

    /**
     * Create predicate which allow only null values for attribute.
     */
    public <T> PredicateBuilder<C> isNullOr(SingularAttribute<? super C, T> attribute) {
        return isNullOr(getField(attribute));
    }

    /**
     * Create predicate which allow only null values for attribute.
     */
    public <T> PredicateBuilder<C> isNullOr(Path<T> attribute) {
        return or(cb.isNull(attribute));
    }

    /**
     * Add new predicate with 'and' to predicate builder.
     */
    public PredicateBuilder<C> and(Predicate predicate) {
        if (predicate == null) {
            return this;
        }
        mainHolder.setInner(mainHolder.getInner() == null ? predicate : cb.and(mainHolder.getInner(), predicate));
        return this;
    }

    /**
     * Add new predicate with 'or' to predicate builder.
     */
    public PredicateBuilder<C> or(Predicate predicate) {
        if (predicate == null) {
            return this;
        }
        mainHolder.setInner(mainHolder.getInner() == null ? predicate : cb.or(mainHolder.getInner(), predicate));
        return this;
    }

    /**
     * Build exists predicate.
     */
    public Predicate exists() {
        if (mainHolder.getInner() != null) {
            query.where(mainHolder.getInner());
        }
        return cb.exists((Subquery<?>) query);
    }

    /**
     * Combine all predicate with 'and'.
     */
    public Predicate subAnd(Predicate... predicates) {
        return combinePredicates(cb::and, predicates);
    }

    /**
     * Combine all predicate with 'or'.
     */
    public Predicate subOr(Predicate... predicates) {
        return combinePredicates(cb::or, predicates);
    }

    /**
     * Combine all predicates with function.
     */
    private Predicate combinePredicates(BiFunction<Expression<Boolean>, Expression<Boolean>, Predicate> function, Predicate[] predicates) {
        return Arrays.stream(predicates).filter(Objects::nonNull).reduce(function::apply).orElse(null);
    }

    /**
     * Get property path from attribute.
     */
    public <T> Path<T> getField(SingularAttribute<? super C, T> attribute) {
        return root.get(attribute);
    }

    /**
     * Create new query.
     */
    public PredicateBuilder<C> query() {
        return new PredicateBuilder<>(root, query, cb);
    }

    /**
     * Create subquery.
     */
    public <T> PredicateBuilder<T> subquery(Class<T> entityClass) {
        Subquery<Integer> subquery = query.subquery(Integer.class);
        subquery.select(cb.literal(1));
        return new PredicateBuilder<>(subquery.from(entityClass), subquery, cb);
    }

    /**
     * Create greatest subquery predicate builder that finds the greatest value for attribute.
     */
    public <T, R extends Comparable<? super R>> PredicateBuilder<T> greatestSubquery(Class<T> entityClass, SingularAttribute<? super T, R> attribute) {
        Subquery<R> subquery = query.subquery(attribute.getJavaType());
        Root<T> subRoot = subquery.from(entityClass);
        subquery.select(cb.greatest(subRoot.get(attribute)));
        return new PredicateBuilder<>(subRoot, subquery, cb);
    }

    /**
     * Create comparison predicate for next entity search.
     */
    public <T extends Comparable<? super T>> Predicate comparisonPredicate(SingularAttribute<? super C, T> attribute,
                                                                           T criteria, Comparison comparison) {
        Path<T> attributePath = getField(attribute);
        if (criteria == null && Comparison.LESS_THAN == comparison) {
            return null;
        }
        if (criteria == null && Comparison.EQUAL == comparison) {
            return cb.isNull(attributePath);
        }
        if (criteria == null && Comparison.GREATER_THAN == comparison) {
            return cb.isNotNull(attributePath);
        }
        if (criteria == null) {
            throw new IllegalStateException("Unsupported comparison sign");
        }
        if (comparison == Comparison.EQUAL) {
            return cb.equal(attributePath, criteria);
        }
        if (comparison == Comparison.GREATER_THAN) {
            return cb.greaterThan(attributePath, criteria);
        }
        if (comparison == Comparison.LESS_THAN) {
            return cb.or(cb.lessThan(attributePath, criteria), cb.isNull(attributePath));
        }
        return null;
    }

    /**
     * Build predicate builder into predicate.
     */
    public Predicate build() {
        return mainHolder.getInner();
    }

    /**
     * Build query.
     */
    public AbstractQuery<?> buildQuery() {
        if (mainHolder.getInner() != null) {
            query.where(mainHolder.getInner());
        }
        return query;
    }

    private String contains(String criteria) {
        return WILDCARD + criteria + WILDCARD;
    }

    private String containsUpperCase(String criteria) {
        return WILDCARD + criteria.toUpperCase() + WILDCARD;
    }

    private String startWith(String criteria) {
        return criteria + WILDCARD;
    }

    private String startWithUpperCase(String criteria) {
        return criteria.toUpperCase() + WILDCARD;
    }

    public enum Comparison {
        GREATER_THAN, LESS_THAN, EQUAL;

        public static Comparison get(Sort.Direction direction) {
            return direction == Sort.Direction.ASC ? GREATER_THAN : LESS_THAN;
        }
    }

    @Data
    protected static final class PredicateHolder {

        private Predicate inner;

        private PredicateHolder() {
            inner = null;
        }

        PredicateHolder copy() {
            PredicateHolder copy = new PredicateHolder();
            copy.setInner(inner);
            return copy;
        }
    }
}
