package io.hearstcorporation.atelier.util;

import io.hearstcorporation.atelier.exception.CannotDeleteException;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;

@Slf4j
@UtilityClass
public class ExceptionWrapper {

    public static void onDelete(Runnable runnable, String errorMessage) {
        try {
            runnable.run();
        } catch (DataIntegrityViolationException e) {
            log.error(errorMessage, e);
            throw new CannotDeleteException(errorMessage);
        }
    }
}
