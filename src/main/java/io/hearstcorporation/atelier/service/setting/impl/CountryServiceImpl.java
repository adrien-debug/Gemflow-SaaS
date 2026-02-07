package io.hearstcorporation.atelier.service.setting.impl;

import io.hearstcorporation.atelier.dto.mapper.setting.CountryMapper;
import io.hearstcorporation.atelier.dto.model.setting.CountryDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.setting.Country;
import io.hearstcorporation.atelier.model.setting.Country_;
import io.hearstcorporation.atelier.repository.setting.CountryRepository;
import io.hearstcorporation.atelier.service.setting.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CountryServiceImpl implements CountryService {

    private final CountryRepository countryRepository;

    @Override
    public List<CountryDto> getCountryDtoList() {
        return countryRepository.findAll(Sort.by(Sort.Direction.ASC, Country_.NAME)).stream()
                .map(CountryMapper::toCountryDto)
                .toList();
    }

    @Override
    public Country getCountry(Long id) {
        return countryRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Country with id %d was not found.".formatted(id))
        );
    }
}
