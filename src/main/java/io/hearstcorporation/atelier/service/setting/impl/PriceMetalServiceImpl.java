package io.hearstcorporation.atelier.service.setting.impl;

import io.hearstcorporation.atelier.dto.mapper.setting.PriceMetalMapper;
import io.hearstcorporation.atelier.dto.model.setting.PriceMetalDto;
import io.hearstcorporation.atelier.dto.model.setting.PriceMetalNameDto;
import io.hearstcorporation.atelier.dto.model.setting.PriceMetalRequestDto;
import io.hearstcorporation.atelier.model.setting.PriceMetal;
import io.hearstcorporation.atelier.model.setting.PriceSetting;
import io.hearstcorporation.atelier.repository.setting.PriceMetalRepository;
import io.hearstcorporation.atelier.service.setting.PriceMetalNameService;
import io.hearstcorporation.atelier.service.setting.PriceMetalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PriceMetalServiceImpl implements PriceMetalService {

    private final PriceMetalRepository priceMetalRepository;
    private final PriceMetalNameService priceMetalNameService;

    @Override
    @Transactional(readOnly = true)
    public List<PriceMetalDto> getPriceMetalDtoList(Long priceSettingId) {
        List<PriceMetalNameDto> priceMetalNameDtoList = priceMetalNameService.getPriceMetalNameDtoList();
        if (priceSettingId == null) {
            return PriceMetalMapper.toPriceMetalDtoTemplateList(priceMetalNameDtoList);
        }
        List<PriceMetal> priceMetals = priceMetalRepository.findAllByPriceSettingId(priceSettingId);
        List<PriceMetalDto> priceMetalDtoList = PriceMetalMapper.toPriceMetalDtoList(priceMetals);
        List<Long> existPriceMetalNameIds = priceMetalDtoList.stream().
                map(PriceMetalDto::getPriceMetalName)
                .map(PriceMetalNameDto::getId)
                .toList();
        List<PriceMetalNameDto> absentPriceMetalNameDtoList = priceMetalNameDtoList.stream()
                .filter(priceMetalNameDto -> !existPriceMetalNameIds.contains(priceMetalNameDto.getId()))
                .toList();
        priceMetalDtoList.addAll(PriceMetalMapper.toPriceMetalDtoTemplateList(absentPriceMetalNameDtoList));
        priceMetalDtoList.sort(Comparator.comparingLong(priceMetalDto -> priceMetalDto.getPriceMetalName().getId()));
        return priceMetalDtoList;
    }

    @Override
    @Transactional
    public void updatePriceMetals(PriceSetting priceSetting, List<PriceMetalRequestDto> priceMetalRequestDtoList) {
        priceMetalRequestDtoList.forEach(request -> {
            Long priceMetalNameId = request.getPriceMetalNameId();
            PriceMetal priceMetal = priceMetalRepository.findByPriceSettingIdAndPriceMetalNameId(priceSetting.getId(), priceMetalNameId)
                    .orElseGet(() -> new PriceMetal(
                            priceMetalNameService.getPriceMetalName(priceMetalNameId),
                            priceSetting
                    ));
            PriceMetalMapper.mapPriceMetal(priceMetal, request);
            priceMetalRepository.save(priceMetal);
        });
    }

    @Override
    public BigDecimal getCurrentPriceMetalRate(Long priceMetalNameId) {
        return priceMetalRepository.findByPriceMetalNameIdAndPriceSettingUpdateDate(priceMetalNameId, LocalDate.now())
                .map(PriceMetal::getRate)
                .orElse(BigDecimal.ZERO);
    }

    @Override
    public Map<Long, BigDecimal> getCurrentPriceMetalRatesGroupedByPriceMetalNameId(List<Long> priceMetalNameIds) {
        List<PriceMetal> currentPriceMetals = priceMetalRepository.findByPriceMetalNameIdInAndPriceSettingUpdateDate(priceMetalNameIds, LocalDate.now());
        return currentPriceMetals.stream().collect(Collectors.toMap(pm -> pm.getPriceMetalName().getId(), PriceMetal::getRate));
    }
}
