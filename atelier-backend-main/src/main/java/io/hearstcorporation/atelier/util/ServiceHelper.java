package io.hearstcorporation.atelier.util;

import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.BaseModel;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.StringUtils;

import java.util.List;

@UtilityClass
public class ServiceHelper {

    public static <T extends BaseModel> void compareIdsOrThrow(List<T> foundEntities, List<Long> ids, Class<T> clazz) {
        List<Long> foundIds = foundEntities.stream()
                .map(BaseModel::getId).toList();
        List<Long> difference = ids.stream()
                .filter(id -> !foundIds.contains(id))
                .toList();
        if (!difference.isEmpty()) {
            String idsStr = StringUtils.join(difference, ", ");
            String message = "The %s was not found for following identities: %s".formatted(clazz.getSimpleName(), idsStr);
            throw new NotFoundException(message);
        }
    }
}
