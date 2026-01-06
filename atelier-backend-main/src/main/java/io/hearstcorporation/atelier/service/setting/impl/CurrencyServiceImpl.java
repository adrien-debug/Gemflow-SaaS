package io.hearstcorporation.atelier.service.setting.impl;

import io.hearstcorporation.atelier.dto.mapper.setting.CurrencyMapper;
import io.hearstcorporation.atelier.dto.model.setting.CurrencyDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.setting.Currency;
import io.hearstcorporation.atelier.repository.setting.CurrencyRepository;
import io.hearstcorporation.atelier.service.setting.CurrencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CurrencyServiceImpl implements CurrencyService {

    private final CurrencyRepository currencyRepository;

    @Override
    public List<CurrencyDto> getCurrencyDtoList() {
        return currencyRepository.findAllByIsActiveTrueOrderByNameAsc().stream()
                .map(CurrencyMapper::toCurrencyDto)
                .toList();
    }

    @Override
    public Currency getCurrency(Long id) {
        return currencyRepository.findByIdAndIsActiveTrue(id).orElseThrow(
                () -> new NotFoundException("Currency with id %d was not found.".formatted(id))
        );
    }
}
