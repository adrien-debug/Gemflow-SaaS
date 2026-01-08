package io.hearstcorporation.atelier.controller.crm;

import io.hearstcorporation.atelier.dto.model.crm.CrmCommunicationDto;
import io.hearstcorporation.atelier.dto.model.crm.CrmCommunicationRequestDto;
import io.hearstcorporation.atelier.dto.model.crm.SendEmailRequestDto;
import io.hearstcorporation.atelier.service.crm.CrmCommunicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static io.hearstcorporation.atelier.controller.crm.CrmCommunicationController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class CrmCommunicationController {

    public static final String BASE_URL = "/api/v1/crm/communications";
    public static final String COMMUNICATION_ID = "/{communicationId}";

    private final CrmCommunicationService crmCommunicationService;

    @PostMapping
    public CrmCommunicationDto createCommunication(@RequestBody @Valid CrmCommunicationRequestDto requestDto) {
        return crmCommunicationService.createCommunication(requestDto);
    }

    @GetMapping(COMMUNICATION_ID)
    public CrmCommunicationDto getCommunication(@PathVariable Long communicationId) {
        return crmCommunicationService.getCommunicationDto(communicationId);
    }

    @GetMapping("/by-contact/{contactId}")
    public List<CrmCommunicationDto> getCommunicationsByContact(@PathVariable Long contactId) {
        return crmCommunicationService.getCommunicationsByContactId(contactId);
    }

    @GetMapping("/by-client/{clientId}")
    public List<CrmCommunicationDto> getCommunicationsByClient(@PathVariable Long clientId) {
        return crmCommunicationService.getCommunicationsByClientId(clientId);
    }

    @PostMapping("/send-email")
    public void sendEmail(@RequestBody @Valid SendEmailRequestDto requestDto) {
        crmCommunicationService.sendEmail(requestDto);
    }

    @DeleteMapping(COMMUNICATION_ID)
    public void deleteCommunication(@PathVariable Long communicationId) {
        crmCommunicationService.deleteCommunication(communicationId);
    }
}

