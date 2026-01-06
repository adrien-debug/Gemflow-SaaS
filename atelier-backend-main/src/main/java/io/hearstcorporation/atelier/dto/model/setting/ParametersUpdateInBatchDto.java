package io.hearstcorporation.atelier.dto.model.setting;

import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ParametersUpdateInBatchDto {

    @Valid
    private BatchUpdateDto<BusinessLocationUpdateInBatchDto, Long> businessLocations;

    @Valid
    private BatchUpdateDto<SegmentUpdateInBatchDto, Long> segments;

    @Valid
    private BatchUpdateDto<ClientCategoryUpdateInBatchDto, Long> clientCategories;

    @Valid
    private BatchUpdateDto<CollectionUpdateInBatchDto, Long> collections;

    @Valid
    private BatchUpdateDto<ItemCategoryUpdateInBatchDto, Long> itemCategories;

    @Valid
    private BatchUpdateDto<SupplyTypeUpdateInBatchDto, Long> supplyTypes;

    @Valid
    private BatchUpdateDto<LocationUpdateInBatchDto, Long> locations;
}
