package io.hearstcorporation.atelier.repository.inventory.diamond;

import io.hearstcorporation.atelier.model.inventory.diamond.Diamond;
import io.hearstcorporation.atelier.model.inventory.InventoryTotal;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.NonNull;

public interface DiamondTotalRepository {

    InventoryTotal calculateTotal(@NonNull Specification<Diamond> specification);
}
