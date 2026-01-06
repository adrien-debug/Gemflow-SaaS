package io.hearstcorporation.atelier.repository.order.diamond;

import io.hearstcorporation.atelier.model.order.diamon.OrderDiamond;
import io.hearstcorporation.atelier.model.order.diamon.OrderDiamondTotal;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.NonNull;

public interface OrderDiamondTotalRepository {

    OrderDiamondTotal calculateTotal(@NonNull Specification<OrderDiamond> specification);
}
