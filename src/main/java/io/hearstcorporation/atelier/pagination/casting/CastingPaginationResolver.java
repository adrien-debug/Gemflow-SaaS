package io.hearstcorporation.atelier.pagination.casting;

import io.hearstcorporation.atelier.model.casting.Casting_;
import io.hearstcorporation.atelier.model.inventory.alloy.Alloy_;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetal_;
import io.hearstcorporation.atelier.model.setting.Cylinder_;
import io.hearstcorporation.atelier.model.setting.MetalPurity_;
import io.hearstcorporation.atelier.model.setting.Metal_;
import io.hearstcorporation.atelier.model.setting.PriceMetalName_;
import io.hearstcorporation.atelier.model.user.User_;
import io.hearstcorporation.atelier.pagination.AbstractPaginationResolver;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class CastingPaginationResolver extends AbstractPaginationResolver {

    private static final String ID = "id";
    private static final String ALLOYED_METAL_WEIGHT = "alloyedMetalWeight";
    private static final String PURE_METAL_WEIGHT = "pureMetalWeight";
    private static final String ALLOY_WEIGHT = "alloyWeight";
    private static final String STATUS = "status";
    private static final String CREATED_AT = "createdAt";
    private static final String CREATED_BY_ID = "createdById";
    private static final String CREATED_BY_FIRST_NAME = "createdByFirstName";
    private static final String CYLINDER_ID = "cylinderId";
    private static final String CYLINDER_NAME = "cylinderName";
    private static final String METAL_ID = "metalId";
    private static final String METAL_NAME = "metalName";
    private static final String METAL_PURITY_ID = "metalPurityId";
    private static final String METAL_PURITY_METAL_PURITY = "metalPurityMetalPurity";
    private static final String ALLOYED_METAL_ID = "alloyedMetalId";
    private static final String ALLOYED_METAL_NAME = "alloyedMetalName";
    private static final String PRICE_METAL_NAME_ID = "priceMetalNameId";
    private static final String PRICE_METAL_NAME_NAME = "priceMetalNameName";
    private static final String ALLOY_ID = "alloyId";
    private static final String ALLOY_NAME = "alloyName";


    @Override
    protected String resolveSortColumn(@Nullable String sortColumn) {
        return switch (StringUtils.defaultString(sortColumn)) {
            case ID -> Casting_.ID;
            case ALLOYED_METAL_WEIGHT -> Casting_.ALLOYED_METAL_WEIGHT;
            case PURE_METAL_WEIGHT -> Casting_.PURE_METAL_WEIGHT;
            case ALLOY_WEIGHT -> Casting_.ALLOY_WEIGHT;
            case STATUS -> Casting_.STATUS;
            case CREATED_AT -> Casting_.CREATED_AT;
            case CREATED_BY_ID -> combineColumns(Casting_.CREATED_BY, User_.ID);
            //todo: make it full name when full name become generated column
            case CREATED_BY_FIRST_NAME -> combineColumns(Casting_.CREATED_BY, User_.FIRST_NAME);
            case CYLINDER_ID -> combineColumns(Casting_.CYLINDER, Cylinder_.ID);
            case CYLINDER_NAME -> combineColumns(Casting_.CYLINDER, Cylinder_.NAME);
            case METAL_ID -> combineColumns(Casting_.METAL, Metal_.ID);
            case METAL_NAME -> combineColumns(Casting_.METAL, Metal_.NAME);
            case METAL_PURITY_ID -> combineColumns(Casting_.METAL_PURITY, MetalPurity_.ID);
            case METAL_PURITY_METAL_PURITY -> combineColumns(Casting_.METAL_PURITY, MetalPurity_.METAL_PURITY);
            case ALLOYED_METAL_ID -> combineColumns(Casting_.ALLOYED_METAL, AlloyedMetal_.ID);
            case ALLOYED_METAL_NAME -> combineColumns(Casting_.ALLOYED_METAL, AlloyedMetal_.NAME);
            case PRICE_METAL_NAME_ID -> combineColumns(Casting_.PRICE_METAL_NAME, PriceMetalName_.ID);
            case PRICE_METAL_NAME_NAME -> combineColumns(Casting_.PRICE_METAL_NAME, PriceMetalName_.NAME);
            case ALLOY_ID -> combineColumns(Casting_.ALLOY, Alloy_.ID);
            case ALLOY_NAME -> combineColumns(Casting_.ALLOY, Alloy_.NAME);
            default -> null;
        };
    }

    @Override
    protected Sort getDefaultSort() {
        return Sort.by(Sort.Direction.DESC, Casting_.ID);
    }
}
