package io.hearstcorporation.atelier.pagination.inventory.puremetal;

import io.hearstcorporation.atelier.model.administration.Supplier_;
import io.hearstcorporation.atelier.model.inventory.puremetal.PureMetalPurchase_;
import io.hearstcorporation.atelier.model.setting.PriceMetalName_;
import io.hearstcorporation.atelier.pagination.AbstractPaginationResolver;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class PureMetalPurchasePaginationResolver extends AbstractPaginationResolver {

    private static final String ID = "id";
    private static final String BAR_NUMBER = "barNumber";
    private static final String COC = "coc";
    private static final String BALANCE_DATE = "balanceDate";
    private static final String BATCH_PRICE = "batchPrice";
    private static final String BATCH_WEIGHT = "batchWeight";
    private static final String REMAINING_PRICE = "remainingPrice";
    private static final String REMAINING_WEIGHT = "remainingWeight";
    private static final String PRICE_GRAM = "priceGram";
    private static final String PRICE_METAL_NAME_ID = "priceMetalNameId";
    private static final String PRICE_METAL_NAME_NAME = "priceMetalNameName";
    private static final String SUPPLIER_ID = "supplierId";
    private static final String SUPPLIER_NAME = "supplierName";

    @Override
    protected String resolveSortColumn(String sortColumn) {
        return switch (StringUtils.defaultString(sortColumn)) {
            case ID -> PureMetalPurchase_.ID;
            case BAR_NUMBER -> PureMetalPurchase_.BAR_NUMBER;
            case COC -> PureMetalPurchase_.COC;
            case BALANCE_DATE -> PureMetalPurchase_.BALANCE_DATE;
            case BATCH_PRICE -> PureMetalPurchase_.BATCH_PRICE;
            case BATCH_WEIGHT -> PureMetalPurchase_.BATCH_WEIGHT;
            case REMAINING_PRICE -> PureMetalPurchase_.REMAINING_PRICE;
            case REMAINING_WEIGHT -> PureMetalPurchase_.REMAINING_WEIGHT;
            case PRICE_GRAM -> PureMetalPurchase_.PRICE_GRAM;
            case PRICE_METAL_NAME_ID -> combineColumns(PureMetalPurchase_.PRICE_METAL_NAME, PriceMetalName_.ID);
            case PRICE_METAL_NAME_NAME -> combineColumns(PureMetalPurchase_.PRICE_METAL_NAME, PriceMetalName_.NAME);
            case SUPPLIER_ID -> combineColumns(PureMetalPurchase_.SUPPLIER, Supplier_.ID);
            case SUPPLIER_NAME -> combineColumns(PureMetalPurchase_.SUPPLIER, Supplier_.NAME);
            default -> null;
        };
    }

    @Override
    protected Sort getDefaultSort() {
        return Sort.by(Sort.Direction.DESC, PureMetalPurchase_.BALANCE_DATE, PureMetalPurchase_.ID);
    }
}
