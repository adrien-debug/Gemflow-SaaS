package io.hearstcorporation.atelier.service.setting.impl;

import io.hearstcorporation.atelier.dto.mapper.setting.PriceSettingMapper;
import io.hearstcorporation.atelier.dto.model.setting.PriceSettingDto;
import io.hearstcorporation.atelier.dto.model.setting.PriceSettingRequestDto;
import io.hearstcorporation.atelier.model.setting.PriceSetting;
import io.hearstcorporation.atelier.repository.setting.PriceSettingRepository;
import io.hearstcorporation.atelier.service.setting.PriceMetalService;
import io.hearstcorporation.atelier.service.setting.PriceSettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class PriceSettingServiceImpl implements PriceSettingService {

    private final PriceSettingRepository priceSettingRepository;
    private final PriceMetalService priceMetalService;

    @Override
    @Transactional(readOnly = true)
    public PriceSettingDto getPriceSettingDto(LocalDate date) {
        return priceSettingRepository.findByUpdateDate(date)
                .map(priceSetting -> PriceSettingMapper.toPriceSettingDto(
                        priceSetting, priceMetalService.getPriceMetalDtoList(priceSetting.getId())))
                .orElseGet(() -> PriceSettingMapper.toPriceSettingDtoTemplate(
                        date, priceMetalService.getPriceMetalDtoList(null)));
    }

    @Override
    @Transactional
    public void updatePriceSetting(LocalDate date, PriceSettingRequestDto request) {
        PriceSetting priceSetting = priceSettingRepository.findByUpdateDate(date)
                .orElseGet(() -> new PriceSetting(date));
        PriceSettingMapper.mapPriceSetting(priceSetting, request);
        priceMetalService.updatePriceMetals(priceSettingRepository.save(priceSetting), request.getPriceMetals());
    }
}
