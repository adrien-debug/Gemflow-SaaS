package io.hearstcorporation.atelier.pagination.inventory.gemstone;

import io.hearstcorporation.atelier.model.inventory.gemstone.Gemstone_;
import io.hearstcorporation.atelier.pagination.AbstractPaginationResolver;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class GemstonePaginationResolver extends AbstractPaginationResolver {

    private static final String ID = "id";
    private static final String NAME = "name";
    private static final String CERTIFICATE = "certificate";

    @Override
    protected String resolveSortColumn(@Nullable String sortColumn) {
        return switch (StringUtils.defaultString(sortColumn)) {
            case ID -> Gemstone_.ID;
            case NAME -> Gemstone_.NAME;
            case CERTIFICATE -> Gemstone_.CERTIFICATE;
            default -> null;
        };
    }

    @Override
    protected Sort getDefaultSort() {
        return Sort.by(Sort.Direction.DESC, Gemstone_.ID);
    }
}
