package io.hearstcorporation.atelier.repository.crm;

import io.hearstcorporation.atelier.model.crm.CrmContact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CrmContactRepository extends JpaRepository<CrmContact, Long>, JpaSpecificationExecutor<CrmContact> {
}

