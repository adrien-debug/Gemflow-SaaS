package io.hearstcorporation.atelier.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AiAgentResponseDto {
    private String response;
    private String type; // info, suggestion, alert, data
    private Map<String, Object> data; // Optional structured data
    private List<String> suggestions; // Next possible actions
}
