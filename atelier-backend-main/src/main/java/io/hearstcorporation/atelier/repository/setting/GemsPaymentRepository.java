package io.hearstcorporation.atelier.repository.setting;

import io.hearstcorporation.atelier.model.setting.GemsPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GemsPaymentRepository extends JpaRepository<GemsPayment, Long> {

    @Modifying
    @Query("DELETE FROM GemsPayment gp WHERE gp.id IN :ids")
    void deleteByIds(List<Long> ids);
}
