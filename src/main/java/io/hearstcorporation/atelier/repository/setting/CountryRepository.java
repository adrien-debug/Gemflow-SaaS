package io.hearstcorporation.atelier.repository.setting;

import io.hearstcorporation.atelier.model.setting.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, Long> {
}
