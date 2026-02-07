package io.hearstcorporation.atelier.repository.crm;

import io.hearstcorporation.atelier.model.crm.EmailTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmailTemplateRepository extends JpaRepository<EmailTemplate, Long> {
    
    List<EmailTemplate> findByTenantIdOrderByNameAsc(Long tenantId);
}

