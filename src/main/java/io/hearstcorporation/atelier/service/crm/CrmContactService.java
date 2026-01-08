package io.hearstcorporation.atelier.service.crm;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.crm.CrmContactDto;
import io.hearstcorporation.atelier.dto.model.crm.CrmContactRequestDto;
import io.hearstcorporation.atelier.dto.model.crm.CrmContactSearchCriteriaDto;
import io.hearstcorporation.atelier.model.crm.CrmContact;

public interface CrmContactService {

    CrmContactDto createContact(CrmContactRequestDto requestDto);

    CrmContactDto updateContact(Long contactId, CrmContactRequestDto requestDto);

    CrmContactDto getContactDto(Long contactId);

    CrmContact getContact(Long contactId);

    SearchDto<CrmContactDto> searchContacts(SearchRequestDto<CrmContactSearchCriteriaDto> searchRequest);

    void deleteContact(Long contactId);
}

