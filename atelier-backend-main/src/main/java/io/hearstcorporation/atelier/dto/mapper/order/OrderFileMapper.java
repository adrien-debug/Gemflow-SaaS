package io.hearstcorporation.atelier.dto.mapper.order;

import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.OrderFile;
import io.hearstcorporation.atelier.model.order.OrderFileType;
import lombok.experimental.UtilityClass;

@UtilityClass
public class OrderFileMapper {

    public static OrderFile toOrderFile(OrderFileType type, Order order, AtelierFile atelierFile) {
        OrderFile orderFile = new OrderFile();
        orderFile.setFileType(type);
        orderFile.setOrder(order);
        orderFile.setAtelierFile(atelierFile);
        return orderFile;
    }

    public static OrderFile copyOrderFile(OrderFile fromFile, Order order) {
        OrderFile orderFile = new OrderFile();
        orderFile.setFileType(fromFile.getFileType());
        orderFile.setOrder(order);
        orderFile.setAtelierFile(fromFile.getAtelierFile());
        return orderFile;
    }
}
