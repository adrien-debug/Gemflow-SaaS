package io.hearstcorporation.atelier.repository.setting;

import io.hearstcorporation.atelier.model.setting.PriceMetal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface PriceMetalRepository extends JpaRepository<PriceMetal, Long> {

    Optional<PriceMetal> findByPriceSettingIdAndPriceMetalNameId(Long priceSettingId, Long priceMetalNameId);

    List<PriceMetal> findAllByPriceSettingId(Long priceSettingId);

    Optional<PriceMetal> findByPriceMetalNameIdAndPriceSettingUpdateDate(Long priceMetalNameId, LocalDate priceSettingUpdateDate);

    List<PriceMetal> findByPriceMetalNameIdInAndPriceSettingUpdateDate(List<Long> priceMetalNameIds, LocalDate priceSettingUpdateDate);
}
