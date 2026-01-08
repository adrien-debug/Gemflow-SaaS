package io.hearstcorporation.atelier.service.crm;

import io.hearstcorporation.atelier.dto.model.crm.CrmCommunicationDto;
import io.hearstcorporation.atelier.dto.model.crm.CrmCommunicationRequestDto;
import io.hearstcorporation.atelier.dto.model.crm.SendEmailRequestDto;

import java.util.List;

public interface CrmCommunicationService {

    CrmCommunicationDto createCommunication(CrmCommunicationRequestDto requestDto);

    CrmCommunicationDto getCommunicationDto(Long communicationId);

    List<CrmCommunicationDto> getCommunicationsByContactId(Long contactId);

    List<CrmCommunicationDto> getCommunicationsByClientId(Long clientId);

    void sendEmail(SendEmailRequestDto requestDto);

    void deleteCommunication(Long communicationId);
}

