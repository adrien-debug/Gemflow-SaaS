package io.hearstcorporation.atelier.pagination.crm;

import io.hearstcorporation.atelier.pagination.AbstractPaginationResolver;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class CrmContactPaginationResolver extends AbstractPaginationResolver {

    private static final String ID = "id";
    private static final String EMAIL = "email";
    private static final String FIRST_NAME = "firstName";
    private static final String LAST_NAME = "lastName";
    private static final String COMPANY = "company";
    private static final String CREATED_AT = "createdAt";
    private static final String UPDATED_AT = "updatedAt";

    @Override
    protected String resolveSortColumn(@Nullable String sortColumn) {
        return switch (StringUtils.defaultString(sortColumn)) {
            case ID -> "id";
            case EMAIL -> "email";
            case FIRST_NAME -> "firstName";
            case LAST_NAME -> "lastName";
            case COMPANY -> "company";
            case CREATED_AT -> "createdAt";
            case UPDATED_AT -> "updatedAt";
            default -> null;
        };
    }

    @Override
    protected Sort getDefaultSort() {
        return Sort.by(Sort.Direction.DESC, "createdAt");
    }
}

