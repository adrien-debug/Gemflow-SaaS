package io.hearstcorporation.atelier.controller.crm;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.crm.CrmContactDto;
import io.hearstcorporation.atelier.dto.model.crm.CrmContactRequestDto;
import io.hearstcorporation.atelier.dto.model.crm.CrmContactSearchCriteriaDto;
import io.hearstcorporation.atelier.service.crm.CrmContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static io.hearstcorporation.atelier.controller.crm.CrmContactController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class CrmContactController {

    public static final String BASE_URL = "/api/v1/crm/contacts";
    public static final String CONTACT_ID = "/{contactId}";

    private final CrmContactService crmContactService;

    @PostMapping
    public CrmContactDto createContact(@RequestBody @Valid CrmContactRequestDto requestDto) {
        return crmContactService.createContact(requestDto);
    }

    @PutMapping(CONTACT_ID)
    public CrmContactDto updateContact(@PathVariable Long contactId,
                                        @RequestBody @Valid CrmContactRequestDto requestDto) {
        return crmContactService.updateContact(contactId, requestDto);
    }

    @PostMapping("/search")
    public SearchDto<CrmContactDto> searchContacts(
            @RequestBody @Valid SearchRequestDto<CrmContactSearchCriteriaDto> searchRequest) {
        return crmContactService.searchContacts(searchRequest);
    }

    @GetMapping(CONTACT_ID)
    public CrmContactDto getContact(@PathVariable Long contactId) {
        return crmContactService.getContactDto(contactId);
    }

    @DeleteMapping(CONTACT_ID)
    public void deleteContact(@PathVariable Long contactId) {
        crmContactService.deleteContact(contactId);
    }
}

