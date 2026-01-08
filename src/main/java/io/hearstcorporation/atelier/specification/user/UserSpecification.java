package io.hearstcorporation.atelier.specification.user;

import io.hearstcorporation.atelier.dto.model.user.UserSearchCriteriaDto;
import io.hearstcorporation.atelier.model.user.User;
import io.hearstcorporation.atelier.model.user.User_;
import io.hearstcorporation.atelier.specification.PredicateBuilder;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

@UtilityClass
public class UserSpecification {

    public static Specification<User> create(UserSearchCriteriaDto userSearchCriteria) {
        return (root, query, cb) -> {

            PredicateBuilder<User> userBuilder = new PredicateBuilder<>(root, query, cb);

            if (userSearchCriteria == null) {
                return userBuilder.build();
            }

            userBuilder.equal(userBuilder.getField(User_.isActive), userSearchCriteria.getIsActive());

            if (StringUtils.isNotBlank(userSearchCriteria.getSearchInput())) {
                userBuilder.and(
                        userBuilder.query().likeOr(User_.email, userSearchCriteria.getSearchInput())
                                .likeOr(User_.firstName, userSearchCriteria.getSearchInput())
                                .likeOr(User_.lastName, userSearchCriteria.getSearchInput())
                                .likeNumberOr(User_.id, userSearchCriteria.getSearchInput())
                                .build()
                );
            }

            return userBuilder.build();
        };
    }
}
