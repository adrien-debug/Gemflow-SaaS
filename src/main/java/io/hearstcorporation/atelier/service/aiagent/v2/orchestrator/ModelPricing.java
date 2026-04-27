package io.hearstcorporation.atelier.service.aiagent.v2.orchestrator;

import java.util.Map;

/**
 * Per-model pricing in micro-USD per million tokens.
 * Stored as integers to avoid floating-point drift in audit logs.
 *
 * Public list-prices as of late 2025 — adjust if Anthropic updates them.
 */
public final class ModelPricing {

    public record Rates(long inputPerMTok, long outputPerMTok, long cacheWritePerMTok, long cacheReadPerMTok) {}

    private static final Rates DEFAULT_RATES =
            new Rates(3_000_000L, 15_000_000L, 3_750_000L, 300_000L); // Sonnet-class

    private static final Map<String, Rates> RATES_BY_MODEL = Map.of(
            "claude-opus-4-7",   new Rates(15_000_000L, 75_000_000L, 18_750_000L, 1_500_000L),
            "claude-sonnet-4-6", new Rates( 3_000_000L, 15_000_000L,  3_750_000L,   300_000L),
            "claude-haiku-4-5",  new Rates( 1_000_000L,  5_000_000L,  1_250_000L,   100_000L)
    );

    private ModelPricing() {}

    public static Rates ratesFor(String model) {
        if (model == null) return DEFAULT_RATES;
        return RATES_BY_MODEL.getOrDefault(model, DEFAULT_RATES);
    }

    /**
     * Compute the cost of a single API call in micro-USD (1 USD = 1_000_000 micro-USD).
     */
    public static long costMicroUsd(String model, int inputTokens, int outputTokens, int cacheReadTokens, int cacheCreationTokens) {
        Rates r = ratesFor(model);
        long fresh = Math.max(0, inputTokens - cacheReadTokens - cacheCreationTokens);
        long total = 0L;
        total += fresh * r.inputPerMTok();
        total += (long) outputTokens * r.outputPerMTok();
        total += (long) cacheCreationTokens * r.cacheWritePerMTok();
        total += (long) cacheReadTokens * r.cacheReadPerMTok();
        // tokens × (micro-USD per million) → divide by 1_000_000 to get micro-USD
        return total / 1_000_000L;
    }
}
