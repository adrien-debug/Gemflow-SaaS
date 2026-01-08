package io.hearstcorporation.atelier.util;

import io.hearstcorporation.atelier.exception.InvalidDataException;
import io.hearstcorporation.atelier.model.BaseModel;
import jakarta.persistence.Table;
import lombok.experimental.UtilityClass;

@UtilityClass
public class EntityHelper {

    public static <T extends BaseModel> String getTableName(Class<T> entityClass) {
        Table tableAnnotation = entityClass.getAnnotation(Table.class);
        if (tableAnnotation != null && !tableAnnotation.name().isEmpty()) {
            return tableAnnotation.name();
        }
        throw new InvalidDataException("%s has no @Table annotation".formatted(entityClass.getSimpleName()));
    }
}
