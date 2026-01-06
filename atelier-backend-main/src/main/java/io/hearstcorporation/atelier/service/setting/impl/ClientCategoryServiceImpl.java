package io.hearstcorporation.atelier.service.setting.impl;

import io.hearstcorporation.atelier.dto.mapper.setting.ClientCategoryMapper;
import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.ClientCategoryDto;
import io.hearstcorporation.atelier.dto.model.setting.ClientCategoryUpdateInBatchDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.setting.ClientCategory;
import io.hearstcorporation.atelier.model.setting.ClientCategory_;
import io.hearstcorporation.atelier.repository.setting.ClientCategoryRepository;
import io.hearstcorporation.atelier.service.setting.ClientCategoryService;
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
public class ClientCategoryServiceImpl implements ClientCategoryService {

    private final ClientCategoryRepository clientCategoryRepository;

    @Override
    public List<ClientCategoryDto> getClientCategoryDtoList() {
        return ClientCategoryMapper.toClientCategoryDtoList(clientCategoryRepository.findAll(Sort.by(ClientCategory_.ID)));
    }

    @Override
    public ClientCategoryDto getClientCategoryDto(Long id) {
        return ClientCategoryMapper.toClientCategoryDto(getClientCategory(id));
    }

    @Override
    public ClientCategory getClientCategory(Long id) {
        return clientCategoryRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Client category with id %d was not found.".formatted(id))
        );
    }

    @Override
    @Transactional
    public void updateClientCategories(BatchUpdateDto<ClientCategoryUpdateInBatchDto, Long> batchUpdateDto) {
        if (batchUpdateDto == null || batchUpdateDto.isEmpty()) {
            return;
        }
        batchUpdateDto.getRequestDtoList().forEach(requestDto -> {
            ClientCategory clientCategory = Optional.ofNullable(requestDto.getId())
                    .map(this::getClientCategory)
                    .orElseGet(ClientCategory::new);
            ClientCategoryMapper.mapClientCategory(clientCategory, requestDto);
            clientCategoryRepository.save(clientCategory);
        });
        if (CollectionUtils.isNotEmpty(batchUpdateDto.getDeletedIds())) {
            ExceptionWrapper.onDelete(() -> clientCategoryRepository.deleteByIds(batchUpdateDto.getDeletedIds()),
                    "Client category %s cannot be deleted.".formatted(batchUpdateDto.getDeletedIds()));
        }
    }
}
