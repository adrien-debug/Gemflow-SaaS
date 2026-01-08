package io.hearstcorporation.atelier.service.setting.impl;

import io.hearstcorporation.atelier.dto.mapper.setting.CollectionMapper;
import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.CollectionDto;
import io.hearstcorporation.atelier.dto.model.setting.CollectionUpdateInBatchDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.setting.Collection;
import io.hearstcorporation.atelier.model.setting.Collection_;
import io.hearstcorporation.atelier.repository.setting.CollectionRepository;
import io.hearstcorporation.atelier.service.setting.CollectionService;
import io.hearstcorporation.atelier.util.ExceptionWrapper;
import lombok.RequiredArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CollectionServiceImpl implements CollectionService {

    private final CollectionRepository collectionRepository;

    @Override
    public List<CollectionDto> getCollectionDtoList() {
        return CollectionMapper.toCollectionDtoList(collectionRepository.findAll(Sort.by(Collection_.ID)));
    }

    @Override
    public CollectionDto getCollectionDto(Long id) {
        return CollectionMapper.toCollectionDto(getCollection(id));
    }

    @Override
    public Collection getCollection(Long id) {
        return collectionRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Collection with id %d was not found.".formatted(id))
        );
    }

    @Override
    @Transactional
    public void updateCollections(BatchUpdateDto<CollectionUpdateInBatchDto, Long> batchUpdateDto) {
        if (batchUpdateDto == null || batchUpdateDto.isEmpty()) {
            return;
        }
        batchUpdateDto.getRequestDtoList().forEach(requestDto -> {
            Collection collection = Optional.ofNullable(requestDto.getId())
                    .map(this::getCollection)
                    .orElseGet(Collection::new);
            CollectionMapper.mapCollection(collection, requestDto);
            collectionRepository.save(collection);
        });
        if (CollectionUtils.isNotEmpty(batchUpdateDto.getDeletedIds())) {
            ExceptionWrapper.onDelete(() -> collectionRepository.deleteByIds(batchUpdateDto.getDeletedIds()),
                    "Collections %s cannot be deleted.".formatted(batchUpdateDto.getDeletedIds()));
        }
    }
}
