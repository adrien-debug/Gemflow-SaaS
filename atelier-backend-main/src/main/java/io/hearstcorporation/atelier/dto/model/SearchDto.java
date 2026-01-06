package io.hearstcorporation.atelier.dto.model;

import java.util.List;

public record SearchDto<T>(List<T> content, Integer page, Integer size, Integer totalPages, Long totalElements) {

    public SearchDto(List<T> content, Integer page, Integer size, Integer totalPages, Long totalElements) {
        this.content = content;
        // Expected that first page = 1
        this.page = page + 1;
        this.size = size;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
    }
}
