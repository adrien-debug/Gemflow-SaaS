package io.hearstcorporation.atelier.pagination.user;

import io.hearstcorporation.atelier.model.user.Role_;
import io.hearstcorporation.atelier.model.user.User_;
import io.hearstcorporation.atelier.pagination.AbstractPaginationResolver;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class UserPaginationResolver extends AbstractPaginationResolver {

    private static final String ID = "Id";
    private static final String EMAIL = "email";
    private static final String FIRST_NAME = "firstName";
    private static final String LAST_NAME = "lastName";
    private static final String FULL_NAME = "fullName";
    private static final String ROLE_ID = "roleId";
    private static final String ROLE_NAME = "roleName";
    private static final String IS_ACTIVE = "isActive";

    @Override
    protected String resolveSortColumn(@Nullable String sortColumn) {
        return switch (StringUtils.defaultString(sortColumn)) {
            case ID -> User_.ID;
            case EMAIL -> User_.EMAIL;
            case FIRST_NAME, FULL_NAME -> User_.FIRST_NAME;
            case LAST_NAME -> User_.LAST_NAME;
            case ROLE_ID -> combineColumns(User_.ROLE, Role_.ID);
            case ROLE_NAME -> combineColumns(User_.ROLE, Role_.NAME);
            case IS_ACTIVE -> User_.IS_ACTIVE;
            default -> null;
        };
    }

    @Override
    protected Sort getDefaultSort() {
        return Sort.by(Sort.Direction.DESC, User_.ID);
    }
}
