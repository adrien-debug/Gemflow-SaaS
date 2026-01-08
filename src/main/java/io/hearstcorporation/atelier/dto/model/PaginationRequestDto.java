package io.hearstcorporation.atelier.dto.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PaginationRequestDto {

    // Expected that first page = 1
    @Positive
    private Integer page;

    @Positive
    private Integer size;

    @Valid
    private List<Sort> sorts;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Sort {

        @NotNull
        private String property;

        @NotNull
        private SortDirection direction;
    }
}
