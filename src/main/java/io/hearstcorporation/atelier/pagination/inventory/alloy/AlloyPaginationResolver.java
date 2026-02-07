package io.hearstcorporation.atelier.pagination.inventory.alloy;

import io.hearstcorporation.atelier.model.inventory.alloy.Alloy_;
import io.hearstcorporation.atelier.model.setting.Metal_;
import io.hearstcorporation.atelier.pagination.AbstractPaginationResolver;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class AlloyPaginationResolver extends AbstractPaginationResolver {

    private static final String ID = "id";
    private static final String NAME = "name";
    private static final String TOTAL_COST = "totalCost";
    private static final String REMAINING_WEIGHT = "remainingWeight";
    private static final String METAL_ID = "metalId";
    private static final String METAL_NAME = "metalName";

    @Override
    protected String resolveSortColumn(String sortColumn) {
        return switch (StringUtils.defaultString(sortColumn)) {
            case ID -> Alloy_.ID;
            case NAME -> Alloy_.NAME;
            case TOTAL_COST -> Alloy_.TOTAL_COST;
            case REMAINING_WEIGHT -> Alloy_.REMAINING_WEIGHT;
            case METAL_ID -> combineColumns(Alloy_.METAL, Metal_.ID);
            case METAL_NAME -> combineColumns(Alloy_.METAL, Metal_.NAME);
            default -> null;
        };
    }

    @Override
    protected Sort getDefaultSort() {
        return Sort.by(Sort.Direction.DESC, Alloy_.ID);
    }
}
