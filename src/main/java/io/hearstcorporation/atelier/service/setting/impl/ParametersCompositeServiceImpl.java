package io.hearstcorporation.atelier.service.setting.impl;

import io.hearstcorporation.atelier.dto.model.setting.ParametersDto;
import io.hearstcorporation.atelier.dto.model.setting.ParametersUpdateInBatchDto;
import io.hearstcorporation.atelier.service.setting.BusinessLocationService;
import io.hearstcorporation.atelier.service.setting.ClientCategoryService;
import io.hearstcorporation.atelier.service.setting.CollectionService;
import io.hearstcorporation.atelier.service.setting.ItemCategoryService;
import io.hearstcorporation.atelier.service.setting.LocationService;
import io.hearstcorporation.atelier.service.setting.ParametersCompositeService;
import io.hearstcorporation.atelier.service.setting.SegmentService;
import io.hearstcorporation.atelier.service.setting.SupplyTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ParametersCompositeServiceImpl implements ParametersCompositeService {

    private final BusinessLocationService businessLocationService;
    private final SegmentService segmentService;
    private final ClientCategoryService clientCategoryService;
    private final CollectionService collectionService;
    private final ItemCategoryService itemCategoryService;
    private final SupplyTypeService supplyTypeService;
    private final LocationService locationService;

    @Override
    @Transactional(readOnly = true)
    public ParametersDto getParametersDto() {
        ParametersDto result = new ParametersDto();
        result.setBusinessLocations(businessLocationService.getBusinessLocationDtoList());
        result.setSegments(segmentService.getSegmentDtoList());
        result.setClientCategories(clientCategoryService.getClientCategoryDtoList());
        result.setCollections(collectionService.getCollectionDtoList());
        result.setItemCategories(itemCategoryService.getItemCategoryDtoList());
        result.setSupplyTypes(supplyTypeService.getSupplyTypeDtoList());
        result.setLocations(locationService.getLocationDtoList());
        return result;
    }

    @Override
    @Transactional
    public void updateParameters(ParametersUpdateInBatchDto batchUpdateDto) {
        businessLocationService.updateBusinessLocations(batchUpdateDto.getBusinessLocations());
        segmentService.updateSegments(batchUpdateDto.getSegments());
        clientCategoryService.updateClientCategories(batchUpdateDto.getClientCategories());
        collectionService.updateCollections(batchUpdateDto.getCollections());
        itemCategoryService.updateItemCategories(batchUpdateDto.getItemCategories());
        supplyTypeService.updateSupplyTypes(batchUpdateDto.getSupplyTypes());
        locationService.updateLocations(batchUpdateDto.getLocations());
    }
}
