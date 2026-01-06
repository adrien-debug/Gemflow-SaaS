package io.hearstcorporation.atelier.dto.model.inventory.gemstone;

import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.ModelNameDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.dto.model.setting.GemsPaymentDto;
import io.hearstcorporation.atelier.dto.model.setting.LocationDto;
import io.hearstcorporation.atelier.dto.model.user.UserShortDto;
import io.hearstcorporation.atelier.model.inventory.gemstone.GemstoneOwnerType;
import io.hearstcorporation.atelier.model.inventory.gemstone.GemstoneStatus;
import io.hearstcorporation.atelier.model.inventory.gemstone.GemstoneType;
import io.hearstcorporation.atelier.model.inventory.gemstone.MethodType;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
public class GemstoneDto {

    private Long id;
    private GemstoneType type;
    private Instant createdAt;
    private String name;
    private String certificate;
    private String description;
    private Integer numberOfGems;
    private BigDecimal totalWeight;
    private String comment;
    private BigDecimal stonePrice;
    private BigDecimal pricePerCarat;
    private Boolean customsDutyPriceActive;
    private BigDecimal customsDutyPrice;
    private Boolean vatPriceActive;
    private BigDecimal vatPrice;
    private Boolean tenPercentsPriceActive;
    private BigDecimal tenPercentsPrice;
    private BigDecimal certificateCost;
    private BigDecimal shipment;
    private BigDecimal totalCost;
    private MethodType methodType;
    private GemstoneStatus status;
    private GemsPaymentDto paymentStatus;
    private ModelNameDto supplier;
    private LocationDto location;
    private List<ImageDto> gemstoneImages;
    private ModelNameDto order;
    private UserShortDto createdBy;
    private LocalDate invoiceDate;
    private GemstoneOwnerType ownerType;
    private AtelierDownloadFileDto invoice;
}
