package io.hearstcorporation.atelier.service.inventory.other.impl;

import io.hearstcorporation.atelier.dto.mapper.inventory.other.OtherMaterialMapper;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialSearchCriteriaDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.inventory.other.OtherMaterial;
import io.hearstcorporation.atelier.pagination.PaginationResolver;
import io.hearstcorporation.atelier.repository.inventory.other.OtherMaterialRepository;
import io.hearstcorporation.atelier.service.inventory.other.OtherMaterialService;
import io.hearstcorporation.atelier.specification.inventory.other.OtherMaterialSpecification;
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
public class OtherMaterialServiceImpl implements OtherMaterialService {

    private final OtherMaterialRepository otherMaterialRepository;
    private final PaginationResolver otherMaterialPaginationResolver;

    @Override
    @Transactional
    public OtherMaterialDto createOtherMaterial(OtherMaterialRequestDto requestDto) {
        OtherMaterial otherMaterial = OtherMaterialMapper.toOtherMaterial(requestDto);
        return OtherMaterialMapper.toOtherMaterialDto(otherMaterialRepository.save(otherMaterial));
    }

    @Override
    @Transactional
    public void updateOtherMaterial(Long otherMaterialId, OtherMaterialRequestDto requestDto) {
        OtherMaterial otherMaterial = getOtherMaterial(otherMaterialId);
        OtherMaterialMapper.map(otherMaterial, requestDto);
        otherMaterialRepository.save(otherMaterial);
    }

    @Override
    @Transactional
    public void deleteOtherMaterial(Long otherMaterialId) {
        OtherMaterial otherMaterial = getOtherMaterial(otherMaterialId);
        ExceptionWrapper.onDelete(() -> otherMaterialRepository.deleteById(otherMaterial.getId()),
                "Other material with id %d cannot be deleted.".formatted(otherMaterialId));
    }

    @Override
    public OtherMaterialDto getOtherMaterialDto(Long otherMaterialId) {
        return OtherMaterialMapper.toOtherMaterialDto(getOtherMaterial(otherMaterialId));
    }

    @Override
    public SearchDto<OtherMaterialDto> searchOtherMaterials(SearchRequestDto<OtherMaterialSearchCriteriaDto> searchQueryDto) {
        Pageable pageable = otherMaterialPaginationResolver.createPageable(
                searchQueryDto.getPage(),
                searchQueryDto.getSize(),
                searchQueryDto.getSorts()
        );
        Specification<OtherMaterial> specification = OtherMaterialSpecification.create(searchQueryDto.getSearchCriteria());
        Page<OtherMaterial> result = otherMaterialRepository.findAll(specification, pageable);
        return OtherMaterialMapper.toOtherMaterialDtoPage(result);
    }

    @Override
    public OtherMaterial getOtherMaterial(Long otherMaterialId) {
        return retrieveOtherMaterial(otherMaterialId, otherMaterialRepository.findById(otherMaterialId));
    }

    private OtherMaterial retrieveOtherMaterial(Long otherMaterialId, Optional<OtherMaterial> otherMaterialOpt) {
        return otherMaterialOpt.orElseThrow(
                () -> new NotFoundException("Other material with id %d was not found.".formatted(otherMaterialId))
        );
    }
}
