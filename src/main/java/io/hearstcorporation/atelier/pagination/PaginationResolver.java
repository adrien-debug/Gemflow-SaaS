package io.hearstcorporation.atelier.pagination;

import io.hearstcorporation.atelier.dto.model.PaginationRequestDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PaginationResolver {

    Pageable createPageable(Integer page, Integer size, List<PaginationRequestDto.Sort> sorting);
}
