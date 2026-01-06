package io.hearstcorporation.atelier.service.inventory.puremetal.impl;

import io.hearstcorporation.atelier.dto.mapper.inventory.puremetal.PureMetalSummaryMapper;
import io.hearstcorporation.atelier.dto.model.inventory.puremetal.PureMetalSummaryDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.inventory.puremetal.PureMetalSummary;
import io.hearstcorporation.atelier.model.inventory.puremetal.PureMetalSummary_;
import io.hearstcorporation.atelier.repository.inventory.puremetal.PureMetalSummaryRepository;
import io.hearstcorporation.atelier.service.inventory.puremetal.PureMetalSummaryService;
import io.hearstcorporation.atelier.service.setting.PriceMetalService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PureMetalSummaryServiceImpl implements PureMetalSummaryService {

    private final PureMetalSummaryRepository pureMetalSummaryRepository;
    private final PriceMetalService priceMetalService;

    @Override
    public List<PureMetalSummaryDto> getPureMetalSummaries() {
        List<PureMetalSummary> pureMetalSummaries = pureMetalSummaryRepository.findAll(Sort.by(PureMetalSummary_.ID));
        List<Long> priceMetalNameIds = pureMetalSummaries.stream().map(pms -> pms.getPriceMetalName().getId()).toList();
        Map<Long, BigDecimal> currentPriceMetalRatesMap = priceMetalService.getCurrentPriceMetalRatesGroupedByPriceMetalNameId(priceMetalNameIds);
        return PureMetalSummaryMapper.toPureMetalSummaryDtoList(pureMetalSummaries, currentPriceMetalRatesMap);
    }

    @Override
    public void recalculateCurrentCost() {
        //TODO: Add implementation of recalculation of current costs
    }

    @Override
    public PureMetalSummaryDto getPureMetalSummary(Long priceMetalNameId) {
        PureMetalSummary pureMetalSummary = pureMetalSummaryRepository.findByPriceMetalNameId(priceMetalNameId).orElseThrow(
                () -> new NotFoundException("Pure metal summary was not found by price metal name id: %d".formatted(priceMetalNameId))
        );
        BigDecimal priceMetalRate = priceMetalService.getCurrentPriceMetalRate(pureMetalSummary.getPriceMetalName().getId());
        return PureMetalSummaryMapper.toPureMetalSummaryDto(pureMetalSummary, priceMetalRate);
    }
}
