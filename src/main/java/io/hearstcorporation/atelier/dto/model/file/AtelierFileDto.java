package io.hearstcorporation.atelier.dto.model.file;

import io.hearstcorporation.atelier.model.file.Source;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
@EqualsAndHashCode
public class AtelierFileDto {

    protected Long id;
    protected String fileName;
    protected String contentType;
    protected Source source;
}
