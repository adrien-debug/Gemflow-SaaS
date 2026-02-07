package io.hearstcorporation.atelier.pagination.administration;

import io.hearstcorporation.atelier.model.administration.Client_;
import io.hearstcorporation.atelier.model.setting.Country_;
import io.hearstcorporation.atelier.model.setting.Currency_;
import io.hearstcorporation.atelier.pagination.AbstractPaginationResolver;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class ClientPaginationResolver extends AbstractPaginationResolver {

    private static final String ID = "id";
    private static final String NAME = "name";
    private static final String EMAIL = "email";
    private static final String ADDRESS = "address";
    private static final String CITY = "city";
    private static final String POSTAL_CODE = "postalCode";
    private static final String VAT_NUMBER = "vatNumber";
    private static final String COUNTRY_ID = "countryId";
    private static final String COUNTRY_NAME = "countryName";
    private static final String CURRENCY_ID = "currencyId";
    private static final String CURRENCY_NAME = "currencyName";

    @Override
    protected String resolveSortColumn(String sortColumn) {
        return switch (StringUtils.defaultString(sortColumn)) {
            case ID -> Client_.ID;
            case NAME -> Client_.NAME;
            case EMAIL -> Client_.EMAIL;
            case ADDRESS -> Client_.ADDRESS;
            case CITY -> Client_.CITY;
            case POSTAL_CODE -> Client_.POSTAL_CODE;
            case VAT_NUMBER -> Client_.VAT_NUMBER;
            case COUNTRY_ID -> combineColumns(Client_.COUNTRY, Country_.ID);
            case COUNTRY_NAME -> combineColumns(Client_.COUNTRY, Country_.NAME);
            case CURRENCY_ID -> combineColumns(Client_.CURRENCY, Currency_.ID);
            case CURRENCY_NAME -> combineColumns(Client_.CURRENCY, Currency_.NAME);
            default -> null;
        };
    }

    @Override
    protected Sort getDefaultSort() {
        return Sort.by(Sort.Direction.DESC, Client_.ID);
    }
}
