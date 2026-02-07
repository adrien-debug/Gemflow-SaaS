package io.hearstcorporation.atelier.repository.crm;

import io.hearstcorporation.atelier.model.crm.CrmCommunication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CrmCommunicationRepository extends JpaRepository<CrmCommunication, Long>, JpaSpecificationExecutor<CrmCommunication> {
    
    List<CrmCommunication> findByContactIdOrderByCreatedAtDesc(Long contactId);
    
    List<CrmCommunication> findByClientIdOrderByCreatedAtDesc(Long clientId);
}

