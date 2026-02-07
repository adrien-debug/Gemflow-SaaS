package io.hearstcorporation.atelier.service.crm.impl;

import io.hearstcorporation.atelier.config.tenant.TenantContext;
import io.hearstcorporation.atelier.dto.mapper.crm.CrmCommunicationMapper;
import io.hearstcorporation.atelier.dto.model.crm.CrmCommunicationDto;
import io.hearstcorporation.atelier.dto.model.crm.CrmCommunicationRequestDto;
import io.hearstcorporation.atelier.dto.model.crm.SendEmailRequestDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.administration.Client;
import io.hearstcorporation.atelier.model.crm.CommunicationDirection;
import io.hearstcorporation.atelier.model.crm.CommunicationType;
import io.hearstcorporation.atelier.model.crm.CrmCommunication;
import io.hearstcorporation.atelier.model.crm.CrmContact;
import io.hearstcorporation.atelier.model.user.User;
import io.hearstcorporation.atelier.repository.crm.CrmCommunicationRepository;
import io.hearstcorporation.atelier.service.administration.ClientService;
import io.hearstcorporation.atelier.service.crm.CrmCommunicationService;
import io.hearstcorporation.atelier.service.crm.CrmContactService;
import io.hearstcorporation.atelier.service.email.EmailService;
import io.hearstcorporation.atelier.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CrmCommunicationServiceImpl implements CrmCommunicationService {

    private final CrmCommunicationRepository crmCommunicationRepository;
    private final CrmContactService crmContactService;
    private final ClientService clientService;
    private final UserService userService;
    private final EmailService emailService;

    @Override
    @Transactional
    public CrmCommunicationDto createCommunication(CrmCommunicationRequestDto requestDto) {
        CrmContact contact = requestDto.getContactId() != null ?
                crmContactService.getContact(requestDto.getContactId()) : null;
        Client client = requestDto.getClientId() != null ?
                clientService.getClient(requestDto.getClientId()) : null;
        User currentUser = userService.getCurrentUser();
        Long tenantId = TenantContext.getTenantId();

        CrmCommunication comm = CrmCommunicationMapper.toEntity(requestDto, tenantId, contact, client, currentUser);
        comm = crmCommunicationRepository.save(comm);
        return CrmCommunicationMapper.toDto(comm);
    }

    @Override
    public CrmCommunicationDto getCommunicationDto(Long communicationId) {
        CrmCommunication comm = crmCommunicationRepository.findById(communicationId)
                .orElseThrow(() -> new NotFoundException("Communication not found by id: " + communicationId));
        return CrmCommunicationMapper.toDto(comm);
    }

    @Override
    public List<CrmCommunicationDto> getCommunicationsByContactId(Long contactId) {
        return crmCommunicationRepository.findByContactIdOrderByCreatedAtDesc(contactId)
                .stream()
                .map(CrmCommunicationMapper::toDto)
                .toList();
    }

    @Override
    public List<CrmCommunicationDto> getCommunicationsByClientId(Long clientId) {
        return crmCommunicationRepository.findByClientIdOrderByCreatedAtDesc(clientId)
                .stream()
                .map(CrmCommunicationMapper::toDto)
                .toList();
    }

    @Override
    @Transactional
    public void sendEmail(SendEmailRequestDto requestDto) {
        // Send the email
        try {
            emailService.sendEmail(requestDto.getTo(), requestDto.getSubject(), requestDto.getBody());
            log.info("Email sent to: {}", requestDto.getTo());
        } catch (Exception e) {
            log.error("Failed to send email to: {}", requestDto.getTo(), e);
            throw e;
        }

        // Log the communication
        CrmCommunicationRequestDto commDto = new CrmCommunicationRequestDto();
        commDto.setContactId(requestDto.getContactId());
        commDto.setClientId(requestDto.getClientId());
        commDto.setType(CommunicationType.EMAIL);
        commDto.setDirection(CommunicationDirection.OUTBOUND);
        commDto.setSubject(requestDto.getSubject());
        commDto.setContent(requestDto.getBody());

        CrmContact contact = requestDto.getContactId() != null ?
                crmContactService.getContact(requestDto.getContactId()) : null;
        Client client = requestDto.getClientId() != null ?
                clientService.getClient(requestDto.getClientId()) : null;
        User currentUser = userService.getCurrentUser();
        Long tenantId = TenantContext.getTenantId();

        CrmCommunication comm = CrmCommunicationMapper.toEntity(commDto, tenantId, contact, client, currentUser);
        comm.setSentAt(Instant.now());
        crmCommunicationRepository.save(comm);
    }

    @Override
    @Transactional
    public void deleteCommunication(Long communicationId) {
        CrmCommunication comm = crmCommunicationRepository.findById(communicationId)
                .orElseThrow(() -> new NotFoundException("Communication not found by id: " + communicationId));
        crmCommunicationRepository.delete(comm);
    }
}

