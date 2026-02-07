package io.hearstcorporation.atelier.dto.model;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IdRequestDto implements Identifiable<Long> {

    @NotNull
    private Long id;
}
