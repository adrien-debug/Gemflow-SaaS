package io.hearstcorporation.atelier.service.setting.impl;

import io.hearstcorporation.atelier.dto.mapper.setting.PriceMetalNameMapper;
import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.PriceMetalNameDto;
import io.hearstcorporation.atelier.dto.model.setting.PriceMetalNameUpdateInBatchDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.setting.PriceMetalName;
import io.hearstcorporation.atelier.model.setting.PriceMetalName_;
import io.hearstcorporation.atelier.repository.setting.PriceMetalNameRepository;
import io.hearstcorporation.atelier.service.setting.PriceMetalNameService;
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
public class PriceMetalNameServiceImpl implements PriceMetalNameService {

    private final PriceMetalNameRepository priceMetalNameRepository;

    @Override
    public List<PriceMetalNameDto> getPriceMetalNameDtoList() {
        return PriceMetalNameMapper.toPriceMetalNameDtoList(getPriceMetalNames());
    }

    @Override
    public PriceMetalNameDto getPriceMetalNameDto(Long id) {
        return PriceMetalNameMapper.toPriceMetalNameDto(getPriceMetalName(id));
    }

    @Override
    public List<PriceMetalName> getPriceMetalNames() {
        return priceMetalNameRepository.findAll(Sort.by(PriceMetalName_.ID));
    }

    @Override
    public PriceMetalName getPriceMetalName(Long id) {
        return priceMetalNameRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Price metal name with id %d was not found.".formatted(id))
        );
    }

    @Override
    @Transactional
    public void updatePriceMetalNames(BatchUpdateDto<PriceMetalNameUpdateInBatchDto, Long> batchUpdateDto) {
        if (batchUpdateDto == null || batchUpdateDto.isEmpty()) {
            return;
        }
        batchUpdateDto.getRequestDtoList().forEach(requestDto -> {
            PriceMetalName priceMetalName = Optional.ofNullable(requestDto.getId())
                    .map(this::getPriceMetalName)
                    .orElseGet(PriceMetalName::new);
            PriceMetalNameMapper.mapPriceMetalName(priceMetalName, requestDto);
            priceMetalNameRepository.save(priceMetalName);
        });
        if (CollectionUtils.isNotEmpty(batchUpdateDto.getDeletedIds())) {
            //TODO: Add processing of deleting price metal names when we have deliveries for this metal in inventory
            ExceptionWrapper.onDelete(() -> priceMetalNameRepository.deleteByIds(batchUpdateDto.getDeletedIds()),
                    "Price metal names %s cannot be deleted.".formatted(batchUpdateDto.getDeletedIds()));
        }
    }
}
