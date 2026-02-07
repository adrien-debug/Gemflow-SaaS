package io.hearstcorporation.atelier.dto.model.file;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class AtelierUploadFileDto extends AtelierFileDto {

    private String uploadUrl;
}
