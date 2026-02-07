package io.hearstcorporation.atelier.service.inventory.puremetal.impl;

import io.hearstcorporation.atelier.dto.mapper.inventory.puremetal.PureMetalPurchaseMapper;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.error.ErrorCode;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.dto.model.inventory.puremetal.PureMetalPurchaseDto;
import io.hearstcorporation.atelier.dto.model.inventory.puremetal.PureMetalPurchaseRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.puremetal.PureMetalPurchaseSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.inventory.puremetal.PureMetalPurchaseUpdateDto;
import io.hearstcorporation.atelier.dto.model.inventory.puremetal.PureMetalSummaryDto;
import io.hearstcorporation.atelier.exception.InvalidDataException;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.administration.Supplier;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.inventory.puremetal.PureMetalPurchase;
import io.hearstcorporation.atelier.model.inventory.puremetal.PureMetalPurchase_;
import io.hearstcorporation.atelier.model.setting.PriceMetalName;
import io.hearstcorporation.atelier.pagination.PaginationResolver;
import io.hearstcorporation.atelier.repository.inventory.puremetal.PureMetalPurchaseRepository;
import io.hearstcorporation.atelier.service.administration.SupplierService;
import io.hearstcorporation.atelier.service.file.AtelierFileCompositeService;
import io.hearstcorporation.atelier.service.file.AtelierFileService;
import io.hearstcorporation.atelier.service.inventory.puremetal.PureMetalPurchaseService;
import io.hearstcorporation.atelier.service.inventory.puremetal.PureMetalSummaryService;
import io.hearstcorporation.atelier.service.setting.PriceMetalNameService;
import io.hearstcorporation.atelier.specification.inventory.puremetal.PureMetalPurchaseSpecification;
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
public class PureMetalPurchaseServiceImpl implements PureMetalPurchaseService {

    private final PureMetalPurchaseRepository pureMetalPurchaseRepository;
    private final PriceMetalNameService priceMetalNameService;
    private final PureMetalSummaryService pureMetalSummaryService;
    private final SupplierService supplierService;
    private final AtelierFileService atelierFileService;
    private final AtelierFileCompositeService atelierFileCompositeService;
    private final PaginationResolver pureMetalPurchasePaginationResolver;

    @Override
    @Transactional
    public PureMetalPurchaseDto createPureMetalPurchase(PureMetalPurchaseRequestDto requestDto) {
        PriceMetalName priceMetalName = priceMetalNameService.getPriceMetalName(requestDto.getPriceMetalNameId());
        Supplier supplier = supplierService.getSupplier(requestDto.getSupplierId());
        AtelierFile invoice = Optional.ofNullable(requestDto.getInvoiceId())
                .map(atelierFileService::getAtelierFile)
                .orElse(null);
        AtelierDownloadFileDto atelierDownloadFileDto = Optional.ofNullable(requestDto.getInvoiceId())
                .map(atelierFileCompositeService::getAtelierDownloadFileDto)
                .orElse(null);
        PureMetalPurchase pureMetalPurchase = PureMetalPurchaseMapper.toPureMetalPurchase(requestDto, priceMetalName, supplier, invoice);
        pureMetalPurchase = pureMetalPurchaseRepository.save(pureMetalPurchase);
        return PureMetalPurchaseMapper.toPureMetalPurchaseDto(pureMetalPurchase, atelierDownloadFileDto);
    }

    @Override
    @Transactional
    @Retryable(retryFor = OptimisticLockingFailureException.class)
    public void updatePureMetalPurchase(Long pureMetalPurchaseId, PureMetalPurchaseUpdateDto updateDto) {
        PureMetalPurchase pureMetalPurchase = getPureMetalPurchase(pureMetalPurchaseId);
        BigDecimal newRemainingWeight = WeightHelper.getRemainingWeight(updateDto.getBatchWeight(), pureMetalPurchase.getBatchWeight(), pureMetalPurchase.getRemainingWeight(), pureMetalPurchaseId);
        Supplier supplier = supplierService.getSupplier(updateDto.getSupplierId());
        AtelierFile invoice = Optional.ofNullable(updateDto.getInvoiceId())
                .map(atelierFileService::getAtelierFile)
                .orElse(null);
        PureMetalPurchaseMapper.mapPureMetalPurchase(pureMetalPurchase, updateDto, newRemainingWeight, supplier, invoice);
        pureMetalPurchaseRepository.save(pureMetalPurchase);
    }

    @Override
    @Transactional
    public void deletePureMetalPurchase(Long pureMetalPurchaseId) {
        PureMetalPurchase pureMetalPurchase = getPureMetalPurchase(pureMetalPurchaseId);
        ExceptionWrapper.onDelete(() -> pureMetalPurchaseRepository.deleteById(pureMetalPurchase.getId()),
                "Pure metal purchase with id %d cannot be deleted.".formatted(pureMetalPurchaseId));
    }

    /**
     * Reduce weight from the oldest purchases.
     * Purchases are used one by one until provided weight will not be reduced from inventory.
     *
     * @param priceMetalNameId Price metal id
     * @param weight           Weight to reduce
     * @return Cost of the reduced weight
     */
    @Override
    @Transactional
    @Retryable(retryFor = OptimisticLockingFailureException.class)
    public BigDecimal reduceWeightByPriceMetalNameId(@NonNull Long priceMetalNameId, @NonNull BigDecimal weight) {
        if (weight.compareTo(BigDecimal.ZERO) < 0) {
            throw new InvalidDataException("Reduce weight must be greater than zero.");
        }
        if (weight.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO;
        }
        PureMetalSummaryDto pureMetalSummary = pureMetalSummaryService.getPureMetalSummary(priceMetalNameId);
        if (pureMetalSummary.getRemainingWeight().compareTo(weight) < 0) {
            throw new InvalidDataException(ErrorCode.PURE_METAL_NOT_ENOUGH, String.format("Not enough weight in pure metal with id %d. " +
                    "Expected weight %s, actual weight %s.", priceMetalNameId, weight, pureMetalSummary.getRemainingWeight()));
        }
        Sort sort = Sort.by(Sort.Direction.ASC, PureMetalPurchase_.BALANCE_DATE, PureMetalPurchase_.ID);
        Pageable pageable = PageRequest.of(0, 10, sort);
        BigDecimal reduceWeight = weight;
        BigDecimal weightCost = BigDecimal.ZERO;
        while (reduceWeight.compareTo(BigDecimal.ZERO) > 0) {
            Page<PureMetalPurchase> purchases = pureMetalPurchaseRepository.findAllRemainingByPriceMetalNameId(priceMetalNameId, pageable);
            for (PureMetalPurchase purchase : purchases.getContent()) {
                if (reduceWeight.compareTo(purchase.getRemainingWeight()) >= 0) {
                    reduceWeight = reduceWeight.subtract(purchase.getRemainingWeight());
                    weightCost = weightCost.add(purchase.getRemainingPrice());
                    purchase.setRemainingWeight(BigDecimal.ZERO);
                } else {
                    purchase.setRemainingWeight(purchase.getRemainingWeight().subtract(reduceWeight));
                    weightCost = weightCost.add(reduceWeight.multiply(purchase.getPriceGram()));
                    reduceWeight = BigDecimal.ZERO;
                }
                pureMetalPurchaseRepository.save(purchase);
                if (reduceWeight.compareTo(BigDecimal.ZERO) == 0) {
                    return weightCost;
                }
            }
            if (purchases.hasNext()) {
                pageable = pageable.next();
            } else {
                throw new InvalidDataException(ErrorCode.PURE_METAL_NOT_ENOUGH,
                        String.format("Not enough weight in pure metal with id %d. Expected weight %s", priceMetalNameId, weight));
            }
        }
        return weightCost;
    }

    @Override
    @Transactional(readOnly = true)
    public SearchDto<PureMetalPurchaseDto> searchPureMetalPurchases(SearchRequestDto<PureMetalPurchaseSearchCriteriaDto> searchQueryDto) {
        Pageable pageable = pureMetalPurchasePaginationResolver.createPageable(
                searchQueryDto.getPage(),
                searchQueryDto.getSize(),
                searchQueryDto.getSorts()
        );
        Specification<PureMetalPurchase> specification = PureMetalPurchaseSpecification.create(searchQueryDto.getSearchCriteria());
        Page<PureMetalPurchase> result = pureMetalPurchaseRepository.findAll(specification, pageable);
        List<Long> invoiceIds = result.getContent().stream()
                .map(PureMetalPurchase::getInvoice)
                .filter(Objects::nonNull)
                .map(AtelierFile::getId)
                .toList();
        Map<Long, AtelierDownloadFileDto> invoiceMap = atelierFileCompositeService.getAtelierDownloadFileDtoListMappedById(invoiceIds);
        return PureMetalPurchaseMapper.toPureMetalPurchaseDtoPage(result, invoiceMap);
    }

    @Override
    @Transactional(readOnly = true)
    public PureMetalPurchaseDto getPureMetalPurchaseDto(Long pureMetalPurchaseId) {
        PureMetalPurchase pureMetalPurchase = getFullPureMetalPurchase(pureMetalPurchaseId);
        AtelierDownloadFileDto invoiceDto = Optional.ofNullable(pureMetalPurchase.getInvoice())
                .map(AtelierFile::getId)
                .map(atelierFileCompositeService::getAtelierDownloadFileDto)
                .orElse(null);
        return PureMetalPurchaseMapper.toPureMetalPurchaseDto(pureMetalPurchase, invoiceDto);
    }

    @Override
    public PureMetalPurchase getPureMetalPurchase(Long pureMetalPurchaseId) {
        return retrievePureMetalPurchase(pureMetalPurchaseId, pureMetalPurchaseRepository.findById(pureMetalPurchaseId));
    }

    @Override
    public PureMetalPurchase getFullPureMetalPurchase(Long pureMetalPurchaseId) {
        return retrievePureMetalPurchase(pureMetalPurchaseId, pureMetalPurchaseRepository.findPureMetalPurchaseById(pureMetalPurchaseId));
    }

    private PureMetalPurchase retrievePureMetalPurchase(Long pureMetalPurchaseId, Optional<PureMetalPurchase> pureMetalPurchaseOpt) {
        return pureMetalPurchaseOpt.orElseThrow(
                () -> new NotFoundException("Pure metal purchase with id %d was not found.".formatted(pureMetalPurchaseId))
        );
    }
}
