package io.hearstcorporation.atelier.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AiAgentQueryDto {
    @NotBlank(message = "Query cannot be blank")
    @Size(max = 1000, message = "Query must not exceed 1000 characters")
    private String query;

    private String context; // Optional: order, inventory, client, etc.
}
