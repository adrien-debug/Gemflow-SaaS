package io.hearstcorporation.atelier.pagination.inventory.diamind;

import io.hearstcorporation.atelier.model.administration.Supplier_;
import io.hearstcorporation.atelier.model.inventory.diamond.Diamond_;
import io.hearstcorporation.atelier.model.setting.DiamondShape_;
import io.hearstcorporation.atelier.pagination.AbstractPaginationResolver;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class DiamondPaginationResolver extends AbstractPaginationResolver {

    private static final String ID = "id";
    private static final String TYPE = "type";
    private static final String COLOUR_TYPE = "colorType";
    private static final String PARCEL_NAME = "parcelName";
    private static final String SIZE_NAME = "sizeName";
    private static final String QUALITY_TYPE = "qualityType";
    private static final String STONE_PRICE = "stonePrice";
    private static final String QUANTITY = "quantity";
    private static final String CARAT_LEFT = "caratLeft";
    private static final String TOTAL_PRICE = "totalPrice";
    private static final String INVOICE_DATE = "invoiceDate";
    private static final String DIAMOND_SHAPE_ID = "diamondShapeId";
    private static final String DIAMOND_SHAPE_NAME = "diamondShapeName";
    private static final String SUPPLIER_ID = "supplierId";
    private static final String SUPPLIER_NAME = "supplierName";

    @Override
    protected String resolveSortColumn(String sortColumn) {
        return switch (StringUtils.defaultString(sortColumn)) {
            case ID -> Diamond_.ID;
            case TYPE -> Diamond_.TYPE;
            case COLOUR_TYPE -> Diamond_.COLOUR_TYPE;
            case PARCEL_NAME -> Diamond_.PARCEL_NAME;
            case SIZE_NAME -> Diamond_.SIZE_NAME;
            case QUALITY_TYPE -> Diamond_.QUALITY_TYPE;
            case STONE_PRICE -> Diamond_.STONE_PRICE;
            case QUANTITY -> Diamond_.QUANTITY;
            case CARAT_LEFT -> Diamond_.CARAT_LEFT;
            case TOTAL_PRICE -> Diamond_.TOTAL_PRICE;
            case INVOICE_DATE -> Diamond_.INVOICE_DATE;
            case DIAMOND_SHAPE_ID -> combineColumns(Diamond_.DIAMOND_SHAPE, DiamondShape_.ID);
            case DIAMOND_SHAPE_NAME -> combineColumns(Diamond_.DIAMOND_SHAPE, DiamondShape_.NAME);
            case SUPPLIER_ID -> combineColumns(Diamond_.SUPPLIER, Supplier_.ID);
            case SUPPLIER_NAME -> combineColumns(Diamond_.SUPPLIER, Supplier_.NAME);
            default -> null;
        };
    }

    @Override
    protected Sort getDefaultSort() {
        return Sort.by(Sort.Direction.DESC, Diamond_.ID);
    }
}
