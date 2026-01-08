package io.hearstcorporation.atelier.dto.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchRequestDto<T> extends PaginationRequestDto {

    //todo: make it a list, which will apply several search criterias with OR
    @Valid
    @NotNull
    private T searchCriteria;
}
