package io.hearstcorporation.atelier.pagination.inventory.alloy;

import io.hearstcorporation.atelier.model.administration.Supplier_;
import io.hearstcorporation.atelier.model.inventory.alloy.AlloyPurchase_;
import io.hearstcorporation.atelier.model.inventory.alloy.Alloy_;
import io.hearstcorporation.atelier.pagination.AbstractPaginationResolver;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class AlloyPurchasePaginationResolver extends AbstractPaginationResolver {

    private static final String ID = "id";
    private static final String BALANCE_DATE = "balanceDate";
    private static final String BATCH_PRICE = "batchPrice";
    private static final String BATCH_WEIGHT = "batchWeight";
    private static final String REMAINING_PRICE = "remainingPrice";
    private static final String REMAINING_WEIGHT = "remainingWeight";
    private static final String PRICE_GRAM = "priceGram";
    private static final String ALLOY_ID = "alloyId";
    private static final String ALLOY_NAME = "alloyName";
    private static final String SUPPLIER_ID = "supplierId";
    private static final String SUPPLIER_NAME = "supplierName";

    @Override
    protected String resolveSortColumn(String sortColumn) {
        return switch (StringUtils.defaultString(sortColumn)) {
            case ID -> AlloyPurchase_.ID;
            case BALANCE_DATE -> AlloyPurchase_.BALANCE_DATE;
            case BATCH_PRICE -> AlloyPurchase_.BATCH_PRICE;
            case BATCH_WEIGHT -> AlloyPurchase_.BATCH_WEIGHT;
            case REMAINING_PRICE -> AlloyPurchase_.REMAINING_PRICE;
            case REMAINING_WEIGHT -> AlloyPurchase_.REMAINING_WEIGHT;
            case PRICE_GRAM -> AlloyPurchase_.PRICE_GRAM;
            case ALLOY_ID -> combineColumns(AlloyPurchase_.ALLOY, Alloy_.ID);
            case ALLOY_NAME -> combineColumns(AlloyPurchase_.ALLOY, Alloy_.NAME);
            case SUPPLIER_ID -> combineColumns(AlloyPurchase_.SUPPLIER, Supplier_.ID);
            case SUPPLIER_NAME -> combineColumns(AlloyPurchase_.SUPPLIER, Supplier_.NAME);
            default -> null;
        };
    }

    @Override
    protected Sort getDefaultSort() {
        return Sort.by(Sort.Direction.DESC, AlloyPurchase_.BALANCE_DATE, AlloyPurchase_.ID);
    }
}
