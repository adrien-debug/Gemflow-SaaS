package io.hearstcorporation.atelier.dto.mapper.order.labour;

import io.hearstcorporation.atelier.dto.mapper.order.OrderMapper;
import io.hearstcorporation.atelier.dto.mapper.user.UserMapper;
import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourRequestDto;
import io.hearstcorporation.atelier.dto.model.order.labour.OrderLabourUpdateDto;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.labour.OrderLabour;
import io.hearstcorporation.atelier.model.user.User;
import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

@UtilityClass
public class OrderLabourMapper {

    public static OrderLabour toOrderLabour(OrderLabourRequestDto requestDto, User employee, Order order) {
        OrderLabour orderLabour = new OrderLabour();
        mapOrderLabour(orderLabour, requestDto, employee, order);
        return orderLabour;
    }

    public static void mapOrderLabour(OrderLabour entity, OrderLabourUpdateDto requestDto, User employee, Order order) {
        mapOrderLabour(entity, requestDto, employee);
        entity.setOrder(order);
    }

    public static void mapOrderLabour(OrderLabour entity, OrderLabourUpdateDto requestDto, User employee) {
        entity.setEmployee(employee);
        entity.setTaskType(requestDto.getTaskType());
        entity.setSpentSeconds(requestDto.getSpentSeconds());
        entity.setDate(requestDto.getDate());
    }

    public static OrderLabourDto toOrderLabourDto(OrderLabour entity, List<ImageDto> employeeImages) {
        if (entity == null) {
            return null;
        }
        return OrderLabourDto.builder()
                .id(entity.getId())
                .employee(UserMapper.toUserWithImageDto(entity.getEmployee(), employeeImages))
                .taskType(entity.getTaskType())
                .spentSeconds(entity.getSpentSeconds())
                .date(entity.getDate())
                .order(OrderMapper.toModelNameDto(entity.getOrder()))
                .build();
    }

    public static SearchDto<OrderLabourDto> toOrderLabourDtoPage(Page<OrderLabour> labourPage,
                                                                 Map<Long, List<ImageDto>> employeeImagesMap) {
        return new SearchDto<>(
                labourPage.getContent().stream()
                        .map(ol -> OrderLabourMapper.toOrderLabourDto(ol, employeeImagesMap.get(ol.getEmployee().getId())))
                        .toList(),
                labourPage.getNumber(),
                labourPage.getSize(),
                labourPage.getTotalPages(),
                labourPage.getTotalElements()
        );
    }
}
