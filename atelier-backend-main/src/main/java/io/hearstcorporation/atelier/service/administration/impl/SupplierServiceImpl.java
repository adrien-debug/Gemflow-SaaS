package io.hearstcorporation.atelier.service.administration.impl;

import io.hearstcorporation.atelier.dto.mapper.administration.SupplierMapper;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.administration.SupplierDto;
import io.hearstcorporation.atelier.dto.model.administration.SupplierRequestDto;
import io.hearstcorporation.atelier.dto.model.administration.SupplierSearchCriteriaDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.administration.Supplier;
import io.hearstcorporation.atelier.model.setting.Country;
import io.hearstcorporation.atelier.model.setting.Currency;
import io.hearstcorporation.atelier.model.setting.SupplyType;
import io.hearstcorporation.atelier.pagination.PaginationResolver;
import io.hearstcorporation.atelier.repository.administration.SupplierRepository;
import io.hearstcorporation.atelier.service.administration.SupplierService;
import io.hearstcorporation.atelier.service.setting.CountryService;
import io.hearstcorporation.atelier.service.setting.CurrencyService;
import io.hearstcorporation.atelier.service.setting.SupplyTypeService;
import io.hearstcorporation.atelier.specification.administration.SupplierSpecification;
import io.hearstcorporation.atelier.util.ExceptionWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;
    private final SupplyTypeService supplyTypeService;
    private final CountryService countryService;
    private final CurrencyService currencyService;
    private final PaginationResolver supplierPaginationResolver;

    @Override
    @Transactional
    public Long createSupplier(SupplierRequestDto supplierRequestDto) {
        Supplier supplier = new Supplier();
        supplier = updateSupplier(supplier, supplierRequestDto);
        return supplier.getId();
    }

    @Override
    @Transactional
    public void updateSupplier(Long supplierId, SupplierRequestDto supplierRequestDto) {
        Supplier supplier = getSupplier(supplierId);
        updateSupplier(supplier, supplierRequestDto);
    }

    private Supplier updateSupplier(Supplier supplier, SupplierRequestDto supplierRequestDto) {
        SupplyType supplyType = supplyTypeService.getSupplyType(supplierRequestDto.getSupplyTypeId());
        Country country = Optional.ofNullable(supplierRequestDto.getCountryId())
                .map(countryService::getCountry)
                .orElse(null);
        Currency currency = Optional.ofNullable(supplierRequestDto.getCurrencyId())
                .map(currencyService::getCurrency)
                .orElse(null);
        SupplierMapper.mapSupplier(supplier, supplierRequestDto, supplyType, country, currency);
        return supplierRepository.save(supplier);
    }

    @Override
    @Transactional
    public void deleteSupplier(Long supplierId) {
        Supplier supplier = getSupplier(supplierId);
        ExceptionWrapper.onDelete(() -> supplierRepository.deleteById(supplier.getId()),
                "Supplier %d cannot be deleted.".formatted(supplierId));
    }

    @Override
    public SearchDto<SupplierDto> searchSuppliers(SearchRequestDto<SupplierSearchCriteriaDto> supplierSearchQueryDto) {
        Pageable pageable = supplierPaginationResolver.createPageable(
                supplierSearchQueryDto.getPage(),
                supplierSearchQueryDto.getSize(),
                supplierSearchQueryDto.getSorts()
        );
        Specification<Supplier> specification = SupplierSpecification.create(supplierSearchQueryDto.getSearchCriteria());
        Page<Supplier> result = supplierRepository.findAll(specification, pageable);
        return SupplierMapper.toSupplierDtoPage(result);
    }

    @Override
    @Transactional(readOnly = true)
    public SupplierDto getSupplierDto(Long supplierId) {
        return SupplierMapper.toSupplierDto(getSupplier(supplierId));
    }

    @Override
    public Supplier getSupplier(Long supplierId) {
        return supplierRepository.findById(supplierId).orElseThrow(
                () -> new NotFoundException("Supplier with id %d was not found.".formatted(supplierId))
        );
    }
}
