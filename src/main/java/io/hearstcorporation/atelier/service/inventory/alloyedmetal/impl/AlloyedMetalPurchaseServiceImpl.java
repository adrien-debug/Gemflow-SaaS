package io.hearstcorporation.atelier.service.inventory.alloyedmetal.impl;

import io.hearstcorporation.atelier.dto.mapper.inventory.alloyedmetal.AlloyedMetalPurchaseMapper;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.error.ErrorCode;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalPurchaseDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalPurchaseRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalPurchaseSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal.AlloyedMetalPurchaseUpdateDto;
import io.hearstcorporation.atelier.exception.InvalidDataException;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.casting.Casting;
import io.hearstcorporation.atelier.model.inventory.alloy.Alloy;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetal;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetalPurchase;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetalPurchase_;
import io.hearstcorporation.atelier.pagination.PaginationResolver;
import io.hearstcorporation.atelier.repository.inventory.alloyedmetal.AlloyedMetalPurchaseRepository;
import io.hearstcorporation.atelier.service.inventory.alloy.AlloyService;
import io.hearstcorporation.atelier.service.inventory.alloyedmetal.AlloyedMetalPurchaseService;
import io.hearstcorporation.atelier.service.inventory.alloyedmetal.AlloyedMetalService;
import io.hearstcorporation.atelier.specification.inventory.alloyedmetal.AlloyedMetalPurchaseSpecification;
import io.hearstcorporation.atelier.util.ExceptionWrapper;
import io.hearstcorporation.atelier.util.WeightHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.NonNull;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AlloyedMetalPurchaseServiceImpl implements AlloyedMetalPurchaseService {

    private final AlloyedMetalPurchaseRepository alloyedMetalPurchaseRepository;
    private final AlloyService alloyService;
    private final AlloyedMetalService alloyedMetalService;
    private final PaginationResolver alloyedMetalPurchasePaginationResolver;

    @Override
    @Transactional
    public AlloyedMetalPurchaseDto createAlloyedMetalPurchase(AlloyedMetalPurchaseRequestDto requestDto) {
        return createAlloyedMetalPurchase(null, requestDto);
    }

    @Override
    @Transactional
    public AlloyedMetalPurchaseDto createAlloyedMetalPurchase(Casting casting, AlloyedMetalPurchaseRequestDto requestDto) {
        Alloy alloy = alloyService.getAlloy(requestDto.getAlloyId());
        AlloyedMetal alloyedMetal = alloyedMetalService.getAlloyedMetal(requestDto.getAlloyedMetalId());
        AlloyedMetalPurchase alloyedMetalPurchase = AlloyedMetalPurchaseMapper.toAlloyedMetalPurchase(
                requestDto, alloy, alloyedMetal, casting);
        alloyedMetalPurchase = alloyedMetalPurchaseRepository.save(alloyedMetalPurchase);
        return AlloyedMetalPurchaseMapper.toAlloyedMetalPurchaseDto(alloyedMetalPurchase);
    }

    @Override
    @Transactional
    public AlloyedMetalPurchaseDto createAlloyedMetalPurchase(Long alloyId, Long alloyedMetalId, LocalDate balanceDate, BigDecimal batchWeight, BigDecimal priceGram) {
        return createAlloyedMetalPurchase(null, alloyId, alloyedMetalId, balanceDate, batchWeight, priceGram);
    }

    @Override
    @Transactional
    public AlloyedMetalPurchaseDto createAlloyedMetalPurchase(Casting casting, Long alloyId, Long alloyedMetalId, LocalDate balanceDate, BigDecimal batchWeight, BigDecimal priceGram) {
        AlloyedMetalPurchaseRequestDto alloyedMetalPurchaseRequestDto = new AlloyedMetalPurchaseRequestDto();
        alloyedMetalPurchaseRequestDto.setAlloyId(alloyId);
        alloyedMetalPurchaseRequestDto.setAlloyedMetalId(alloyedMetalId);
        alloyedMetalPurchaseRequestDto.setBalanceDate(balanceDate);
        alloyedMetalPurchaseRequestDto.setBatchWeight(batchWeight);
        alloyedMetalPurchaseRequestDto.setPriceGram(priceGram);
        return createAlloyedMetalPurchase(casting, alloyedMetalPurchaseRequestDto);
    }

    @Override
    @Transactional
    @Retryable(retryFor = OptimisticLockingFailureException.class)
    public void updateAlloyedMetalPurchase(Long alloyedMetalPurchaseId, AlloyedMetalPurchaseUpdateDto updateDto) {
        AlloyedMetalPurchase alloyedMetalPurchase = getAlloyedMetalPurchase(alloyedMetalPurchaseId);
        BigDecimal newRemainingWeight = WeightHelper.getRemainingWeight(updateDto.getBatchWeight(), alloyedMetalPurchase.getBatchWeight(), alloyedMetalPurchase.getRemainingWeight(), alloyedMetalPurchaseId);
        AlloyedMetalPurchaseMapper.mapAlloyedMetalPurchase(alloyedMetalPurchase, updateDto, newRemainingWeight);
        alloyedMetalPurchaseRepository.save(alloyedMetalPurchase);
    }

    @Override
    @Transactional
    public void deleteAlloyedMetalPurchase(Long alloyedMetalPurchaseId) {
        AlloyedMetalPurchase alloyedMetalPurchase = getAlloyedMetalPurchase(alloyedMetalPurchaseId);
        ExceptionWrapper.onDelete(() -> alloyedMetalPurchaseRepository.deleteById(alloyedMetalPurchase.getId()),
                "Alloyed metal purchase with id %d cannot be deleted.".formatted(alloyedMetalPurchaseId));
    }

    /**
     * Reduce weight from the oldest purchases.
     * Purchases are used one by one until provided weight will not be reduced from inventory.
     *
     * @param alloyedMetalId Alloyed metal id
     * @param weight         Weight to reduce
     * @return Cost of the reduced weight
     */
    @Override
    @Transactional
    @Retryable(retryFor = OptimisticLockingFailureException.class)
    public BigDecimal reduceWeightByAlloyedMetalId(@NonNull Long alloyedMetalId, @NonNull BigDecimal weight) {
        if (weight.compareTo(BigDecimal.ZERO) < 0) {
            throw new InvalidDataException("Reduce weight must be greater than zero.");
        }
        if (weight.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO;
        }
        AlloyedMetal alloyedMetal = alloyedMetalService.getAlloyedMetal(alloyedMetalId);
        if (alloyedMetal.getRemainingWeight().compareTo(weight) < 0) {
            throw new InvalidDataException(ErrorCode.ALLOYED_METAL_NOT_ENOUGH, String.format("Not enough weight in alloyed metal with id %d. " +
                    "Expected weight %s, actual weight %s.", alloyedMetalId, weight, alloyedMetal.getRemainingWeight()));
        }
        Sort sort = Sort.by(Sort.Direction.ASC, AlloyedMetalPurchase_.BALANCE_DATE, AlloyedMetalPurchase_.ID);
        Pageable pageable = PageRequest.of(0, 10, sort);
        BigDecimal reduceWeight = weight;
        BigDecimal weightCost = BigDecimal.ZERO;
        while (reduceWeight.compareTo(BigDecimal.ZERO) > 0) {
            Page<AlloyedMetalPurchase> purchases = alloyedMetalPurchaseRepository.findAllRemainingByAlloyedMetalId(alloyedMetalId, pageable);
            for (AlloyedMetalPurchase purchase : purchases.getContent()) {
                if (reduceWeight.compareTo(purchase.getRemainingWeight()) >= 0) {
                    reduceWeight = reduceWeight.subtract(purchase.getRemainingWeight());
                    weightCost = weightCost.add(purchase.getRemainingPrice());
                    purchase.setRemainingWeight(BigDecimal.ZERO);
                } else {
                    purchase.setRemainingWeight(purchase.getRemainingWeight().subtract(reduceWeight));
                    weightCost = weightCost.add(reduceWeight.multiply(purchase.getPriceGram()));
                    reduceWeight = BigDecimal.ZERO;
                }
                alloyedMetalPurchaseRepository.save(purchase);
                if (reduceWeight.compareTo(BigDecimal.ZERO) == 0) {
                    return weightCost;
                }
            }
            if (purchases.hasNext()) {
                pageable = pageable.next();
            } else {
                throw new InvalidDataException(ErrorCode.ALLOYED_METAL_NOT_ENOUGH, String.format("Not enough weight in alloyed metal with id %d. " +
                        "Expected weight %s", alloyedMetalId, weight));
            }
        }
        return weightCost;
    }

    @Override
    public SearchDto<AlloyedMetalPurchaseDto> searchAlloyedMetalPurchases(SearchRequestDto<AlloyedMetalPurchaseSearchCriteriaDto> searchQueryDto) {
        Pageable pageable = alloyedMetalPurchasePaginationResolver.createPageable(
                searchQueryDto.getPage(),
                searchQueryDto.getSize(),
                searchQueryDto.getSorts()
        );
        Specification<AlloyedMetalPurchase> specification = AlloyedMetalPurchaseSpecification.create(searchQueryDto.getSearchCriteria());
        Page<AlloyedMetalPurchase> result = alloyedMetalPurchaseRepository.findAll(specification, pageable);
        return AlloyedMetalPurchaseMapper.toAlloyedMetalPurchaseDtoPage(result);
    }

    @Override
    public AlloyedMetalPurchaseDto getAlloyedMetalPurchaseDto(Long alloyedMetalPurchaseId) {
        AlloyedMetalPurchase alloyedMetalPurchase = getFullAlloyedMetalPurchase(alloyedMetalPurchaseId);
        return AlloyedMetalPurchaseMapper.toAlloyedMetalPurchaseDto(alloyedMetalPurchase);
    }

    @Override
    public AlloyedMetalPurchase getAlloyedMetalPurchase(Long alloyedMetalPurchaseId) {
        return retrieveAlloyPurchase(alloyedMetalPurchaseId, alloyedMetalPurchaseRepository.findById(alloyedMetalPurchaseId));
    }

    @Override
    public AlloyedMetalPurchase getFullAlloyedMetalPurchase(Long alloyedMetalPurchaseId) {
        return retrieveAlloyPurchase(alloyedMetalPurchaseId, alloyedMetalPurchaseRepository.findAlloyedMetalPurchaseById(alloyedMetalPurchaseId));
    }

    private AlloyedMetalPurchase retrieveAlloyPurchase(Long alloyedMetalPurchaseId, Optional<AlloyedMetalPurchase> alloyedMetalPurchaseOpt) {
        return alloyedMetalPurchaseOpt.orElseThrow(
                () -> new NotFoundException("Alloyed metal purchase with id %d was not found.".formatted(alloyedMetalPurchaseId))
        );
    }
}
