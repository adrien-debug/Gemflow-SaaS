package io.hearstcorporation.atelier.service.administration.impl;

import io.hearstcorporation.atelier.dto.mapper.administration.ClientMapper;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.administration.ClientDto;
import io.hearstcorporation.atelier.dto.model.administration.ClientRequestDto;
import io.hearstcorporation.atelier.dto.model.administration.ClientSearchCriteriaDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.administration.Client;
import io.hearstcorporation.atelier.model.setting.Country;
import io.hearstcorporation.atelier.model.setting.Currency;
import io.hearstcorporation.atelier.pagination.PaginationResolver;
import io.hearstcorporation.atelier.repository.administration.ClientRepository;
import io.hearstcorporation.atelier.service.administration.ClientService;
import io.hearstcorporation.atelier.service.setting.CountryService;
import io.hearstcorporation.atelier.service.setting.CurrencyService;
import io.hearstcorporation.atelier.specification.administration.ClientSpecification;
import io.hearstcorporation.atelier.util.ExceptionWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;
    private final CountryService countryService;
    private final CurrencyService currencyService;
    private final PaginationResolver clientPaginationResolver;

    @Override
    @Transactional
    public Long createClient(ClientRequestDto clientRequestDto) {
        Client client = new Client();
        client = updateClient(client, clientRequestDto);
        return client.getId();
    }

    @Override
    @Transactional
    public void updateClient(Long clientId, ClientRequestDto clientRequestDto) {
        Client client = getClient(clientId);
        updateClient(client, clientRequestDto);
    }

    private Client updateClient(Client client, ClientRequestDto clientRequestDto) {
        Country country = Optional.ofNullable(clientRequestDto.getCountryId())
                .map(countryService::getCountry)
                .orElse(null);
        Currency currency = Optional.ofNullable(clientRequestDto.getCurrencyId())
                .map(currencyService::getCurrency)
                .orElse(null);
        ClientMapper.mapClient(client, clientRequestDto, country, currency);
        return clientRepository.save(client);
    }

    @Override
    @Transactional
    public void deleteClient(Long clientId) {
        Client client = getClient(clientId);
        ExceptionWrapper.onDelete(() -> clientRepository.deleteById(client.getId()),
                "Client %d cannot be deleted.".formatted(clientId));
    }

    @Override
    public SearchDto<ClientDto> searchClients(SearchRequestDto<ClientSearchCriteriaDto> clientSearchQueryDto) {
        Pageable pageable = clientPaginationResolver.createPageable(
                clientSearchQueryDto.getPage(),
                clientSearchQueryDto.getSize(),
                clientSearchQueryDto.getSorts()
        );
        Specification<Client> specification = ClientSpecification.create(clientSearchQueryDto.getSearchCriteria());
        Page<Client> result = clientRepository.findAll(specification, pageable);
        return ClientMapper.toClientDtoPage(result);
    }

    @Override
    @Transactional(readOnly = true)
    public ClientDto getClientDto(Long clientId) {
        return ClientMapper.toClientDto(getClient(clientId));
    }

    @Override
    public Client getClient(Long clientId) {
        return clientRepository.findById(clientId).orElseThrow(
                () -> new NotFoundException("Client with id %d was not found.".formatted(clientId))
        );
    }
}
