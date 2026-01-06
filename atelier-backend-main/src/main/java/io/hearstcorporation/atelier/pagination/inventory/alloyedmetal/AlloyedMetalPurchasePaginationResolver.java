package io.hearstcorporation.atelier.pagination.inventory.alloyedmetal;

import io.hearstcorporation.atelier.model.inventory.alloy.Alloy_;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetalPurchase_;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetal_;
import io.hearstcorporation.atelier.pagination.AbstractPaginationResolver;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class AlloyedMetalPurchasePaginationResolver extends AbstractPaginationResolver {

    private static final String ID = "id";
    private static final String BALANCE_DATE = "balanceDate";
    private static final String BATCH_PRICE = "batchPrice";
    private static final String BATCH_WEIGHT = "batchWeight";
    private static final String REMAINING_PRICE = "remainingPrice";
    private static final String REMAINING_WEIGHT = "remainingWeight";
    private static final String PRICE_GRAM = "priceGram";
    private static final String ALLOY_ID = "alloyId";
    private static final String ALLOY_NAME = "alloyName";
    private static final String ALLOYED_METAL_ID = "alloyedMetalId";
    private static final String ALLOYED_METAL_NAME = "alloyedMetalName";

    @Override
    protected String resolveSortColumn(String sortColumn) {
        return switch (StringUtils.defaultString(sortColumn)) {
            case ID -> AlloyedMetalPurchase_.ID;
            case BALANCE_DATE -> AlloyedMetalPurchase_.BALANCE_DATE;
            case BATCH_PRICE -> AlloyedMetalPurchase_.BATCH_PRICE;
            case BATCH_WEIGHT -> AlloyedMetalPurchase_.BATCH_WEIGHT;
            case REMAINING_PRICE -> AlloyedMetalPurchase_.REMAINING_PRICE;
            case REMAINING_WEIGHT -> AlloyedMetalPurchase_.REMAINING_WEIGHT;
            case PRICE_GRAM -> AlloyedMetalPurchase_.PRICE_GRAM;
            case ALLOY_ID -> combineColumns(AlloyedMetalPurchase_.ALLOY, Alloy_.ID);
            case ALLOY_NAME -> combineColumns(AlloyedMetalPurchase_.ALLOY, Alloy_.NAME);
            case ALLOYED_METAL_ID -> combineColumns(AlloyedMetalPurchase_.ALLOYED_METAL, AlloyedMetal_.ID);
            case ALLOYED_METAL_NAME -> combineColumns(AlloyedMetalPurchase_.ALLOYED_METAL, AlloyedMetal_.NAME);
            default -> null;
        };
    }

    @Override
    protected Sort getDefaultSort() {
        return Sort.by(Sort.Direction.DESC, AlloyedMetalPurchase_.BALANCE_DATE, AlloyedMetalPurchase_.ID);
    }
}
