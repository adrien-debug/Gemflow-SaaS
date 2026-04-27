package io.hearstcorporation.atelier.service.aiagent.v2.artifact;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Mutable per-run state. Currently holds the {@link Artifact}s the agent emitted.
 * Lives on the {@code ToolContext} so any tool can append, but stays scoped to one run.
 */
public final class RunState {

    private static final int MAX_ARTIFACTS = 32;

    private final List<Artifact> artifacts = new ArrayList<>();

    public synchronized boolean addArtifact(Artifact a) {
        if (a == null || artifacts.size() >= MAX_ARTIFACTS) {
            return false;
        }
        artifacts.add(a);
        return true;
    }

    public synchronized List<Artifact> artifacts() {
        return Collections.unmodifiableList(new ArrayList<>(artifacts));
    }

    public synchronized int artifactCount() {
        return artifacts.size();
    }
}
