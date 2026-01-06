package io.hearstcorporation.atelier.service.administration;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.administration.ClientDto;
import io.hearstcorporation.atelier.dto.model.administration.ClientRequestDto;
import io.hearstcorporation.atelier.dto.model.administration.ClientSearchCriteriaDto;
import io.hearstcorporation.atelier.model.administration.Client;

public interface ClientService {

    // Business logic methods

    Long createClient(ClientRequestDto clientRequestDto);

    void updateClient(Long clientId, ClientRequestDto clientRequestDto);

    void deleteClient(Long clientId);

    // Get Dto methods

    SearchDto<ClientDto> searchClients(SearchRequestDto<ClientSearchCriteriaDto> clientSearchQueryDto);

    ClientDto getClientDto(Long clientId);

    // Get Entity methods

    Client getClient(Long clientId);
}
