package io.hearstcorporation.atelier.service.inventory.alloy.impl;

import io.hearstcorporation.atelier.dto.mapper.inventory.InventoryMapper;
import io.hearstcorporation.atelier.dto.mapper.inventory.alloy.AlloyMapper;
import io.hearstcorporation.atelier.dto.model.InventoryTotalCostDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloyDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloyRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloySearchCriteriaDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.inventory.InventoryTotalCost;
import io.hearstcorporation.atelier.model.inventory.alloy.Alloy;
import io.hearstcorporation.atelier.model.setting.Metal;
import io.hearstcorporation.atelier.pagination.PaginationResolver;
import io.hearstcorporation.atelier.repository.inventory.alloy.AlloyRepository;
import io.hearstcorporation.atelier.service.inventory.alloy.AlloyService;
import io.hearstcorporation.atelier.service.setting.MetalService;
import io.hearstcorporation.atelier.specification.inventory.alloy.AlloySpecification;
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
public class AlloyServiceImpl implements AlloyService {

    private final AlloyRepository alloyRepository;
    private final MetalService metalService;
    private final PaginationResolver alloyPaginationResolver;

    @Override
    @Transactional
    public AlloyDto createAlloy(AlloyRequestDto requestDto) {
        Metal metal = metalService.getMetal(requestDto.getMetalId());
        Alloy alloy = AlloyMapper.toAlloy(requestDto, metal);
        return AlloyMapper.toAlloyDto(alloyRepository.save(alloy));
    }

    @Override
    @Transactional
    public void updateAlloy(Long alloyId, AlloyRequestDto requestDto) {
        Alloy alloy = getAlloy(alloyId);
        Metal metal = metalService.getMetal(requestDto.getMetalId());
        AlloyMapper.map(alloy, requestDto, metal);
        alloyRepository.save(alloy);
    }

    @Override
    @Transactional
    public void deleteAlloy(Long alloyId) {
        Alloy alloy = getAlloy(alloyId);
        ExceptionWrapper.onDelete(() -> alloyRepository.deleteById(alloy.getId()),
                "Alloy with id %d cannot be deleted.".formatted(alloyId));
    }

    @Override
    public AlloyDto getAlloyDto(Long alloyId) {
        return AlloyMapper.toAlloyDto(getFullAlloy(alloyId));
    }

    @Override
    public SearchDto<AlloyDto> searchAlloys(SearchRequestDto<AlloySearchCriteriaDto> searchQueryDto) {
        Pageable pageable = alloyPaginationResolver.createPageable(
                searchQueryDto.getPage(),
                searchQueryDto.getSize(),
                searchQueryDto.getSorts()
        );
        Specification<Alloy> specification = AlloySpecification.create(searchQueryDto.getSearchCriteria());
        Page<Alloy> result = alloyRepository.findAll(specification, pageable);
        return AlloyMapper.toAlloyDtoPage(result);
    }

    @Override
    public InventoryTotalCostDto getAlloyTotalCostDto(AlloySearchCriteriaDto searchCriteriaDto) {
        InventoryTotalCost total = alloyRepository.calculateTotal(AlloySpecification.create(searchCriteriaDto));
        return InventoryMapper.toInventoryTotalCostDto(total);
    }

    @Override
    public Alloy getAlloy(Long alloyId) {
        return retrieveAlloy(alloyId, alloyRepository.findById(alloyId));
    }

    @Override
    public Alloy getFullAlloy(Long alloyId) {
        return retrieveAlloy(alloyId, alloyRepository.findAlloyById(alloyId));
    }

    @Override
    public Alloy getAlloyByIdAndMetalId(Long alloyId, Long metalId) {
        return alloyRepository.findByIdAndMetalId(alloyId, metalId)
                .orElseThrow(() -> new NotFoundException("Alloy with id %d and metal id %d was not found."
                        .formatted(alloyId, metalId)));
    }

    private Alloy retrieveAlloy(Long alloyId, Optional<Alloy> alloyOpt) {
        return alloyOpt.orElseThrow(
                () -> new NotFoundException("Alloy with id %d was not found.".formatted(alloyId))
        );
    }
}
