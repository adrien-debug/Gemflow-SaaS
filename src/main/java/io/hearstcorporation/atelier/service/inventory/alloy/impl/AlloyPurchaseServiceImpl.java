package io.hearstcorporation.atelier.service.inventory.alloy.impl;

import io.hearstcorporation.atelier.dto.mapper.inventory.alloy.AlloyPurchaseMapper;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.error.ErrorCode;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloyPurchaseDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloyPurchaseRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloyPurchaseSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.inventory.alloy.AlloyPurchaseUpdateDto;
import io.hearstcorporation.atelier.exception.InvalidDataException;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.administration.Supplier;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.inventory.alloy.Alloy;
import io.hearstcorporation.atelier.model.inventory.alloy.AlloyPurchase;
import io.hearstcorporation.atelier.model.inventory.alloy.AlloyPurchase_;
import io.hearstcorporation.atelier.pagination.PaginationResolver;
import io.hearstcorporation.atelier.repository.inventory.alloy.AlloyPurchaseRepository;
import io.hearstcorporation.atelier.service.administration.SupplierService;
import io.hearstcorporation.atelier.service.file.AtelierFileCompositeService;
import io.hearstcorporation.atelier.service.file.AtelierFileService;
import io.hearstcorporation.atelier.service.inventory.alloy.AlloyPurchaseService;
import io.hearstcorporation.atelier.service.inventory.alloy.AlloyService;
import io.hearstcorporation.atelier.specification.inventory.alloy.AlloyPurchaseSpecification;
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
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AlloyPurchaseServiceImpl implements AlloyPurchaseService {

    private final AlloyPurchaseRepository alloyPurchaseRepository;
    private final AlloyService alloyService;
    private final SupplierService supplierService;
    private final AtelierFileService atelierFileService;
    private final AtelierFileCompositeService atelierFileCompositeService;
    private final PaginationResolver alloyPurchasePaginationResolver;

    @Override
    @Transactional
    public AlloyPurchaseDto createAlloyPurchase(AlloyPurchaseRequestDto requestDto) {
        Alloy alloy = alloyService.getAlloy(requestDto.getAlloyId());
        Supplier supplier = supplierService.getSupplier(requestDto.getSupplierId());
        AtelierFile invoice = Optional.ofNullable(requestDto.getInvoiceId())
                .map(atelierFileService::getAtelierFile)
                .orElse(null);
        AtelierDownloadFileDto atelierDownloadFileDto = Optional.ofNullable(requestDto.getInvoiceId())
                .map(atelierFileCompositeService::getAtelierDownloadFileDto)
                .orElse(null);
        AlloyPurchase alloyPurchase = AlloyPurchaseMapper.toAlloyPurchase(requestDto, alloy, supplier, invoice);
        alloyPurchase = alloyPurchaseRepository.save(alloyPurchase);
        return AlloyPurchaseMapper.toAlloyPurchaseDto(alloyPurchase, atelierDownloadFileDto);
    }

    @Override
    @Transactional
    @Retryable(retryFor = OptimisticLockingFailureException.class)
    public void updateAlloyPurchase(Long alloyPurchaseId, AlloyPurchaseUpdateDto updateDto) {
        AlloyPurchase alloyPurchase = getAlloyPurchase(alloyPurchaseId);
        BigDecimal newRemainingWeight = WeightHelper.getRemainingWeight(updateDto.getBatchWeight(), alloyPurchase.getBatchWeight(), alloyPurchase.getRemainingWeight(), alloyPurchaseId);
        Supplier supplier = supplierService.getSupplier(updateDto.getSupplierId());
        AtelierFile invoice = Optional.ofNullable(updateDto.getInvoiceId())
                .map(atelierFileService::getAtelierFile)
                .orElse(null);
        AlloyPurchaseMapper.mapAlloyPurchase(alloyPurchase, updateDto, newRemainingWeight, supplier, invoice);
        alloyPurchaseRepository.save(alloyPurchase);
    }

    @Override
    @Transactional
    public void deleteAlloyPurchase(Long alloyPurchaseId) {
        AlloyPurchase alloyPurchase = getAlloyPurchase(alloyPurchaseId);
        ExceptionWrapper.onDelete(() -> alloyPurchaseRepository.deleteById(alloyPurchase.getId()),
                "Alloy purchase with id %d cannot be deleted.".formatted(alloyPurchaseId));
    }

    /**
     * Reduce weight from the oldest purchases.
     * Purchases are used one by one until provided weight will not be reduced from inventory.
     *
     * @param alloyId Alloy id
     * @param weight  Weight to reduce
     * @return Cost of the reduced weight
     */
    @Override
    @Transactional
    @Retryable(retryFor = OptimisticLockingFailureException.class)
    public BigDecimal reduceWeightByAlloyId(@NonNull Long alloyId, @NonNull BigDecimal weight) {
        if (weight.compareTo(BigDecimal.ZERO) < 0) {
            throw new InvalidDataException("Reduce weight must be greater than zero.");
        }
        if (weight.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO;
        }
        Alloy alloy = alloyService.getAlloy(alloyId);
        if (alloy.getRemainingWeight().compareTo(weight) < 0) {
            throw new InvalidDataException(ErrorCode.ALLOY_NOT_ENOUGH, String.format("Not enough weight in alloy with id %d. " +
                    "Expected weight %s, actual weight %s.", alloyId, weight, alloy.getRemainingWeight()));
        }
        Sort sort = Sort.by(Sort.Direction.ASC, AlloyPurchase_.BALANCE_DATE, AlloyPurchase_.ID);
        Pageable pageable = PageRequest.of(0, 10, sort);
        BigDecimal reduceWeight = weight;
        BigDecimal weightCost = BigDecimal.ZERO;
        while (reduceWeight.compareTo(BigDecimal.ZERO) > 0) {
            Page<AlloyPurchase> purchases = alloyPurchaseRepository.findAllRemainingByAlloyId(alloyId, pageable);
            for (AlloyPurchase purchase : purchases.getContent()) {
                if (reduceWeight.compareTo(purchase.getRemainingWeight()) >= 0) {
                    reduceWeight = reduceWeight.subtract(purchase.getRemainingWeight());
                    weightCost = weightCost.add(purchase.getRemainingPrice());
                    purchase.setRemainingWeight(BigDecimal.ZERO);
                } else {
                    purchase.setRemainingWeight(purchase.getRemainingWeight().subtract(reduceWeight));
                    weightCost = weightCost.add(reduceWeight.multiply(purchase.getPriceGram()));
                    reduceWeight = BigDecimal.ZERO;
                }
                alloyPurchaseRepository.save(purchase);
                if (reduceWeight.compareTo(BigDecimal.ZERO) == 0) {
                    return weightCost;
                }
            }
            if (purchases.hasNext()) {
                pageable = pageable.next();
            } else {
                throw new InvalidDataException(ErrorCode.ALLOY_NOT_ENOUGH, String.format("Not enough weight in alloy with id %d. " +
                        "Expected weight %s", alloyId, weight));
            }
        }
        return weightCost;
    }

    @Override
    @Transactional(readOnly = true)
    public SearchDto<AlloyPurchaseDto> searchAlloyPurchases(SearchRequestDto<AlloyPurchaseSearchCriteriaDto> searchQueryDto) {
        Pageable pageable = alloyPurchasePaginationResolver.createPageable(
                searchQueryDto.getPage(),
                searchQueryDto.getSize(),
                searchQueryDto.getSorts()
        );
        Specification<AlloyPurchase> specification = AlloyPurchaseSpecification.create(searchQueryDto.getSearchCriteria());
        Page<AlloyPurchase> result = alloyPurchaseRepository.findAll(specification, pageable);
        List<Long> invoiceIds = result.getContent().stream()
                .map(AlloyPurchase::getInvoice)
                .filter(Objects::nonNull)
                .map(AtelierFile::getId)
                .toList();
        Map<Long, AtelierDownloadFileDto> invoiceMap = atelierFileCompositeService.getAtelierDownloadFileDtoListMappedById(invoiceIds);
        return AlloyPurchaseMapper.toAlloyPurchaseDtoPage(result, invoiceMap);
    }

    @Override
    @Transactional(readOnly = true)
    public AlloyPurchaseDto getAlloyPurchaseDto(Long alloyPurchaseId) {
        AlloyPurchase alloyPurchase = getFullAlloyPurchase(alloyPurchaseId);
        AtelierDownloadFileDto invoiceDto = Optional.ofNullable(alloyPurchase.getInvoice())
                .map(AtelierFile::getId)
                .map(atelierFileCompositeService::getAtelierDownloadFileDto)
                .orElse(null);
        return AlloyPurchaseMapper.toAlloyPurchaseDto(alloyPurchase, invoiceDto);
    }

    @Override
    public AlloyPurchase getAlloyPurchase(Long alloyPurchaseId) {
        return retrieveAlloyPurchase(alloyPurchaseId, alloyPurchaseRepository.findById(alloyPurchaseId));
    }

    @Override
    public AlloyPurchase getFullAlloyPurchase(Long alloyPurchaseId) {
        return retrieveAlloyPurchase(alloyPurchaseId, alloyPurchaseRepository.findAlloyPurchaseById(alloyPurchaseId));
    }

    private AlloyPurchase retrieveAlloyPurchase(Long alloyPurchaseId, Optional<AlloyPurchase> alloyPurchaseOpt) {
        return alloyPurchaseOpt.orElseThrow(
                () -> new NotFoundException("Alloy purchase with id %d was not found.".formatted(alloyPurchaseId))
        );
    }
}
