package io.hearstcorporation.atelier.dto.mapper.order;

import io.hearstcorporation.atelier.dto.mapper.logo.HallmarkLogoMapper;
import io.hearstcorporation.atelier.dto.mapper.setting.MetalMapper;
import io.hearstcorporation.atelier.dto.model.order.OrderMaterialDto;
import io.hearstcorporation.atelier.model.logo.HallmarkLogo;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.OrderMaterial;
import io.hearstcorporation.atelier.model.setting.Metal;
import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class OrderMaterialMapper {

    public static List<OrderMaterialDto> toOrderMaterialDtoList(List<OrderMaterial> orderMaterials) {
        return orderMaterials.stream()
                .map(OrderMaterialMapper::toOrderMaterialDto)
                .collect(Collectors.toList());
    }

    public static OrderMaterialDto toOrderMaterialDto(OrderMaterial entity) {
        if (entity == null) {
            return null;
        }
        return OrderMaterialDto.builder()
                .id(entity.getId())
                .materialMetal(MetalMapper.toMetalDto(entity.getMaterialMetal()))
                .clawMetal(MetalMapper.toMetalDto(entity.getClawMetal()))
                .hallmarkLogo(HallmarkLogoMapper.toHallmarkLogoDto(entity.getHallmarkLogo()))
                .build();
    }

    public static void mapOrderMaterial(OrderMaterial entity, Order order, Metal materialMetal,
                                        Metal clawMetal, HallmarkLogo hallmarkLogo) {
        entity.setOrder(order);
        entity.setMaterialMetal(materialMetal);
        entity.setClawMetal(clawMetal);
        entity.setHallmarkLogo(hallmarkLogo);
    }
}
