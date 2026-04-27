package io.hearstcorporation.atelier.service.aiagent.v2.tool;

/**
 * Result of a tool invocation. Always serialised to a string before being sent back to the LLM.
 */
public record ToolExecutionResult(boolean isError, String content) {

    public static ToolExecutionResult ok(String content) {
        return new ToolExecutionResult(false, content);
    }

    public static ToolExecutionResult error(String message) {
        return new ToolExecutionResult(true, message);
    }
}
