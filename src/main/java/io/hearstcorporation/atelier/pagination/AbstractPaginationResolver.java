package io.hearstcorporation.atelier.pagination;

import io.hearstcorporation.atelier.dto.model.PaginationRequestDto;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.lang.Nullable;

import java.util.List;
import java.util.stream.Collectors;

public abstract class AbstractPaginationResolver implements PaginationResolver {

    /**
     * Create valid Pageable object for Spring Data
     *
     * @param page    - number of page (first page = 1)
     * @param size    - size of the page
     * @param sorting - sorting
     * @return valid Pageable object for Spring Data
     */
    @Override
    public Pageable createPageable(Integer page, Integer size, List<PaginationRequestDto.Sort> sorting) {
        return PageRequest.of(getValidPage(page), getValidSize(size), getValidSort(sorting));
    }

    // Expected page >= 1, but return 0 as first page, because it is Spring Data standard
    private int getValidPage(Integer page) {
        return page == null || page < 1 ? getDefaultPage() : page - 1;
    }

    private int getValidSize(Integer size) {
        return size == null || size < 1 ? getDefaultPageSize() : size;
    }

    private Sort getValidSort(List<PaginationRequestDto.Sort> sorting) {
        if (CollectionUtils.isEmpty(sorting)) {
            return getDefaultSort();
        }
        List<Sort.Order> orders = sorting.stream()
                .map(this::toOrder)
                .collect(Collectors.toList());
        return Sort.by(orders);
    }

    private Sort.Order toOrder(PaginationRequestDto.Sort sort) {
        String sortColumn = resolveSortColumn(sort.getProperty());
        if (StringUtils.isEmpty(sortColumn)) {
            throw new IllegalArgumentException(String.format("Unsupported sort column %s", sort.getProperty()));
        }
        return new Sort.Order(sort.getDirection().getValue(), sortColumn);
    }

    protected int getDefaultPage() {
        return 0;
    }

    protected int getDefaultPageSize() {
        return 10;
    }

    protected String combineColumns(String... columns) {
        return StringUtils.join(columns, ".");
    }

    protected abstract String resolveSortColumn(@Nullable String sortColumn);

    protected abstract Sort getDefaultSort();
}
