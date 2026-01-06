package io.hearstcorporation.atelier.pagination.inventory.other;

import io.hearstcorporation.atelier.model.inventory.other.OtherMaterialTransaction_;
import io.hearstcorporation.atelier.model.inventory.other.OtherMaterial_;
import io.hearstcorporation.atelier.model.order.Order_;
import io.hearstcorporation.atelier.pagination.AbstractPaginationResolver;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class OtherMaterialTransactionPaginationResolver extends AbstractPaginationResolver {

    private static final String ID = "id";
    private static final String BALANCE_DATE = "balanceDate";
    private static final String BATCH_WEIGHT = "batchWeight";
    private static final String DESCRIPTION = "description";
    private static final String ORDER_ID = "orderId";
    private static final String ORDER_NAME = "orderName";
    private static final String OTHER_MATERIAL_ID = "otherMaterialId";
    private static final String OTHER_MATERIAL_NAME = "otherMaterialName";

    @Override
    protected String resolveSortColumn(String sortColumn) {
        return switch (StringUtils.defaultString(sortColumn)) {
            case ID -> OtherMaterialTransaction_.ID;
            case BALANCE_DATE -> OtherMaterialTransaction_.BALANCE_DATE;
            case BATCH_WEIGHT -> OtherMaterialTransaction_.BATCH_WEIGHT;
            case DESCRIPTION -> OtherMaterialTransaction_.DESCRIPTION;
            case ORDER_ID -> combineColumns(OtherMaterialTransaction_.ORDER, Order_.ID);
            case ORDER_NAME -> combineColumns(OtherMaterialTransaction_.ORDER, Order_.NAME);
            case OTHER_MATERIAL_ID -> combineColumns(OtherMaterialTransaction_.OTHER_MATERIAL, OtherMaterial_.ID);
            case OTHER_MATERIAL_NAME -> combineColumns(OtherMaterialTransaction_.OTHER_MATERIAL, OtherMaterial_.NAME);
            default -> null;
        };
    }

    @Override
    protected Sort getDefaultSort() {
        return Sort.by(Sort.Direction.DESC, OtherMaterialTransaction_.BALANCE_DATE);
    }
}
