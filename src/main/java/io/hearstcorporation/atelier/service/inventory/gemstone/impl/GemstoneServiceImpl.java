package io.hearstcorporation.atelier.service.inventory.gemstone.impl;

import io.hearstcorporation.atelier.dto.mapper.inventory.InventoryMapper;
import io.hearstcorporation.atelier.dto.mapper.inventory.gemstone.GemstoneMapper;
import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.error.ErrorCode;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.dto.model.inventory.InventoryTotalDto;
import io.hearstcorporation.atelier.dto.model.inventory.gemstone.GemstoneDto;
import io.hearstcorporation.atelier.dto.model.inventory.gemstone.GemstonePaymentStatusDto;
import io.hearstcorporation.atelier.dto.model.inventory.gemstone.GemstoneRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.gemstone.GemstoneSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.inventory.gemstone.GemstoneStatusDto;
import io.hearstcorporation.atelier.exception.IllegalStateException;
import io.hearstcorporation.atelier.exception.InvalidDataException;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.administration.Supplier;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.inventory.InventoryTotal;
import io.hearstcorporation.atelier.model.inventory.gemstone.Gemstone;
import io.hearstcorporation.atelier.model.inventory.gemstone.GemstoneStatus;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.setting.GemsPayment;
import io.hearstcorporation.atelier.model.setting.Location;
import io.hearstcorporation.atelier.pagination.PaginationResolver;
import io.hearstcorporation.atelier.repository.inventory.gemstone.GemstoneRepository;
import io.hearstcorporation.atelier.service.administration.SupplierService;
import io.hearstcorporation.atelier.service.file.AtelierFileCompositeService;
import io.hearstcorporation.atelier.service.file.AtelierFileService;
import io.hearstcorporation.atelier.service.inventory.gemstone.GemstoneImageService;
import io.hearstcorporation.atelier.service.inventory.gemstone.GemstoneService;
import io.hearstcorporation.atelier.service.setting.GemsPaymentService;
import io.hearstcorporation.atelier.service.setting.LocationService;
import io.hearstcorporation.atelier.specification.inventory.gemstone.GemstoneSpecification;
import io.hearstcorporation.atelier.util.ExceptionWrapper;
import io.hearstcorporation.atelier.util.ServiceHelper;
import lombok.RequiredArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GemstoneServiceImpl implements GemstoneService {

    private final GemstoneRepository gemstoneRepository;
    private final PaginationResolver gemstonePaginationResolver;
    private final GemsPaymentService gemsPaymentService;
    private final SupplierService supplierService;
    private final LocationService locationService;
    private final GemstoneImageService gemstoneImageService;
    private final AtelierFileService atelierFileService;
    private final AtelierFileCompositeService atelierFileCompositeService;

    @Override
    @Transactional
    public Long createGemstone(GemstoneRequestDto requestDto) {
        Supplier supplier = supplierService.getSupplier(requestDto.getSupplierId());
        Location location = locationService.getLocation(requestDto.getLocationId());
        AtelierFile invoice = Optional.ofNullable(requestDto.getInvoiceId())
                .map(atelierFileService::getAtelierFile)
                .orElse(null);
        Gemstone gemstone = GemstoneMapper.toGemstone(requestDto, supplier, location, invoice);
        Gemstone savedGemstone = gemstoneRepository.save(gemstone);
        gemstoneImageService.updateGemstoneImages(requestDto.getGemstoneImages(), savedGemstone);
        return savedGemstone.getId();
    }

    @Override
    @Transactional
    public void updateGemstone(Long gemstoneId, GemstoneRequestDto requestDto) {
        Gemstone gemstone = getGemstone(gemstoneId);
        Supplier supplier = supplierService.getSupplier(requestDto.getSupplierId());
        Location location = locationService.getLocation(requestDto.getLocationId());
        AtelierFile invoice = Optional.ofNullable(requestDto.getInvoiceId())
                .map(atelierFileService::getAtelierFile)
                .orElse(null);
        GemstoneMapper.mapGemstone(gemstone, requestDto, supplier, location, invoice);
        Gemstone savedGemstone = gemstoneRepository.save(gemstone);
        gemstoneImageService.updateGemstoneImages(requestDto.getGemstoneImages(), savedGemstone);
    }

    @Override
    @Transactional
    public void deleteGemstone(Long gemstoneId) {
        Gemstone gemstone = getGemstone(gemstoneId);
        ExceptionWrapper.onDelete(() -> gemstoneRepository.deleteById(gemstone.getId()),
                "Gemstone %d cannot be deleted.".formatted(gemstone.getId()));
    }

    @Override
    @Transactional
    public void changeGemstoneStatus(Long gemstoneId, GemstoneStatusDto gemstoneStatusDto) {
        Gemstone gemstone = getGemstone(gemstoneId);
        GemstoneStatus gemstoneStatus = gemstone.getStatus();
        GemstoneStatus newGemstoneStatus = gemstoneStatusDto.getStatus();
        if (gemstoneStatus == newGemstoneStatus) {
            return;
        }
        validateGemstoneStatuses(gemstone);
        gemstone.setStatus(newGemstoneStatus);
        gemstoneRepository.save(gemstone);
    }

    private void validateGemstoneStatuses(Gemstone gemstone) {
        if (gemstone.getOrder() != null) {
            throw new IllegalStateException(ErrorCode.CHANGE_ASSIGNED_GEMSTONE_STATUS_ERROR,
                    "Cannot change status for gemstone with id %d because it is assigned to order."
                            .formatted(gemstone.getId()));
        }
    }

    @Override
    @Transactional
    public void changeGemstonePaymentStatus(Long gemstoneId, GemstonePaymentStatusDto gemstonePaymentStatusDto) {
        Gemstone gemstone = getGemstone(gemstoneId);
        GemsPayment gemsPayment = Optional.ofNullable(gemstonePaymentStatusDto.getPaymentStatusId())
                .map(gemsPaymentService::getGemsPayment)
                .orElse(null);
        gemstone.setPaymentStatus(gemsPayment);
        gemstoneRepository.save(gemstone);
    }

    @Override
    @Transactional
    public void updateOrderGemstones(Order order, List<Long> requestGemstoneIds) {
        List<Gemstone> orderGemstones = order.getGemstones();
        List<Gemstone> requestedGemstones = getGemstones(requestGemstoneIds);

        Map<Long, Gemstone> orderGemstoneMap = CollectionUtils.emptyIfNull(orderGemstones).stream().collect(Collectors.toMap(Gemstone::getId, Function.identity()));
        Map<Long, Gemstone> requestedGemstoneMap = CollectionUtils.emptyIfNull(requestedGemstones).stream().collect(Collectors.toMap(Gemstone::getId, Function.identity()));

        Set<Long> orderGemstoneIds = orderGemstoneMap.keySet();
        Set<Long> requestedGemstoneIds = requestedGemstoneMap.keySet();

        Set<Long> deletedOrderGemstoneIds = orderGemstoneIds.stream()
                .filter(oid -> !requestedGemstoneIds.contains(oid))
                .collect(Collectors.toSet());

        Set<Long> newOrderGemstoneIds = requestedGemstoneIds.stream()
                .filter(oid -> !orderGemstoneIds.contains(oid))
                .collect(Collectors.toSet());

        deletedOrderGemstoneIds.forEach(id -> {
            Gemstone gemstone = orderGemstoneMap.get(id);
            unassignGemstoneFromOrder(gemstone);
        });

        newOrderGemstoneIds.forEach(id -> {
            Gemstone gemstone = requestedGemstoneMap.get(id);
            assignGemstoneToOrder(order, gemstone);
        });
    }

    @Override
    @Transactional
    public void resetOrderGemstones(Long orderId) {
        List<Gemstone> orderGemstones = gemstoneRepository.findAllByOrderId(orderId);
        orderGemstones.forEach(this::unassignGemstoneFromOrder);
    }

    @Override
    @Transactional
    public void assignGemstone(Order order, Long gemstoneId) {
        Gemstone gemstone = getGemstone(gemstoneId);
        assignGemstoneToOrder(order, gemstone);
    }

    private void assignGemstoneToOrder(Order order, Gemstone gemstone) {
        if (gemstone.getOrder() != null || gemstone.getStatus() != GemstoneStatus.AVAILABLE) {
            String message = ("Gemstone with id %d is already assigned to order or has not " +
                    "AVAILABLE status %s").formatted(gemstone.getId(), gemstone.getStatus());
            throw new InvalidDataException(message);
        }
        gemstone.setOrder(order);
        gemstone.setStatus(GemstoneStatus.ASSIGNED);
        gemstoneRepository.save(gemstone);
    }

    @Override
    @Transactional
    public void unassignGemstone(Long orderId, Long gemstoneId) {
        Gemstone gemstone = gemstoneRepository.findByIdAndOrderId(gemstoneId, orderId)
                .orElseThrow(() -> new NotFoundException(String.format("Gemstone with id %d was not found " +
                        "for Order with id %d.", gemstoneId, orderId)));
        unassignGemstoneFromOrder(gemstone);
    }

    private void unassignGemstoneFromOrder(Gemstone gemstone) {
        if (gemstone.getStatus() == GemstoneStatus.SOLD || gemstone.getStatus() == GemstoneStatus.RETURNED) {
            throw new InvalidDataException("Gemstone with id %d is already sold or returned".formatted(gemstone.getId()));
        }
        gemstone.setOrder(null);
        gemstone.setStatus(GemstoneStatus.AVAILABLE);
        gemstoneRepository.saveAndFlush(gemstone);
    }

    @Override
    @Transactional(readOnly = true)
    public SearchDto<GemstoneDto> searchGemstones(SearchRequestDto<GemstoneSearchCriteriaDto> gemstoneSearchQueryDto) {
        Pageable pageable = gemstonePaginationResolver.createPageable(
                gemstoneSearchQueryDto.getPage(),
                gemstoneSearchQueryDto.getSize(),
                gemstoneSearchQueryDto.getSorts()
        );
        Specification<Gemstone> specification = GemstoneSpecification.create(gemstoneSearchQueryDto.getSearchCriteria());
        Page<Gemstone> result = gemstoneRepository.findAll(specification, pageable);
        List<Long> gemstoneIds = result.getContent().stream().map(Gemstone::getId).toList();
        Map<Long, List<ImageDto>> gemstoneImages = gemstoneImageService.getImageDtoListGroupedByGemstoneId(gemstoneIds);
        List<Long> invoiceIds = result.getContent().stream()
                .map(Gemstone::getInvoice)
                .filter(Objects::nonNull)
                .map(AtelierFile::getId)
                .toList();
        Map<Long, AtelierDownloadFileDto> invoiceMap = atelierFileCompositeService.getAtelierDownloadFileDtoListMappedById(invoiceIds);
        return GemstoneMapper.toGemstoneListDtoPage(result, gemstoneImages, invoiceMap);
    }

    @Override
    public InventoryTotalDto getGemstoneTotalDto(GemstoneSearchCriteriaDto searchQueryDto) {
        InventoryTotal total = gemstoneRepository.calculateTotal(GemstoneSpecification.create(searchQueryDto));
        return InventoryMapper.toInventoryTotalDto(total);
    }

    @Override
    @Transactional(readOnly = true)
    public GemstoneDto getGemstoneDto(Long gemstoneId) {
        Gemstone gemstone = getFullGemstone(gemstoneId);
        List<ImageDto> gemstoneImages = gemstoneImageService.getImageDtoList(gemstoneId);
        AtelierDownloadFileDto invoiceDto = Optional.ofNullable(gemstone.getInvoice())
                .map(AtelierFile::getId)
                .map(atelierFileCompositeService::getAtelierDownloadFileDto)
                .orElse(null);
        return GemstoneMapper.toGemstoneDto(gemstone, gemstoneImages, invoiceDto);
    }

    @Override
    public Gemstone getGemstone(Long gemstoneId) {
        return retrieveGemstone(gemstoneId, gemstoneRepository.findById(gemstoneId));
    }

    @Override
    public Gemstone getFullGemstone(Long gemstoneId) {
        return retrieveGemstone(gemstoneId, gemstoneRepository.findGemstoneById(gemstoneId));
    }

    private Gemstone retrieveGemstone(Long gemstoneId, Optional<Gemstone> gemstoneOpt) {
        return gemstoneOpt.orElseThrow(
                () -> new NotFoundException("Gemstone with id %d was not found.".formatted(gemstoneId))
        );
    }

    @Override
    public List<Gemstone> getGemstones(List<Long> ids) {
        if (CollectionUtils.isEmpty(ids)) {
            return new ArrayList<>();
        }
        List<Gemstone> gemstones = gemstoneRepository.findAllByIdInOrderByIdAsc(ids);
        ServiceHelper.compareIdsOrThrow(gemstones, ids, Gemstone.class);
        return gemstones;
    }
}
