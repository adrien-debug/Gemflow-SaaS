package io.hearstcorporation.atelier.pagination.order.diamond;

import io.hearstcorporation.atelier.model.order.Order_;
import io.hearstcorporation.atelier.model.order.diamon.OrderDiamond_;
import io.hearstcorporation.atelier.pagination.AbstractPaginationResolver;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class OrderDiamondPaginationResolver extends AbstractPaginationResolver {

    private static final String ID = "id";
    private static final String QUANTITY = "quantity";
    private static final String DATE = "date";
    private static final String STATUS = "status";
    private static final String ORDER_ID = "orderId";
    private static final String ORDER_NAME = "orderName";

    @Override
    protected String resolveSortColumn(String sortColumn) {
        return switch (StringUtils.defaultString(sortColumn)) {
            case ID -> OrderDiamond_.ID;
            case QUANTITY -> OrderDiamond_.QUANTITY;
            case STATUS -> OrderDiamond_.STATUS;
            case DATE -> OrderDiamond_.DATE;
            case ORDER_ID -> combineColumns(OrderDiamond_.ORDER, Order_.ID);
            case ORDER_NAME -> combineColumns(OrderDiamond_.ORDER, Order_.NAME);
            default -> null;
        };
    }

    @Override
    protected Sort getDefaultSort() {
        return Sort.by(Sort.Direction.DESC, OrderDiamond_.ID);
    }
}
