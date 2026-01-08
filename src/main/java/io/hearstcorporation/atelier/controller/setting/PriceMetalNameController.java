package io.hearstcorporation.atelier.controller.setting;

import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.PriceMetalNameDto;
import io.hearstcorporation.atelier.dto.model.setting.PriceMetalNameUpdateInBatchDto;
import io.hearstcorporation.atelier.service.setting.PriceMetalNameService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static io.hearstcorporation.atelier.controller.setting.PriceMetalNameController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class PriceMetalNameController {

    public static final String BASE_URL = "/api/v1/settings/price-metal-names";

    private final PriceMetalNameService priceMetalNameService;

    @GetMapping
    public List<PriceMetalNameDto> getPriceMetalNames() {
        return priceMetalNameService.getPriceMetalNameDtoList();
    }

    @GetMapping("/{id}")
    public PriceMetalNameDto getPriceMetalName(@PathVariable Long id) {
        return priceMetalNameService.getPriceMetalNameDto(id);
    }

    @PutMapping
    public List<PriceMetalNameDto> updatePriceMetalNames(@RequestBody @Valid BatchUpdateDto<PriceMetalNameUpdateInBatchDto, Long> batchUpdateDto) {
        priceMetalNameService.updatePriceMetalNames(batchUpdateDto);
        return priceMetalNameService.getPriceMetalNameDtoList();
    }
}
