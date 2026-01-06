package io.hearstcorporation.atelier.controller.administration;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.administration.SupplierDto;
import io.hearstcorporation.atelier.dto.model.administration.SupplierRequestDto;
import io.hearstcorporation.atelier.dto.model.administration.SupplierSearchCriteriaDto;
import io.hearstcorporation.atelier.service.administration.SupplierService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static io.hearstcorporation.atelier.controller.administration.SupplierController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class SupplierController {

    public static final String BASE_URL = "/api/v1/suppliers";
    public static final String SUPPLIER_ID = "/{supplierId}";

    private final SupplierService supplierService;

    @PostMapping
    public SupplierDto createSupplier(@RequestBody @Valid SupplierRequestDto supplierRequestDto) {
        Long supplierId = supplierService.createSupplier(supplierRequestDto);
        return supplierService.getSupplierDto(supplierId);
    }

    @PutMapping(SUPPLIER_ID)
    public SupplierDto updateSupplier(@PathVariable Long supplierId,
                                      @RequestBody @Valid SupplierRequestDto supplierRequestDto) {
        supplierService.updateSupplier(supplierId, supplierRequestDto);
        return supplierService.getSupplierDto(supplierId);
    }

    @PostMapping("/search")
    public SearchDto<SupplierDto> searchSuppliers(@RequestBody @Valid SearchRequestDto<SupplierSearchCriteriaDto> supplierSearchQueryDto) {
        return supplierService.searchSuppliers(supplierSearchQueryDto);
    }

    @GetMapping(SUPPLIER_ID)
    public SupplierDto getSupplier(@PathVariable Long supplierId) {
        return supplierService.getSupplierDto(supplierId);
    }

    @DeleteMapping(SUPPLIER_ID)
    public void deleteSupplier(@PathVariable Long supplierId) {
        supplierService.deleteSupplier(supplierId);
    }
}
