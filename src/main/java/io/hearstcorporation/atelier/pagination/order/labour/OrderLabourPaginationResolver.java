package io.hearstcorporation.atelier.pagination.order.labour;

import io.hearstcorporation.atelier.model.order.Order_;
import io.hearstcorporation.atelier.model.order.labour.OrderLabour_;
import io.hearstcorporation.atelier.model.user.User_;
import io.hearstcorporation.atelier.pagination.AbstractPaginationResolver;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class OrderLabourPaginationResolver extends AbstractPaginationResolver {

    private static final String ID = "id";
    private static final String TASK_TYPE = "taskType";
    private static final String SPENT_SECONDS = "spentSeconds";
    private static final String DATE = "date";
    private static final String EMPLOYEE_ID = "employeeId";
    private static final String ORDER_ID = "orderId";
    private static final String ORDER_NAME = "orderName";

    @Override
    protected String resolveSortColumn(@Nullable String sortColumn) {
        return switch (StringUtils.defaultString(sortColumn)) {
            case ID -> OrderLabour_.ID;
            case TASK_TYPE -> OrderLabour_.TASK_TYPE;
            case SPENT_SECONDS -> OrderLabour_.SPENT_SECONDS;
            case DATE -> OrderLabour_.DATE;
            case EMPLOYEE_ID -> combineColumns(OrderLabour_.EMPLOYEE, User_.ID);
            case ORDER_ID -> combineColumns(OrderLabour_.ORDER, Order_.ID);
            case ORDER_NAME -> combineColumns(OrderLabour_.ORDER, Order_.NAME);
            default -> null;
        };
    }

    @Override
    protected Sort getDefaultSort() {
        return Sort.by(Sort.Direction.DESC, OrderLabour_.DATE);
    }
}
