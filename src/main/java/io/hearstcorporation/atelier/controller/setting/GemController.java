package io.hearstcorporation.atelier.controller.setting;

import io.hearstcorporation.atelier.dto.model.setting.GemsDto;
import io.hearstcorporation.atelier.dto.model.setting.GemsUpdateInBatchDto;
import io.hearstcorporation.atelier.service.setting.GemsCompositeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static io.hearstcorporation.atelier.controller.setting.GemController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class GemController {

    public static final String BASE_URL = "/api/v1/settings/gems";

    private final GemsCompositeService gemsCompositeService;

    @GetMapping
    public GemsDto getGems() {
        return gemsCompositeService.getGemsDto();
    }

    @PutMapping
    public GemsDto updateGems(@RequestBody @Valid GemsUpdateInBatchDto batchUpdateDto) {
        gemsCompositeService.updateGems(batchUpdateDto);
        return gemsCompositeService.getGemsDto();
    }
}
