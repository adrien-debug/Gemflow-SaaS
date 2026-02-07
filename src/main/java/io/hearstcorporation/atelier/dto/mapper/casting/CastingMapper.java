package io.hearstcorporation.atelier.dto.mapper.casting;

import io.hearstcorporation.atelier.dto.mapper.inventory.alloy.AlloyMapper;
import io.hearstcorporation.atelier.dto.mapper.inventory.alloyedmetal.AlloyedMetalMapper;
import io.hearstcorporation.atelier.dto.mapper.setting.CylinderMapper;
import io.hearstcorporation.atelier.dto.mapper.setting.MetalMapper;
import io.hearstcorporation.atelier.dto.mapper.setting.MetalPurityMapper;
import io.hearstcorporation.atelier.dto.mapper.setting.PriceMetalNameMapper;
import io.hearstcorporation.atelier.dto.mapper.user.UserMapper;
import io.hearstcorporation.atelier.dto.model.ModelNameDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.casting.CastingDto;
import io.hearstcorporation.atelier.dto.model.casting.CastingListDto;
import io.hearstcorporation.atelier.dto.model.casting.CastingMetalDto;
import io.hearstcorporation.atelier.dto.model.casting.CastingUpdateDto;
import io.hearstcorporation.atelier.dto.model.order.task.OrderTaskCastingDto;
import io.hearstcorporation.atelier.model.casting.Casting;
import io.hearstcorporation.atelier.model.inventory.alloy.Alloy;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetal;
import io.hearstcorporation.atelier.model.setting.Cylinder;
import io.hearstcorporation.atelier.model.setting.Metal;
import io.hearstcorporation.atelier.model.setting.MetalPurity;
import io.hearstcorporation.atelier.model.setting.PriceMetalName;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@UtilityClass
public class CastingMapper {

    public static Casting toCasting(Cylinder cylinder, Metal metal) {
        Casting casting = new Casting();
        casting.setCylinder(cylinder);
        casting.setMetal(metal);
        return casting;
    }

    public static void mapCasting(Casting casting, CastingUpdateDto castingRequest,
                                  MetalPurity metalPurity, AlloyedMetal alloyedMetal,
                                  PriceMetalName priceMetalName, Alloy alloy) {
        casting.setSupportWithWaxTreeWeight(castingRequest.getSupportWithWaxTreeWeight());
        casting.setSupportWeight(castingRequest.getSupportWeight());
        casting.setAlloyedMetalWeight(castingRequest.getAlloyedMetalWeight());
        casting.setPureMetalWeight(castingRequest.getPureMetalWeight());
        casting.setAlloyWeight(castingRequest.getAlloyWeight());
        casting.setReuseWeight(castingRequest.getReuseWeight());
        casting.setMetalPurity(metalPurity);
        casting.setAlloyedMetal(alloyedMetal);
        casting.setPriceMetalName(priceMetalName);
        casting.setAlloy(alloy);
    }

    public static CastingDto toCastingDto(Casting casting, BigDecimal waxCastingValue, List<OrderTaskCastingDto> orderTasks) {
        if (casting == null) {
            return null;
        }
        return CastingDto.builder()
                .id(casting.getId())
                .supportWithWaxTreeWeight(casting.getSupportWithWaxTreeWeight())
                .supportWeight(casting.getSupportWeight())
                .waxWeight(casting.getWaxWeight())
                .preliminaryCastWeight(waxCastingValue.multiply(ObjectUtils.defaultIfNull(casting.getWaxWeight(), BigDecimal.ZERO)))
                .alloyedMetalWeight(casting.getAlloyedMetalWeight())
                .alloyedMetalCost(casting.getAlloyedMetalCost())
                .pureMetalWeight(casting.getPureMetalWeight())
                .pureMetalCost(casting.getPureMetalCost())
                .alloyWeight(casting.getAlloyWeight())
                .alloyCost(casting.getAlloyCost())
                .reuseWeight(casting.getReuseWeight())
                .totalWeight(casting.getTotalWeight())
                .totalCost(casting.getTotalCost())
                .status(casting.getStatus())
                .completedAt(casting.getCompletedAt())
                .completedBy(UserMapper.toUserShortDto(casting.getCompletedBy()))
                .createdAt(casting.getCreatedAt())
                .createdBy(UserMapper.toUserShortDto(casting.getCreatedBy()))
                .cylinder(CylinderMapper.toCylinderDto(casting.getCylinder()))
                .metal(MetalMapper.toMetalDto(casting.getMetal()))
                .metalPurity(MetalPurityMapper.toMetalPurityDto(casting.getMetalPurity()))
                .alloyedMetal(AlloyedMetalMapper.toModelNameDto(casting.getAlloyedMetal()))
                .priceMetalName(PriceMetalNameMapper.toModelNameDto(casting.getPriceMetalName()))
                .alloy(AlloyMapper.toModelNameDto(casting.getAlloy()))
                .orderTasks(orderTasks)
                .build();
    }

    public static Long toCastingId(Casting casting) {
        return casting != null ? casting.getId() : null;
    }

    public static CastingListDto toCastingListDto(Casting casting, List<Long> orderIds) {
        if (casting == null) {
            return null;
        }
        return CastingListDto.builder()
                .id(casting.getId())
                .alloyedMetalWeight(casting.getAlloyedMetalWeight())
                .pureMetalWeight(casting.getPureMetalWeight())
                .alloyWeight(casting.getAlloyWeight())
                .status(casting.getStatus())
                .completedAt(casting.getCompletedAt())
                .completedBy(UserMapper.toUserShortDto(casting.getCompletedBy()))
                .createdAt(casting.getCreatedAt())
                .createdBy(UserMapper.toUserShortDto(casting.getCreatedBy()))
                .cylinder(CylinderMapper.toCylinderDto(casting.getCylinder()))
                .metal(MetalMapper.toMetalDto(casting.getMetal()))
                .metalPurity(MetalPurityMapper.toMetalPurityDto(casting.getMetalPurity()))
                .alloyedMetal(AlloyedMetalMapper.toModelNameDto(casting.getAlloyedMetal()))
                .priceMetalName(PriceMetalNameMapper.toModelNameDto(casting.getPriceMetalName()))
                .alloy(AlloyMapper.toModelNameDto(casting.getAlloy()))
                .orderIds(orderIds)
                .build();
    }

    public static SearchDto<CastingListDto> toCastingListDtoPage(Page<Casting> castingPage,
                                                                 Map<Long, List<Long>> orderIdsGroupedByCastingId) {
        return new SearchDto<>(
                castingPage.getContent().stream()
                        .map(casting -> CastingMapper.toCastingListDto(casting,
                                orderIdsGroupedByCastingId.get(casting.getId())))
                        .toList(),
                castingPage.getNumber(),
                castingPage.getSize(),
                castingPage.getTotalPages(),
                castingPage.getTotalElements()
        );
    }

    public static ModelNameDto toCylinderModelNameDto(Casting casting) {
        if (casting == null) {
            return null;
        }
        return CylinderMapper.toModelNameDto(casting.getCylinder());
    }

    public static CastingMetalDto toCastingMetalDto(Casting casting) {
        if (casting == null) {
            return null;
        }
        return CastingMetalDto.builder()
                .id(casting.getId())
                .metal(MetalMapper.toMetalDto(casting.getMetal()))
                .metalPurity(MetalPurityMapper.toMetalPurityDto(casting.getMetalPurity()))
                .build();
    }
}
