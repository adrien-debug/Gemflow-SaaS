package io.hearstcorporation.atelier.service.administration;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.administration.SupplierDto;
import io.hearstcorporation.atelier.dto.model.administration.SupplierRequestDto;
import io.hearstcorporation.atelier.dto.model.administration.SupplierSearchCriteriaDto;
import io.hearstcorporation.atelier.model.administration.Supplier;

public interface SupplierService {

    // Business logic methods

    Long createSupplier(SupplierRequestDto supplierRequestDto);

    void updateSupplier(Long supplierId, SupplierRequestDto supplierRequestDto);

    void deleteSupplier(Long supplierId);

    // Get Dto methods

    SearchDto<SupplierDto> searchSuppliers(SearchRequestDto<SupplierSearchCriteriaDto> supplierSearchQueryDto);

    SupplierDto getSupplierDto(Long supplierId);

    // Get Entity methods

    Supplier getSupplier(Long supplierId);
}
