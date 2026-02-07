package io.hearstcorporation.atelier.service.casting.impl;

import io.hearstcorporation.atelier.dto.mapper.casting.CastingMapper;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.casting.CastingDto;
import io.hearstcorporation.atelier.dto.model.casting.CastingFinishDto;
import io.hearstcorporation.atelier.dto.model.casting.CastingListDto;
import io.hearstcorporation.atelier.dto.model.casting.CastingRequestDto;
import io.hearstcorporation.atelier.dto.model.casting.CastingSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.casting.CastingUpdateDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalPurchaseRequestDto;
import io.hearstcorporation.atelier.dto.model.order.task.OrderTaskCastingDto;
import io.hearstcorporation.atelier.exception.IllegalStateException;
import io.hearstcorporation.atelier.exception.InvalidDataException;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.exception.ServiceException;
import io.hearstcorporation.atelier.model.casting.Casting;
import io.hearstcorporation.atelier.model.casting.CastingStatus;
import io.hearstcorporation.atelier.model.inventory.alloy.Alloy;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetal;
import io.hearstcorporation.atelier.model.order.task.OrderTaskStatus;
import io.hearstcorporation.atelier.model.setting.Cylinder;
import io.hearstcorporation.atelier.model.setting.Metal;
import io.hearstcorporation.atelier.model.setting.MetalCaratage;
import io.hearstcorporation.atelier.model.setting.MetalPurity;
import io.hearstcorporation.atelier.model.setting.PriceMetalName;
import io.hearstcorporation.atelier.pagination.casting.CastingPaginationResolver;
import io.hearstcorporation.atelier.repository.casting.CastingRepository;
import io.hearstcorporation.atelier.service.casting.CastingService;
import io.hearstcorporation.atelier.service.inventory.alloy.AlloyPurchaseService;
import io.hearstcorporation.atelier.service.inventory.alloy.AlloyService;
import io.hearstcorporation.atelier.service.inventory.alloyedmetal.AlloyedMetalPurchaseService;
import io.hearstcorporation.atelier.service.inventory.alloyedmetal.AlloyedMetalService;
import io.hearstcorporation.atelier.service.inventory.puremetal.PureMetalPurchaseService;
import io.hearstcorporation.atelier.service.order.metal.OrderMetalCastingService;
import io.hearstcorporation.atelier.service.order.task.OrderTaskService;
import io.hearstcorporation.atelier.service.setting.CylinderService;
import io.hearstcorporation.atelier.service.setting.MetalCaratageService;
import io.hearstcorporation.atelier.service.setting.MetalPurityService;
import io.hearstcorporation.atelier.service.setting.MetalService;
import io.hearstcorporation.atelier.service.user.UserService;
import io.hearstcorporation.atelier.specification.casting.CastingSpecification;
import io.hearstcorporation.atelier.util.ExceptionWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CastingServiceImpl implements CastingService {

    private final CastingRepository castingRepository;
    private final CylinderService cylinderService;
    private final MetalService metalService;
    private final MetalCaratageService metalCaratageService;
    private final MetalPurityService metalPurityService;
    private final AlloyedMetalService alloyedMetalService;
    private final AlloyService alloyService;
    private final OrderTaskService orderTaskService;
    private final PureMetalPurchaseService pureMetalPurchaseService;
    private final AlloyPurchaseService alloyPurchaseService;
    private final AlloyedMetalPurchaseService alloyedMetalPurchaseService;
    private final UserService userService;
    private final OrderMetalCastingService orderMetalCastingService;
    private final CastingPaginationResolver castingPaginationResolver;

    @Override
    @Transactional
    public Long createCasting(CastingRequestDto castingRequestDto) {
        Cylinder cylinder = cylinderService.getCylinder(castingRequestDto.getCylinderId());
        Metal metal = metalService.getMetal(castingRequestDto.getMetalId());
        cylinderService.openCylinder(cylinder, metal);
        Casting casting = CastingMapper.toCasting(cylinder, metal);
        return updateCasting(casting, castingRequestDto, metal).getId();
    }

    @Override
    @Transactional
    public void updateCasting(Long castingId, CastingUpdateDto castingUpdateDto) {
        Casting casting = getCasting(castingId);
        castingNotCompletedOrThrow(casting);
        Metal metal = casting.getMetal();
        updateCasting(casting, castingUpdateDto, metal);
    }

    private Casting updateCasting(Casting casting, CastingUpdateDto castingUpdateDto, Metal metal) {
        MetalPurity metalPurity = metalPurityService.getMetalPurity(castingUpdateDto.getMetalPurityId());
        metalCaratageService.metalCaratageExistsByMetalIdAndPurityIdOrThrow(metal.getId(), metalPurity.getId());
        PriceMetalName priceMetalName = metalCaratageService.getPriceMetalNameByMetalId(metal.getId());
        Alloy alloy = alloyService.getAlloyByIdAndMetalId(castingUpdateDto.getAlloyId(), metal.getId());
        AlloyedMetal alloyedMetal = Optional.ofNullable(castingUpdateDto.getAlloyedMetalId())
                .map(alloyedMetalId -> alloyedMetalService.getAlloyedMetalByIdAndMetalIdAndMetalPurityId(
                        alloyedMetalId, metal.getId(), metalPurity.getId()))
                .orElse(null);
        CastingMapper.mapCasting(casting, castingUpdateDto, metalPurity, alloyedMetal, priceMetalName, alloy);
        return castingRepository.save(casting);
    }

    @Override
    @Transactional
    public void deleteCasting(Long castingId) {
        Casting casting = getCasting(castingId);
        castingNotCompletedOrThrow(casting);
        cylinderService.closeCylinder(casting.getCylinder());
        orderTaskService.updateOrderTaskStatusAndResetCastingByCastingId(castingId, OrderTaskStatus.READY_FOR_CASTING);
        ExceptionWrapper.onDelete(() -> castingRepository.deleteById(casting.getId()),
                "Casting %d cannot be deleted.".formatted(castingId));
    }

    @Override
    @Transactional
    public void finishCasting(Long castingId, CastingFinishDto castingFinishDto) {
        //todo: add idempotentancy key to prevent run this process twice for the same casting

        // Get and validate casting
        Casting casting = getCasting(castingId);
        castingNotCompletedOrThrow(casting);

        // Close cylinder
        cylinderService.closeCylinder(casting.getCylinder());

        // Calculate pure metal cost
        BigDecimal pureMetalWeight = casting.getPureMetalWeight();
        BigDecimal pureMetalCost = pureMetalPurchaseService.reduceWeightByPriceMetalNameId(
                casting.getPriceMetalName().getId(), pureMetalWeight);

        // Calculate alloy cost
        Alloy alloy = casting.getAlloy();
        BigDecimal alloyWeight = casting.getAlloyWeight();
        BigDecimal alloyCost = alloyPurchaseService.reduceWeightByAlloyId(
                alloy.getId(), alloyWeight);

        // Calculate alloyed metal cost
        AlloyedMetal alloyedMetal = casting.getAlloyedMetal();
        BigDecimal alloyedMetalWeight = casting.getAlloyedMetalWeight();
        BigDecimal alloyedMetalCost = alloyedMetal != null
                ? alloyedMetalPurchaseService.reduceWeightByAlloyedMetalId(
                alloyedMetal.getId(), alloyedMetalWeight)
                : BigDecimal.ZERO;

        // Update casting costs and status
        casting.setStatus(CastingStatus.FINISHED);
        casting.setPureMetalCost(pureMetalCost);
        casting.setAlloyCost(alloyCost);
        casting.setAlloyedMetalCost(alloyedMetalCost);
        casting.setCompletedAt(Instant.now());
        casting.setCompletedBy(userService.getCurrentUser());
        castingRepository.save(casting);

        // Calculate casted alloyed metal price per gram
        BigDecimal castedMetalPriceGram = casting.getTotalWeight().compareTo(BigDecimal.ZERO) > 0
                ? pureMetalCost.add(alloyCost).add(alloyedMetalCost).divide(casting.getTotalWeight(), 3, RoundingMode.HALF_UP)
                : BigDecimal.ZERO;

        // Return reuse weight as new purchase for provided alloyed metal
        if (casting.getReuseWeight().compareTo(BigDecimal.ZERO) > 0) {
            if (castingFinishDto.getAlloyedMetalId() == null) {
                throw new InvalidDataException("Alloyed metal id must not be null because reuse weight is greater than zero.");
            }
            AlloyedMetal alloyedMetalForReuse = alloyedMetalService.getAlloyedMetalByIdAndMetalIdAndMetalPurityId(
                    castingFinishDto.getAlloyedMetalId(), casting.getMetal().getId(), casting.getMetalPurity().getId());
            AlloyedMetalPurchaseRequestDto alloyedMetalPurchaseRequestDto = new AlloyedMetalPurchaseRequestDto();
            alloyedMetalPurchaseRequestDto.setAlloyId(alloy.getId());
            alloyedMetalPurchaseRequestDto.setAlloyedMetalId(alloyedMetalForReuse.getId());
            alloyedMetalPurchaseRequestDto.setBalanceDate(LocalDate.now());
            alloyedMetalPurchaseRequestDto.setBatchWeight(casting.getReuseWeight());
            alloyedMetalPurchaseRequestDto.setPriceGram(castedMetalPriceGram);
            alloyedMetalPurchaseService.createAlloyedMetalPurchase(casting, alloyedMetalPurchaseRequestDto);
        }

        orderMetalCastingService.createOrderMetalCastings(castedMetalPriceGram, casting);
    }

    private void castingNotCompletedOrThrow(Casting casting) {
        if (casting.getStatus() != CastingStatus.OPEN) {
            throw new IllegalStateException("Casting with id %d already completed.".formatted(casting.getId()));
        }
    }

    @Override
    public boolean openCastingExistsForOrder(Long orderId) {
        return castingRepository.openExistsByOrderId(orderId);
    }

    @Override
    @Transactional(readOnly = true)
    public SearchDto<CastingListDto> searchCastings(SearchRequestDto<CastingSearchCriteriaDto> castingSearchQueryDto) {
        Pageable pageable = castingPaginationResolver.createPageable(
                castingSearchQueryDto.getPage(),
                castingSearchQueryDto.getSize(),
                castingSearchQueryDto.getSorts()
        );
        Specification<Casting> specification = CastingSpecification.create(castingSearchQueryDto.getSearchCriteria());
        Page<Casting> result = castingRepository.findAll(specification, pageable);
        List<Long> castingIds = result.getContent().stream().map(Casting::getId).toList();
        Map<Long, List<Long>> orderIdsGroupedByCastingId = orderTaskService.getOrderIdsGroupedByCastingId(castingIds);
        return CastingMapper.toCastingListDtoPage(result, orderIdsGroupedByCastingId);
    }

    @Override
    @Transactional(readOnly = true)
    public CastingDto getCastingDto(Long castingId) {
        Casting casting = getFullCasting(castingId);
        MetalCaratage metalCaratage = metalCaratageService.getMetalCaratageByMetalId(casting.getMetal().getId());
        List<OrderTaskCastingDto> orderTasks = orderTaskService.getOrderTaskCastingDtoListByCastingId(castingId);
        return CastingMapper.toCastingDto(casting, metalCaratage.getWaxCastingValue(), orderTasks);
    }

    @Override
    public Casting getCasting(Long castingId) {
        return retrieveCasting(castingId, castingRepository.findById(castingId));
    }

    @Override
    public Casting getFullCasting(Long castingId) {
        return retrieveCasting(castingId, castingRepository.findCastingById(castingId));
    }

    @Override
    public Casting getOpenCastingByCylinderIdAndMetalId(Long cylinderId, Long metalId) {
        List<Casting> castings = castingRepository.findByCylinderIdAndMetalIdAndStatus(cylinderId, metalId, CastingStatus.OPEN);
        if (castings.isEmpty()) {
            throw new NotFoundException("Open casting by cylinder id %d and metal id %d was not found."
                    .formatted(cylinderId, metalId));
        }
        if (castings.size() > 1) {
            throw new ServiceException("There are several open castings with cylinder id %d and metal id %d."
                    .formatted(cylinderId, metalId));
        }
        return castings.getFirst();
    }
    //todo: If rejected, then all tasks are recreated in 3d printing and tasks related to casting are rejected too.
    // One task per order in 3D printing. But it can be situation when not all parts was in casting for order,
    // that why I cannot create 1 task per order in 3d printing, we should move as separate tasks

    private Casting retrieveCasting(Long castingId, Optional<Casting> castingOpt) {
        return castingOpt.orElseThrow(
                () -> new NotFoundException("Casting with id %d was not found.".formatted(castingId))
        );
    }
}
