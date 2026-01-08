package io.hearstcorporation.atelier.repository.setting;

import io.hearstcorporation.atelier.model.setting.PriceSetting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface PriceSettingRepository extends JpaRepository<PriceSetting, Long> {

    Optional<PriceSetting> findByUpdateDate(LocalDate date);
}
