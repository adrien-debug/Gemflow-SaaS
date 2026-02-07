package io.hearstcorporation.atelier.pagination.administration;

import io.hearstcorporation.atelier.model.administration.Supplier_;
import io.hearstcorporation.atelier.model.setting.Country_;
import io.hearstcorporation.atelier.model.setting.Currency_;
import io.hearstcorporation.atelier.model.setting.SupplyType_;
import io.hearstcorporation.atelier.pagination.AbstractPaginationResolver;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class SupplierPaginationResolver extends AbstractPaginationResolver {

    private static final String ID = "id";
    private static final String NAME = "name";
    private static final String EMAIL = "email";
    private static final String ADDRESS = "address";
    private static final String CITY = "city";
    private static final String POSTAL_CODE = "postalCode";
    private static final String VAT_NUMBER = "vatNumber";
    private static final String SUPPLY_TYPE_ID = "supplyTypeId";
    private static final String SUPPLY_TYPE_NAME = "supplyTypeName";
    private static final String COUNTRY_ID = "countryId";
    private static final String COUNTRY_NAME = "countryName";
    private static final String CURRENCY_ID = "currencyId";
    private static final String CURRENCY_NAME = "currencyName";

    @Override
    protected String resolveSortColumn(@Nullable String sortColumn) {
        return switch (StringUtils.defaultString(sortColumn)) {
            case ID -> Supplier_.ID;
            case NAME -> Supplier_.NAME;
            case EMAIL -> Supplier_.EMAIL;
            case ADDRESS -> Supplier_.ADDRESS;
            case CITY -> Supplier_.CITY;
            case POSTAL_CODE -> Supplier_.POSTAL_CODE;
            case VAT_NUMBER -> Supplier_.VAT_NUMBER;
            case SUPPLY_TYPE_ID -> combineColumns(Supplier_.SUPPLY_TYPE, SupplyType_.ID);
            case SUPPLY_TYPE_NAME -> combineColumns(Supplier_.SUPPLY_TYPE, SupplyType_.NAME);
            case COUNTRY_ID -> combineColumns(Supplier_.COUNTRY, Country_.ID);
            case COUNTRY_NAME -> combineColumns(Supplier_.COUNTRY, Country_.NAME);
            case CURRENCY_ID -> combineColumns(Supplier_.CURRENCY, Currency_.ID);
            case CURRENCY_NAME -> combineColumns(Supplier_.CURRENCY, Currency_.NAME);
            default -> null;
        };
    }

    @Override
    protected Sort getDefaultSort() {
        return Sort.by(Sort.Direction.DESC, Supplier_.ID);
    }
}
