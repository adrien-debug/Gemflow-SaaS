package io.hearstcorporation.atelier.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgentChatRequestDto {

    @NotBlank(message = "Message cannot be blank")
    @Size(max = 4000, message = "Message must not exceed 4000 characters")
    private String message;

    /** Optional. Created server-side if missing. */
    private UUID conversationId;

    /** Optional override of the agent flavour (default = generic). */
    @Size(max = 64)
    private String agent;

    /** Optional override of the model (must match a configured model alias). */
    @Size(max = 64)
    private String model;
}
