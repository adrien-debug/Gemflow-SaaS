package io.hearstcorporation.atelier.dto.model.setting;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ParametersDto {

    private List<BusinessLocationDto> businessLocations;
    private List<SegmentDto> segments;
    private List<ClientCategoryDto> clientCategories;
    private List<CollectionDto> collections;
    private List<ItemCategoryDto> itemCategories;
    private List<SupplyTypeDto> supplyTypes;
    private List<LocationDto> locations;
}
