package io.hearstcorporation.atelier.service.inventory.other.impl;

import io.hearstcorporation.atelier.dto.mapper.inventory.other.OtherMaterialTransactionMapper;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialTransactionDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialTransactionRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialTransactionSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.inventory.other.OtherMaterialTransactionUpdateDto;
import io.hearstcorporation.atelier.exception.InvalidDataException;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.inventory.other.OtherMaterial;
import io.hearstcorporation.atelier.model.inventory.other.OtherMaterialTransaction;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.pagination.PaginationResolver;
import io.hearstcorporation.atelier.repository.inventory.other.OtherMaterialTransactionRepository;
import io.hearstcorporation.atelier.service.inventory.other.OtherMaterialService;
import io.hearstcorporation.atelier.service.inventory.other.OtherMaterialTransactionService;
import io.hearstcorporation.atelier.service.order.OrderService;
import io.hearstcorporation.atelier.specification.inventory.other.OtherMaterialTransactionSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OtherMaterialTransactionServiceImpl implements OtherMaterialTransactionService {

    private final OtherMaterialTransactionRepository otherMaterialTransactionRepository;
    private final OrderService orderService;
    private final OtherMaterialService otherMaterialService;
    private final PaginationResolver otherMaterialTransactionPaginationResolver;

    @Override
    @Transactional
    public void updateOtherMaterialTransaction(Long otherMaterialTransactionId, OtherMaterialTransactionUpdateDto updateDto) {
        OtherMaterialTransaction otherMaterialTransaction = getOtherMaterialTransaction(otherMaterialTransactionId);
        otherMaterialTransaction.setDescription(updateDto.getDescription());
        otherMaterialTransactionRepository.save(otherMaterialTransaction);
    }

    @Override
    @Transactional
    @Retryable(retryFor = OptimisticLockingFailureException.class)
    public void addOtherMaterialTransactionWeight(OtherMaterialTransactionRequestDto requestDto) {
        Order order = Optional.ofNullable(requestDto.getOrderId()).map(orderService::getOrder).orElse(null);
        OtherMaterial otherMaterial = otherMaterialService.getOtherMaterial(requestDto.getOtherMaterialId());
        OtherMaterialTransaction otherMaterialTransaction = OtherMaterialTransactionMapper.toOtherMaterialTransaction(requestDto, order, otherMaterial);
        otherMaterialTransactionRepository.save(otherMaterialTransaction);
    }

    @Override
    @Transactional
    @Retryable(retryFor = OptimisticLockingFailureException.class)
    public void reduceOtherMaterialTransactionWeight(OtherMaterialTransactionRequestDto requestDto) {
        Order order = Optional.ofNullable(requestDto.getOrderId()).map(orderService::getOrder).orElse(null);
        OtherMaterial otherMaterial = otherMaterialService.getOtherMaterial(requestDto.getOtherMaterialId());
        BigDecimal remainingWeight = otherMaterial.getRemainingWeight().subtract(requestDto.getBatchWeight());
        if (remainingWeight.compareTo(BigDecimal.ZERO) >= 0) {
            requestDto.setBatchWeight(requestDto.getBatchWeight().negate());
            OtherMaterialTransaction otherMaterialTransaction = OtherMaterialTransactionMapper.toOtherMaterialTransaction(requestDto, order, otherMaterial);
            otherMaterialTransactionRepository.save(otherMaterialTransaction);
        } else {
            throw new InvalidDataException("Final batch weight cannot be less than 0");
        }
    }

    @Override
    @Transactional
    @Retryable(retryFor = OptimisticLockingFailureException.class)
    public void addOtherMaterialTransactionWeight(LocalDate balanceDate, Long otherMaterialId, BigDecimal batchWeight,
                                                  Long orderId, String description) {
        OtherMaterialTransactionRequestDto requestDto = new OtherMaterialTransactionRequestDto();
        requestDto.setBalanceDate(balanceDate);
        requestDto.setOtherMaterialId(otherMaterialId);
        requestDto.setBatchWeight(batchWeight);
        requestDto.setOrderId(orderId);
        requestDto.setDescription(description);
        addOtherMaterialTransactionWeight(requestDto);
    }

    @Override
    public SearchDto<OtherMaterialTransactionDto> searchOtherMaterialTransaction(SearchRequestDto<OtherMaterialTransactionSearchCriteriaDto> searchQueryDto) {
        Pageable pageable = otherMaterialTransactionPaginationResolver.createPageable(
                searchQueryDto.getPage(),
                searchQueryDto.getSize(),
                searchQueryDto.getSorts()
        );
        Specification<OtherMaterialTransaction> specification = OtherMaterialTransactionSpecification.create(searchQueryDto.getSearchCriteria());
        Page<OtherMaterialTransaction> result = otherMaterialTransactionRepository.findAll(specification, pageable);
        return OtherMaterialTransactionMapper.toOtherMaterialTransactionDtoPage(result);
    }

    @Override
    public OtherMaterialTransaction getOtherMaterialTransaction(Long otherMaterialTransactionId) {
        return retrieveOtherMaterialTransaction(otherMaterialTransactionId, otherMaterialTransactionRepository.findById(otherMaterialTransactionId));
    }

    private OtherMaterialTransaction retrieveOtherMaterialTransaction(Long otherMaterialTransactionId,
                                                                      Optional<OtherMaterialTransaction> otherMaterialTransactionOpt) {
        return otherMaterialTransactionOpt.orElseThrow(
                () -> new NotFoundException("Other material transaction with id %d was not found.".formatted(otherMaterialTransactionId))
        );
    }
}
