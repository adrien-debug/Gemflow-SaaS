package io.hearstcorporation.atelier.dto.mapper.administration;

import io.hearstcorporation.atelier.dto.mapper.setting.CountryMapper;
import io.hearstcorporation.atelier.dto.mapper.setting.CurrencyMapper;
import io.hearstcorporation.atelier.dto.mapper.setting.SupplyTypeMapper;
import io.hearstcorporation.atelier.dto.model.ModelNameDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.administration.SupplierDto;
import io.hearstcorporation.atelier.dto.model.administration.SupplierRequestDto;
import io.hearstcorporation.atelier.model.administration.Supplier;
import io.hearstcorporation.atelier.model.setting.Country;
import io.hearstcorporation.atelier.model.setting.Currency;
import io.hearstcorporation.atelier.model.setting.SupplyType;
import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;

@UtilityClass
public class SupplierMapper {

    public static SupplierDto toSupplierDto(Supplier supplier) {
        if (supplier == null) {
            return null;
        }
        return SupplierDto.builder()
                .id(supplier.getId())
                .name(supplier.getName())
                .email(supplier.getEmail())
                .address(supplier.getAddress())
                .city(supplier.getCity())
                .postalCode(supplier.getPostalCode())
                .vatNumber(supplier.getVatNumber())
                .markupPercentage(supplier.getMarkupPercentage())
                .supplyType(SupplyTypeMapper.toSupplyTypeDto(supplier.getSupplyType()))
                .country(CountryMapper.toCountryDto(supplier.getCountry()))
                .currency(CurrencyMapper.toCurrencyDto(supplier.getCurrency()))
                .build();
    }

    public static SearchDto<SupplierDto> toSupplierDtoPage(Page<Supplier> supplierPage) {
        return new SearchDto<>(
                supplierPage.getContent().stream()
                        .map(SupplierMapper::toSupplierDto)
                        .toList(),
                supplierPage.getNumber(),
                supplierPage.getSize(),
                supplierPage.getTotalPages(),
                supplierPage.getTotalElements()
        );
    }

    public static void mapSupplier(Supplier supplier, SupplierRequestDto supplierRequestDto,
                                   SupplyType supplyType, Country country, Currency currency) {
        supplier.setName(supplierRequestDto.getName());
        supplier.setEmail(supplierRequestDto.getEmail());
        supplier.setAddress(supplierRequestDto.getAddress());
        supplier.setCity(supplierRequestDto.getCity());
        supplier.setPostalCode(supplierRequestDto.getPostalCode());
        supplier.setVatNumber(supplierRequestDto.getVatNumber());
        supplier.setMarkupPercentage(supplierRequestDto.getMarkupPercentage());
        supplier.setSupplyType(supplyType);
        supplier.setCountry(country);
        supplier.setCurrency(currency);
    }

    public static ModelNameDto toModelNameDto(Supplier supplier) {
        if (supplier == null) {
            return null;
        }

        return ModelNameDto.builder()
                .id(supplier.getId())
                .name(supplier.getName())
                .build();
    }

    public static BigDecimal toMarkupPercentage(Supplier supplier) {
        if (supplier == null) {
            return null;
        }
        return supplier.getMarkupPercentage();
    }
}
