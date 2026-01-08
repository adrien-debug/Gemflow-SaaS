package io.hearstcorporation.atelier.service.logo.impl;

import io.hearstcorporation.atelier.dto.mapper.logo.HallmarkLogoMapper;
import io.hearstcorporation.atelier.dto.model.logo.HallmarkLogoDto;
import io.hearstcorporation.atelier.dto.model.logo.HallmarkLogoRequestDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.logo.HallmarkLogo;
import io.hearstcorporation.atelier.repository.logo.HallmarkLogoRepository;
import io.hearstcorporation.atelier.service.logo.HallmarkLogoService;
import io.hearstcorporation.atelier.util.ExceptionWrapper;
import io.hearstcorporation.atelier.util.ServiceHelper;
import lombok.RequiredArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HallmarkLogoServiceImpl implements HallmarkLogoService {

    private final HallmarkLogoRepository hallmarkLogoRepository;

    @Override
    @Transactional
    public HallmarkLogoDto createHallmarkLogo(HallmarkLogoRequestDto hallmarkLogoRequestDto) {
        HallmarkLogo hallmarkLogo = HallmarkLogoMapper.toHallmarkLogo(hallmarkLogoRequestDto);
        return HallmarkLogoMapper.toHallmarkLogoDto(hallmarkLogoRepository.save(hallmarkLogo));
    }

    @Override
    @Transactional
    public HallmarkLogoDto updateHallmarkLogo(Long hallmarkLogoId, HallmarkLogoRequestDto hallmarkLogoRequestDto) {
        HallmarkLogo hallmarkLogo = getHallmarkLogo(hallmarkLogoId);
        HallmarkLogoMapper.mapHallmarkLogo(hallmarkLogo, hallmarkLogoRequestDto);
        return HallmarkLogoMapper.toHallmarkLogoDto(hallmarkLogoRepository.save(hallmarkLogo));
    }

    @Override
    @Transactional
    public void deleteHallmarkLogo(Long hallmarkLogoId) {
        HallmarkLogo hallmarkLogo = getHallmarkLogo(hallmarkLogoId);
        ExceptionWrapper.onDelete(() -> hallmarkLogoRepository.deleteById(hallmarkLogo.getId()),
                "Hallmark logo %d cannot be deleted.".formatted(hallmarkLogoId));
    }

    @Override
    public List<HallmarkLogoDto> getHallmarkLogoDtoList() {
        return HallmarkLogoMapper.toHallmarkLogoDtoList(hallmarkLogoRepository.findAll());
    }

    @Override
    public HallmarkLogoDto getHallmarkLogoDto(Long hallmarkLogoId) {
        return HallmarkLogoMapper.toHallmarkLogoDto(getHallmarkLogo(hallmarkLogoId));
    }

    @Override
    public HallmarkLogo getHallmarkLogo(Long hallmarkLogoId) {
        return hallmarkLogoRepository.findById(hallmarkLogoId).orElseThrow(
                () -> new NotFoundException("HallmarkLogo with id %d was not found.".formatted(hallmarkLogoId))
        );
    }

    @Override
    public List<HallmarkLogo> getHallmarkLogos(List<Long> ids) {
        if (CollectionUtils.isEmpty(ids)) {
            return new ArrayList<>();
        }
        List<HallmarkLogo> foundEntities = hallmarkLogoRepository.findAllByIdInOrderByIdAsc(ids);
        ServiceHelper.compareIdsOrThrow(foundEntities, ids, HallmarkLogo.class);
        return foundEntities;
    }

    @Override
    public Map<Long, HallmarkLogo> getHallmarkLogosMappedById(List<Long> ids) {
        return getHallmarkLogos(ids).stream().collect(Collectors.toMap(HallmarkLogo::getId, Function.identity()));
    }
}
