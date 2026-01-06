package io.hearstcorporation.atelier.pagination.order;

import io.hearstcorporation.atelier.model.administration.Client_;
import io.hearstcorporation.atelier.model.order.Order_;
import io.hearstcorporation.atelier.model.setting.ItemCategory_;
import io.hearstcorporation.atelier.pagination.AbstractPaginationResolver;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class OrderPaginationResolver extends AbstractPaginationResolver {

    private static final String ID = "id";
    private static final String NAME = "name";
    private static final String PRIORITY = "priority";
    private static final String STATUS = "status";
    private static final String CLIENT_ID = "clientId";
    private static final String CLIENT_NAME = "clientName";
    private static final String ITEM_CATEGORY_ID = "itemCategoryId";
    private static final String ITEM_CATEGORY_NAME = "itemCategoryName";

    @Override
    protected String resolveSortColumn(@Nullable String sortColumn) {
        return switch (StringUtils.defaultString(sortColumn)) {
            case ID -> Order_.ID;
            case NAME -> Order_.NAME;
            case PRIORITY -> Order_.PRIORITY;
            case STATUS -> Order_.STATUS;
            case CLIENT_ID -> combineColumns(Order_.CLIENT, Client_.ID);
            case CLIENT_NAME -> combineColumns(Order_.CLIENT, Client_.NAME);
            case ITEM_CATEGORY_ID -> combineColumns(Order_.ITEM_CATEGORY, ItemCategory_.ID);
            case ITEM_CATEGORY_NAME -> combineColumns(Order_.ITEM_CATEGORY, ItemCategory_.NAME);
            default -> null;
        };
    }

    @Override
    protected Sort getDefaultSort() {
        return Sort.by(Sort.Direction.DESC, Order_.ID);
    }
}
