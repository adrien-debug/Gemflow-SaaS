package io.hearstcorporation.atelier.config.token;

import lombok.experimental.UtilityClass;

import java.time.temporal.ChronoUnit;

@UtilityClass
public class TokenExpirations {

    public static final int RESTORE_PASSWORD_EXPIRATION_VALUE = 1;
    public static final ChronoUnit RESTORE_PASSWORD_EXPIRATION_UNIT = ChronoUnit.DAYS;
}
