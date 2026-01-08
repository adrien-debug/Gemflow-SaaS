package io.hearstcorporation.atelier.pagination.inventory.alloyedmetal;

import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetal_;
import io.hearstcorporation.atelier.model.setting.MetalPurity_;
import io.hearstcorporation.atelier.model.setting.Metal_;
import io.hearstcorporation.atelier.pagination.AbstractPaginationResolver;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class AlloyedMetalPaginationResolver extends AbstractPaginationResolver {

    private static final String ID = "id";
    private static final String NAME = "name";
    private static final String TOTAL_COST = "totalCost";
    private static final String REMAINING_WEIGHT = "remainingWeight";
    private static final String METAL_ID = "metalId";
    private static final String METAL_NAME = "metalName";
    private static final String METAL_PURITY_ID = "metalPurityId";
    private static final String METAL_PURITY_METAL_PURITY = "metalPurityMetalPurity";

    @Override
    protected String resolveSortColumn(String sortColumn) {
        return switch (StringUtils.defaultString(sortColumn)) {
            case ID -> AlloyedMetal_.ID;
            case NAME -> AlloyedMetal_.NAME;
            case TOTAL_COST -> AlloyedMetal_.TOTAL_COST;
            case REMAINING_WEIGHT -> AlloyedMetal_.REMAINING_WEIGHT;
            case METAL_ID -> combineColumns(AlloyedMetal_.METAL, Metal_.ID);
            case METAL_NAME -> combineColumns(AlloyedMetal_.METAL, Metal_.NAME);
            case METAL_PURITY_ID -> combineColumns(AlloyedMetal_.METAL_PURITY, MetalPurity_.ID);
            case METAL_PURITY_METAL_PURITY -> combineColumns(AlloyedMetal_.METAL_PURITY, MetalPurity_.METAL_PURITY);
            default -> null;
        };
    }

    @Override
    protected Sort getDefaultSort() {
        return Sort.by(Sort.Direction.DESC, AlloyedMetal_.ID);
    }
}
