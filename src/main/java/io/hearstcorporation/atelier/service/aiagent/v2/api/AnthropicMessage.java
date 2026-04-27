package io.hearstcorporation.atelier.service.aiagent.v2.api;

import java.util.List;

public record AnthropicMessage(String role, List<ContentBlock> content) {

    public static AnthropicMessage user(String text) {
        return new AnthropicMessage("user", List.of(ContentBlock.text(text)));
    }

    public static AnthropicMessage userToolResults(List<ContentBlock> toolResults) {
        return new AnthropicMessage("user", toolResults);
    }
}
