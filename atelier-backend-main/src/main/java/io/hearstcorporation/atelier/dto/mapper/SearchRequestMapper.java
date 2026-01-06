package io.hearstcorporation.atelier.dto.mapper;

import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import lombok.experimental.UtilityClass;

@UtilityClass
public class SearchRequestMapper {

    public <T> SearchRequestDto<T> mapSearchRequestDto(SearchRequestDto<?> from, T searchCriteria) {
        SearchRequestDto<T> searchRequestDto = new SearchRequestDto<>();
        searchRequestDto.setPage(from.getPage());
        searchRequestDto.setSize(from.getSize());
        searchRequestDto.setSorts(from.getSorts());
        searchRequestDto.setSearchCriteria(searchCriteria);
        return searchRequestDto;
    }
}
