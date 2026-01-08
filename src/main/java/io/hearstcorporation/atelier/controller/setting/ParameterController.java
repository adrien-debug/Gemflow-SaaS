package io.hearstcorporation.atelier.controller.setting;

import io.hearstcorporation.atelier.dto.model.setting.ParametersDto;
import io.hearstcorporation.atelier.dto.model.setting.ParametersUpdateInBatchDto;
import io.hearstcorporation.atelier.service.setting.ParametersCompositeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static io.hearstcorporation.atelier.controller.setting.ParameterController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class ParameterController {

    public static final String BASE_URL = "/api/v1/settings/parameters";

    private final ParametersCompositeService parametersCompositeService;

    @GetMapping
    public ParametersDto getParameters() {
        return parametersCompositeService.getParametersDto();
    }

    @PutMapping
    public ParametersDto updateParameters(@RequestBody @Valid ParametersUpdateInBatchDto batchUpdateDto) {
        parametersCompositeService.updateParameters(batchUpdateDto);
        return parametersCompositeService.getParametersDto();
    }
}
