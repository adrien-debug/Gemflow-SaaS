package io.hearstcorporation.atelier.config.file;

import lombok.experimental.UtilityClass;

import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;

@UtilityClass
public class FileExpirations {

    public static final int CACHE_CONTROL_VALIDITY_PERIOD_VALUE = 12;
    public static final TemporalUnit CACHE_CONTROL_VALIDITY_PERIOD_UNIT = ChronoUnit.HOURS;

    public static final int DOWNLOAD_FILE_VALIDITY_PERIOD_VALUE = 12;
    public static final TemporalUnit DOWNLOAD_FILE_VALIDITY_PERIOD_UNIT = ChronoUnit.HOURS;

    public static final int UPLOAD_FILE_VALIDITY_PERIOD_VALUE = 10;
    public static final TemporalUnit UPLOAD_FILE_VALIDITY_PERIOD_UNIT = ChronoUnit.MINUTES;
}
