package io.hearstcorporation.atelier.dto.model.user;

import io.hearstcorporation.atelier.dto.model.ImageDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class UserWithImageDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String fullName;
    private List<ImageDto> photos;
}
