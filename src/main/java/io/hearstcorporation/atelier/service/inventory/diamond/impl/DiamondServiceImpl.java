package io.hearstcorporation.atelier.service.inventory.diamond.impl;

import io.hearstcorporation.atelier.dto.mapper.inventory.InventoryMapper;
import io.hearstcorporation.atelier.dto.mapper.inventory.diamond.DiamondMapper;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.dto.model.inventory.InventoryTotalDto;
import io.hearstcorporation.atelier.dto.model.inventory.diamond.DiamondDto;
import io.hearstcorporation.atelier.dto.model.inventory.diamond.DiamondQuantityDto;
import io.hearstcorporation.atelier.dto.model.inventory.diamond.DiamondRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.diamond.DiamondSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.inventory.diamond.DiamondUpdateDto;
import io.hearstcorporation.atelier.exception.InvalidDataException;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.administration.Supplier;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.inventory.InventoryTotal;
import io.hearstcorporation.atelier.model.inventory.diamond.Diamond;
import io.hearstcorporation.atelier.model.setting.DiamondShape;
import io.hearstcorporation.atelier.pagination.PaginationResolver;
import io.hearstcorporation.atelier.repository.inventory.diamond.DiamondRepository;
import io.hearstcorporation.atelier.service.administration.SupplierService;
import io.hearstcorporation.atelier.service.file.AtelierFileCompositeService;
import io.hearstcorporation.atelier.service.file.AtelierFileService;
import io.hearstcorporation.atelier.service.inventory.diamond.DiamondService;
import io.hearstcorporation.atelier.service.setting.DiamondShapeService;
import io.hearstcorporation.atelier.specification.inventory.diamond.DiamondSpecification;
import io.hearstcorporation.atelier.util.ExceptionWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DiamondServiceImpl implements DiamondService {

    private final DiamondRepository diamondRepository;
    private final DiamondShapeService diamondShapeService;
    private final SupplierService supplierService;
    private final AtelierFileService atelierFileService;
    private final AtelierFileCompositeService atelierFileCompositeService;
    private final PaginationResolver diamondPaginationResolver;

    @Override
    @Transactional
    public DiamondDto createDiamond(DiamondRequestDto requestDto) {
        DiamondShape diamondShape = diamondShapeService.getDiamondShape(requestDto.getDiamondShapeId());
        Supplier supplier = supplierService.getSupplier(requestDto.getSupplierId());
        AtelierFile invoice = Optional.ofNullable(requestDto.getInvoiceId())
                .map(atelierFileService::getAtelierFile)
                .orElse(null);
        AtelierDownloadFileDto invoiceDto = Optional.ofNullable(requestDto.getInvoiceId())
                .map(atelierFileCompositeService::getAtelierDownloadFileDto)
                .orElse(null);
        Diamond diamond = DiamondMapper.toDiamond(requestDto, diamondShape, supplier, invoice);
        Diamond savedDiamond = diamondRepository.save(diamond);
        return DiamondMapper.toDiamondDto(savedDiamond, invoiceDto);
    }

    @Override
    @Transactional
    public void updateDiamond(Long diamondId, DiamondUpdateDto diamondUpdateDto) {
        Diamond diamond = getDiamond(diamondId);
        DiamondShape diamondShape = diamondShapeService.getDiamondShape(diamondUpdateDto.getDiamondShapeId());
        Supplier supplier = supplierService.getSupplier(diamondUpdateDto.getSupplierId());
        AtelierFile invoice = Optional.ofNullable(diamondUpdateDto.getInvoiceId())
                .map(atelierFileService::getAtelierFile)
                .orElse(null);
        DiamondMapper.mapUpdateDiamond(diamond, diamondUpdateDto, diamondShape, supplier, invoice);
        diamondRepository.save(diamond);
    }

    @Override
    @Transactional
    public void addDiamondQuantity(Long diamondId, DiamondQuantityDto diamondQuantityDto) {
        addDiamondQuantity(diamondId, diamondQuantityDto.getQuantity());
    }

    @Override
    @Transactional
    public void addDiamondQuantity(Long diamondId, Integer quantity) {
        Diamond diamond = getLockDiamond(diamondId);
        diamond.setQuantity(diamond.getQuantity() + quantity);
        diamondRepository.save(diamond);
    }

    @Override
    @Transactional
    public void reduceDiamondQuantity(Long diamondId, DiamondQuantityDto diamondQuantityDto) {
        reduceDiamondQuantity(diamondId, diamondQuantityDto.getQuantity());
    }

    @Override
    @Transactional
    public void reduceDiamondQuantity(Long diamondId, Integer quantity) {
        Diamond diamond = getLockDiamond(diamondId);
        int finalQuantity = diamond.getQuantity() - quantity;
        if (finalQuantity >= 0) {
            diamond.setQuantity(finalQuantity);
            diamondRepository.save(diamond);
        } else {
            throw new InvalidDataException("Final quantity cannot be less than 0");
        }
    }

    @Override
    @Transactional
    public void deleteDiamond(Long diamondId) {
        Diamond diamond = getDiamond(diamondId);
        ExceptionWrapper.onDelete(() -> diamondRepository.deleteById(diamond.getId()),
                "Diamond with id %d cannot be deleted.".formatted(diamondId));
    }

    @Override
    public SearchDto<DiamondDto> searchDiamonds(SearchRequestDto<DiamondSearchCriteriaDto> searchQueryDto) {
        Pageable pageable = diamondPaginationResolver.createPageable(
                searchQueryDto.getPage(),
                searchQueryDto.getSize(),
                searchQueryDto.getSorts()
        );
        Specification<Diamond> specification = DiamondSpecification.create(searchQueryDto.getSearchCriteria());
        Page<Diamond> result = diamondRepository.findAll(specification, pageable);
        List<Long> invoiceIds = result.getContent().stream()
                .map(Diamond::getInvoice)
                .filter(Objects::nonNull)
                .map(AtelierFile::getId)
                .toList();
        Map<Long, AtelierDownloadFileDto> invoiceMap = atelierFileCompositeService.getAtelierDownloadFileDtoListMappedById(invoiceIds);
        return DiamondMapper.toDiamondDtoPage(result, invoiceMap);
    }

    @Override
    public DiamondDto getDiamondDto(Long diamondId) {
        Diamond diamond = getFullDiamond(diamondId);
        AtelierDownloadFileDto invoiceDto = Optional.ofNullable(diamond.getInvoice())
                .map(AtelierFile::getId)
                .map(atelierFileCompositeService::getAtelierDownloadFileDto)
                .orElse(null);
        return DiamondMapper.toDiamondDto(diamond, invoiceDto);
    }

    @Override
    public InventoryTotalDto getDiamondTotalDto(DiamondSearchCriteriaDto searchCriteriaDto) {
        InventoryTotal total = diamondRepository.calculateTotal(DiamondSpecification.create(searchCriteriaDto));
        return InventoryMapper.toInventoryTotalDto(total);
    }

    @Override
    public Diamond getDiamond(Long diamondId) {
        return retrieveDiamond(diamondId, diamondRepository.findById(diamondId));
    }

    @Override
    public Diamond getFullDiamond(Long diamondId) {
        return retrieveDiamond(diamondId, diamondRepository.findDiamondById(diamondId));
    }

    @Override
    public Diamond getLockDiamond(Long diamondId) {
        return retrieveDiamond(diamondId, diamondRepository.findLockDiamondById(diamondId));
    }

    private Diamond retrieveDiamond(Long diamondId, Optional<Diamond> diamondOpt) {
        return diamondOpt.orElseThrow(
                () -> new NotFoundException("Diamond with id %d was not found.".formatted(diamondId))
        );
    }
}
