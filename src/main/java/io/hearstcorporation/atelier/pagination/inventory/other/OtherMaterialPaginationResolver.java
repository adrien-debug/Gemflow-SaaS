package io.hearstcorporation.atelier.pagination.inventory.other;

import io.hearstcorporation.atelier.model.inventory.other.OtherMaterial_;
import io.hearstcorporation.atelier.pagination.AbstractPaginationResolver;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class OtherMaterialPaginationResolver extends AbstractPaginationResolver {

    private static final String ID = "id";
    private static final String NAME = "name";
    private static final String REMAINING_WEIGHT = "remainingWeight";

    @Override
    protected String resolveSortColumn(String sortColumn) {
        return switch (StringUtils.defaultString(sortColumn)) {
            case ID -> OtherMaterial_.ID;
            case NAME -> OtherMaterial_.NAME;
            case REMAINING_WEIGHT -> OtherMaterial_.REMAINING_WEIGHT;
            default -> null;
        };
    }

    @Override
    protected Sort getDefaultSort() {
        return Sort.by(Sort.Direction.DESC, OtherMaterial_.ID);
    }
}
