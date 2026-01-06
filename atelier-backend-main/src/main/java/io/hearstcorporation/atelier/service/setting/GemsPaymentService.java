package io.hearstcorporation.atelier.service.setting;

import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.setting.GemsPaymentDto;
import io.hearstcorporation.atelier.dto.model.setting.GemsPaymentUpdateInBatchDto;
import io.hearstcorporation.atelier.model.setting.GemsPayment;

import java.util.List;

public interface GemsPaymentService {

    List<GemsPaymentDto> getGemsPaymentDtoList();

    GemsPaymentDto getGemsPaymentDto(Long id);

    GemsPayment getGemsPayment(Long id);

    void updateGemsPayments(BatchUpdateDto<GemsPaymentUpdateInBatchDto, Long> batchUpdateDto);
}
