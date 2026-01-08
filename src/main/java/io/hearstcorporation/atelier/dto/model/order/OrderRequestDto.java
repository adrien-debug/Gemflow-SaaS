package io.hearstcorporation.atelier.dto.model.order;

import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.dto.validation.ImageList;
import io.hearstcorporation.atelier.dto.validation.OrderDimensions;
import io.hearstcorporation.atelier.model.Priority;
import io.hearstcorporation.atelier.model.SettingType;
import io.hearstcorporation.atelier.model.SizeSystem;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Getter
@Setter
@OrderDimensions
@SuppressWarnings("OptionalUsedAsFieldOrParameterType")
public class OrderRequestDto {

    @NotNull
    private Optional<@NotNull @Size(max = 128) String> name;

    @NotNull
    private Optional<@NotNull Priority> priority;

    private Optional<LocalDate> dueDate;

    private Optional<LocalDate> acceptanceDate;

    private Optional<Integer> length;

    private Optional<SizeSystem> sizeSystem;

    private Optional<Integer> fingerSize;

    private Optional<@Size(max = 1000) String> description;

    @NotNull
    private Optional<@NotNull Long> clientId;

    @NotNull
    private Optional<@NotNull Long> itemCategoryId;

    private Optional<Long> collectionId;

    @NotNull
    private Optional<@NotNull Long> segmentId;

    private Optional<Boolean> stoneInPacket;

    private Optional<SettingType> settingType;

    private Optional<List<@NotNull Long>> gemstoneIds;

    private Optional<@ImageList List<@Valid @NotNull ImageRequestDto>> productImages;

    @Valid
    private Optional<BatchUpdateDto<OrderMaterialUpdateInBatchDto, Long>> materials;
}
