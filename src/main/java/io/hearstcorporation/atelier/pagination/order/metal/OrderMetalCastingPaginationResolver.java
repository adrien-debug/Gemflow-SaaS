package io.hearstcorporation.atelier.pagination.order.metal;

import io.hearstcorporation.atelier.model.casting.Casting_;
import io.hearstcorporation.atelier.model.order.Order_;
import io.hearstcorporation.atelier.model.order.metal.OrderMetalCasting_;
import io.hearstcorporation.atelier.model.order.task.OrderTask_;
import io.hearstcorporation.atelier.model.setting.MetalPurity_;
import io.hearstcorporation.atelier.model.setting.Metal_;
import io.hearstcorporation.atelier.pagination.AbstractPaginationResolver;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class OrderMetalCastingPaginationResolver extends AbstractPaginationResolver {

    private static final String ID = "id";
    private static final String COST = "cost";
    private static final String CREATED_AT = "createdAt";
    private static final String CASTING_ID = "castingId";
    private static final String CASTING_METAL_ID = "castingMetalId";
    private static final String CASTING_METAL_NAME = "castingMetalName";
    private static final String CASTING_METAL_PURITY_ID = "castingMetalPurityId";
    private static final String CASTING_METAL_PURITY_METAL_PURITY = "castingMetalPurityMetalPurity";
    private static final String CASTING_ORDER_TASK_ID = "castingOrderTaskId";
    private static final String CASTING_ORDER_TASK_CREATED_AT = "castingOrderTaskCreatedAt";
    private static final String CASTING_ORDER_TASK_STL_COUNT = "castingOrderTaskStlCount";
    private static final String CASTING_ORDER_TASK_WEIGHT = "castingOrderTaskWeight";
    private static final String CASTING_ORDER_TASK_STATUS = "castingOrderTaskStatus";
    private static final String CASTING_ORDER_TASK_ORDER_ID = "castingOrderTaskOrderId";

    @Override
    protected String resolveSortColumn(String sortColumn) {
        return switch (StringUtils.defaultString(sortColumn)) {
            case ID -> OrderMetalCasting_.ID;
            case COST -> OrderMetalCasting_.COST;
            case CREATED_AT -> OrderMetalCasting_.CREATED_AT;
            case CASTING_ID -> combineColumns(OrderMetalCasting_.CASTING, Casting_.ID);
            case CASTING_METAL_ID -> combineColumns(OrderMetalCasting_.CASTING, Casting_.METAL, Metal_.ID);
            case CASTING_METAL_NAME -> combineColumns(OrderMetalCasting_.CASTING, Casting_.METAL, Metal_.NAME);
            case CASTING_METAL_PURITY_ID ->
                    combineColumns(OrderMetalCasting_.CASTING, Casting_.METAL_PURITY, MetalPurity_.ID);
            case CASTING_METAL_PURITY_METAL_PURITY ->
                    combineColumns(OrderMetalCasting_.CASTING, Casting_.METAL_PURITY, MetalPurity_.METAL_PURITY);
            case CASTING_ORDER_TASK_ID -> combineColumns(OrderMetalCasting_.ORDER_TASK, OrderTask_.ID);
            case CASTING_ORDER_TASK_CREATED_AT -> combineColumns(OrderMetalCasting_.ORDER_TASK, OrderTask_.CREATED_AT);
            case CASTING_ORDER_TASK_STL_COUNT -> combineColumns(OrderMetalCasting_.ORDER_TASK, OrderTask_.STL_COUNT);
            case CASTING_ORDER_TASK_WEIGHT -> combineColumns(OrderMetalCasting_.ORDER_TASK, OrderTask_.WEIGHT);
            case CASTING_ORDER_TASK_STATUS -> combineColumns(OrderMetalCasting_.ORDER_TASK, OrderTask_.STATUS);
            case CASTING_ORDER_TASK_ORDER_ID ->
                    combineColumns(OrderMetalCasting_.ORDER_TASK, OrderTask_.ORDER, Order_.ID);
            default -> null;
        };
    }

    @Override
    protected Sort getDefaultSort() {
        return Sort.by(Sort.Direction.DESC, OrderMetalCasting_.CREATED_AT);
    }
}
