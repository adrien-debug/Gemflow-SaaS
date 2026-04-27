package io.hearstcorporation.atelier.service.aiagent.v2.audit;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AgentInvocationRepository extends JpaRepository<AgentInvocation, Long> {
}
