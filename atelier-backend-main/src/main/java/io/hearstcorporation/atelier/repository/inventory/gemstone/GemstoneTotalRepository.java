package io.hearstcorporation.atelier.repository.inventory.gemstone;

import io.hearstcorporation.atelier.model.inventory.gemstone.Gemstone;
import io.hearstcorporation.atelier.model.inventory.InventoryTotal;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.NonNull;

public interface GemstoneTotalRepository {

    InventoryTotal calculateTotal(@NonNull Specification<Gemstone> specification);
}
