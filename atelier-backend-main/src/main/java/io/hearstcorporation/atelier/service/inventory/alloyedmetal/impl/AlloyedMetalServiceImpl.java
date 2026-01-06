package io.hearstcorporation.atelier.service.inventory.alloyedmetal.impl;

import io.hearstcorporation.atelier.dto.mapper.inventory.InventoryMapper;
import io.hearstcorporation.atelier.dto.mapper.inventory.alloyedmetal.AlloyedMetalMapper;
import io.hearstcorporation.atelier.dto.model.InventoryTotalCostDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalUpdateDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.inventory.InventoryTotalCost;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetal;
import io.hearstcorporation.atelier.model.setting.Metal;
import io.hearstcorporation.atelier.model.setting.MetalPurity;
import io.hearstcorporation.atelier.pagination.PaginationResolver;
import io.hearstcorporation.atelier.repository.inventory.alloyedmetal.AlloyedMetalRepository;
import io.hearstcorporation.atelier.service.inventory.alloyedmetal.AlloyedMetalService;
import io.hearstcorporation.atelier.service.setting.MetalCaratageService;
import io.hearstcorporation.atelier.service.setting.MetalPurityService;
import io.hearstcorporation.atelier.service.setting.MetalService;
import io.hearstcorporation.atelier.specification.inventory.alloyedmetal.AlloyedMetalSpecification;
import io.hearstcorporation.atelier.util.ExceptionWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AlloyedMetalServiceImpl implements AlloyedMetalService {

    private final AlloyedMetalRepository alloyedMetalRepository;
    private final MetalService metalService;
    private final MetalPurityService metalPurityService;
    private final MetalCaratageService metalCaratageService;
    private final PaginationResolver alloyedMetalPaginationResolver;

    @Override
    @Transactional
    public AlloyedMetalDto createAlloyedMetal(AlloyedMetalRequestDto requestDto) {
        Metal metal = metalService.getMetal(requestDto.getMetalId());
        MetalPurity metalPurity = metalPurityService.getMetalPurity(requestDto.getMetalPurityId());
        metalCaratageService.metalCaratageExistsByMetalIdAndPurityIdOrThrow(metal.getId(), metalPurity.getId());
        AlloyedMetal alloyedMetal = AlloyedMetalMapper.toAlloyedMetal(requestDto, metal, metalPurity);
        return AlloyedMetalMapper.toAlloyedMetalDto(alloyedMetalRepository.save(alloyedMetal));
    }

    @Override
    @Transactional
    public void updateAlloyedMetal(Long alloyedMetalId, AlloyedMetalUpdateDto requestDto) {
        AlloyedMetal alloyedMetal = getAlloyedMetal(alloyedMetalId);
        AlloyedMetalMapper.map(alloyedMetal, requestDto);
        alloyedMetalRepository.save(alloyedMetal);
    }

    @Override
    @Transactional
    public void deleteAlloyedMetal(Long alloyedMetalId) {
        AlloyedMetal alloyedMetal = getAlloyedMetal(alloyedMetalId);
        ExceptionWrapper.onDelete(() -> alloyedMetalRepository.deleteById(alloyedMetal.getId()),
                "Alloyed metal with id %d cannot be deleted.".formatted(alloyedMetalId));
    }

    @Override
    public AlloyedMetalDto getAlloyedMetalDto(Long alloyedMetalId) {
        return AlloyedMetalMapper.toAlloyedMetalDto(getFullAlloyedMetal(alloyedMetalId));
    }

    @Override
    public SearchDto<AlloyedMetalDto> searchAlloyedMetals(SearchRequestDto<AlloyedMetalSearchCriteriaDto> searchQueryDto) {
        Pageable pageable = alloyedMetalPaginationResolver.createPageable(
                searchQueryDto.getPage(),
                searchQueryDto.getSize(),
                searchQueryDto.getSorts()
        );
        Specification<AlloyedMetal> specification = AlloyedMetalSpecification.create(searchQueryDto.getSearchCriteria());
        Page<AlloyedMetal> result = alloyedMetalRepository.findAll(specification, pageable);
        return AlloyedMetalMapper.toAlloyedMetalDtoPage(result);
    }

    @Override
    public InventoryTotalCostDto getAlloyedMetalTotalCostDto(AlloyedMetalSearchCriteriaDto searchCriteriaDto) {
        InventoryTotalCost total = alloyedMetalRepository.calculateTotal(AlloyedMetalSpecification.create(searchCriteriaDto));
        return InventoryMapper.toInventoryTotalCostDto(total);
    }

    @Override
    public AlloyedMetal getAlloyedMetal(Long alloyedMetalId) {
        return retrieveAlloyedMetal(alloyedMetalId, alloyedMetalRepository.findById(alloyedMetalId));
    }

    @Override
    public AlloyedMetal getFullAlloyedMetal(Long alloyedMetalId) {
        return retrieveAlloyedMetal(alloyedMetalId, alloyedMetalRepository.findAlloyedMetalById(alloyedMetalId));
    }

    @Override
    public AlloyedMetal getAlloyedMetalByIdAndMetalIdAndMetalPurityId(Long alloyedMetalId, Long metalId,
                                                                      Long metalPurityId) {
        return alloyedMetalRepository.findByIdAndMetalIdAndMetalPurityId(alloyedMetalId, metalId, metalPurityId)
                .orElseThrow(() -> new NotFoundException(String.format("Alloyed metal with id %d and metal id %d " +
                        "and metal purity id %d was not found.", alloyedMetalId, metalId, metalPurityId))
                );
    }

    private AlloyedMetal retrieveAlloyedMetal(Long alloyedMetalId, Optional<AlloyedMetal> alloyedMetalOpt) {
        return alloyedMetalOpt.orElseThrow(
                () -> new NotFoundException("Alloyed metal with id %d was not found.".formatted(alloyedMetalId))
        );
    }
}
