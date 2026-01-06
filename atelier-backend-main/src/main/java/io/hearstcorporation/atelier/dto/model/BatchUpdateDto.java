package io.hearstcorporation.atelier.dto.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.ListUtils;

import java.util.List;
import java.util.Objects;

@Getter
@Setter
public class BatchUpdateDto<T extends Identifiable<ID>, ID> {

    @Valid
    private List<@NotNull T> requestDtoList;

    @Valid
    private List<@NotNull ID> deletedIds;

    @JsonIgnore
    public boolean isEmpty() {
        return CollectionUtils.isEmpty(requestDtoList) && CollectionUtils.isEmpty(deletedIds);
    }

    public List<T> getRequestDtoList() {
        return ListUtils.emptyIfNull(requestDtoList);
    }

    public List<ID> getRequestDtoIds() {
        return getRequestDtoList().stream().map(T::getId).filter(Objects::nonNull).toList();
    }
}
