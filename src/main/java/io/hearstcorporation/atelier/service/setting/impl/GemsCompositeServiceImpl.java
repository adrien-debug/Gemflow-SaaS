package io.hearstcorporation.atelier.service.setting.impl;

import io.hearstcorporation.atelier.dto.model.setting.GemsDto;
import io.hearstcorporation.atelier.dto.model.setting.GemsUpdateInBatchDto;
import io.hearstcorporation.atelier.service.setting.GemsCompositeService;
import io.hearstcorporation.atelier.service.setting.GemsPaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class GemsCompositeServiceImpl implements GemsCompositeService {

    private final GemsPaymentService gemsPaymentService;

    @Override
    public GemsDto getGemsDto() {
        GemsDto result = new GemsDto();
        result.setGemsPayments(gemsPaymentService.getGemsPaymentDtoList());
        return result;
    }

    @Override
    @Transactional
    public void updateGems(GemsUpdateInBatchDto batchUpdateDto) {
        gemsPaymentService.updateGemsPayments(batchUpdateDto.getGemsPayments());
    }
}
