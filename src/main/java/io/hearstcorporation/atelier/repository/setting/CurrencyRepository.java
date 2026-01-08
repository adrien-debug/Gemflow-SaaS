package io.hearstcorporation.atelier.repository.setting;

import io.hearstcorporation.atelier.model.setting.Currency;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CurrencyRepository extends JpaRepository<Currency, Long> {

    List<Currency> findAllByIsActiveTrueOrderByNameAsc();

    Optional<Currency> findByIdAndIsActiveTrue(Long id);
}
