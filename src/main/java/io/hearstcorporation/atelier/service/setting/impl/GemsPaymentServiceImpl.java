package io.hearstcorporation.atelier.service.setting.impl;

import io.hearstcorporation.atelier.dto.mapper.setting.GemsPaymentMapper;
import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.GemsPaymentDto;
import io.hearstcorporation.atelier.dto.model.setting.GemsPaymentUpdateInBatchDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.setting.GemsPayment;
import io.hearstcorporation.atelier.model.setting.GemsPayment_;
import io.hearstcorporation.atelier.repository.setting.GemsPaymentRepository;
import io.hearstcorporation.atelier.service.setting.GemsPaymentService;
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
public class GemsPaymentServiceImpl implements GemsPaymentService {

    private final GemsPaymentRepository gemsPaymentRepository;

    @Override
    public List<GemsPaymentDto> getGemsPaymentDtoList() {
        return GemsPaymentMapper.toGemsPaymentDtoList(gemsPaymentRepository.findAll(Sort.by(GemsPayment_.ID)));
    }

    @Override
    public GemsPaymentDto getGemsPaymentDto(Long id) {
        return GemsPaymentMapper.toGemsPaymentDto(getGemsPayment(id));
    }

    @Override
    public GemsPayment getGemsPayment(Long id) {
        return gemsPaymentRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Gems payment with id %d was not found.".formatted(id))
        );
    }

    @Override
    @Transactional
    public void updateGemsPayments(BatchUpdateDto<GemsPaymentUpdateInBatchDto, Long> batchUpdateDto) {
        if (batchUpdateDto == null || batchUpdateDto.isEmpty()) {
            return;
        }
        batchUpdateDto.getRequestDtoList().forEach(requestDto -> {
            GemsPayment gemsPayment = Optional.ofNullable(requestDto.getId())
                    .map(this::getGemsPayment)
                    .orElseGet(GemsPayment::new);
            GemsPaymentMapper.mapGemsPayment(gemsPayment, requestDto);
            gemsPaymentRepository.save(gemsPayment);
        });
        if (CollectionUtils.isNotEmpty(batchUpdateDto.getDeletedIds())) {
            ExceptionWrapper.onDelete(() -> gemsPaymentRepository.deleteByIds(batchUpdateDto.getDeletedIds()),
                    "Gems payments %s cannot be deleted.".formatted(batchUpdateDto.getDeletedIds()));
        }
    }
}
