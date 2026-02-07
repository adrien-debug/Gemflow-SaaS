package io.hearstcorporation.atelier.controller.inventory.puremetal;

import io.hearstcorporation.atelier.dto.model.inventory.puremetal.PureMetalSummaryDto;
import io.hearstcorporation.atelier.service.inventory.puremetal.PureMetalSummaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static io.hearstcorporation.atelier.controller.inventory.puremetal.PureMetalSummaryController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class PureMetalSummaryController {

    public static final String BASE_URL = "/api/v1/pure-metals/summary";

    private final PureMetalSummaryService pureMetalSummaryService;

    @GetMapping
    public List<PureMetalSummaryDto> getPureMetalSummaries() {
        return pureMetalSummaryService.getPureMetalSummaries();
    }

    @GetMapping("/{priceMetalNameId}")
    public PureMetalSummaryDto getPureMetalSummary(@PathVariable Long priceMetalNameId) {
        return pureMetalSummaryService.getPureMetalSummary(priceMetalNameId);
    }
}
