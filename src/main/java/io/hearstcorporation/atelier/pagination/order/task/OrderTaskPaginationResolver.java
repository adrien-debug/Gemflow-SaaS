package io.hearstcorporation.atelier.pagination.order.task;

import io.hearstcorporation.atelier.model.order.Order_;
import io.hearstcorporation.atelier.model.order.task.OrderTask_;
import io.hearstcorporation.atelier.pagination.AbstractPaginationResolver;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class OrderTaskPaginationResolver extends AbstractPaginationResolver {

    private static final String ID = "id";
    private static final String CREATED_AT = "createdAt";
    private static final String STL_COUNT = "stlCount";
    private static final String STATUS = "status";
    private static final String ORDER_ID = "orderId";
    private static final String ORDER_NAME = "orderName";

    @Override
    protected String resolveSortColumn(@Nullable String sortColumn) {
        return switch (StringUtils.defaultString(sortColumn)) {
            case ID -> OrderTask_.ID;
            case CREATED_AT -> OrderTask_.CREATED_AT;
            case STL_COUNT -> OrderTask_.STL_COUNT;
            case STATUS -> OrderTask_.STATUS;
            case ORDER_ID -> combineColumns(OrderTask_.ORDER, Order_.ID);
            case ORDER_NAME -> combineColumns(OrderTask_.ORDER, Order_.NAME);
            default -> null;
        };
    }

    @Override
    protected Sort getDefaultSort() {
        return Sort.by(Sort.Direction.DESC, OrderTask_.ID);
    }
}
