package io.hearstcorporation.atelier.controller.administration;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.administration.ClientDto;
import io.hearstcorporation.atelier.dto.model.administration.ClientRequestDto;
import io.hearstcorporation.atelier.dto.model.administration.ClientSearchCriteriaDto;
import io.hearstcorporation.atelier.service.administration.ClientService;
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

import static io.hearstcorporation.atelier.controller.administration.ClientController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class ClientController {

    public static final String BASE_URL = "/api/v1/clients";
    public static final String CLIENT_ID = "/{clientId}";

    private final ClientService clientService;

    @PostMapping
    public ClientDto createClient(@RequestBody @Valid ClientRequestDto clientRequestDto) {
        Long clientId = clientService.createClient(clientRequestDto);
        return clientService.getClientDto(clientId);
    }

    @PutMapping(CLIENT_ID)
    public ClientDto updateClient(@PathVariable Long clientId,
                                  @RequestBody @Valid ClientRequestDto clientRequestDto) {
        clientService.updateClient(clientId, clientRequestDto);
        return clientService.getClientDto(clientId);
    }

    @PostMapping("/search")
    public SearchDto<ClientDto> searchClients(@RequestBody @Valid SearchRequestDto<ClientSearchCriteriaDto> clientSearchQueryDto) {
        return clientService.searchClients(clientSearchQueryDto);
    }

    @GetMapping(CLIENT_ID)
    public ClientDto getClient(@PathVariable Long clientId) {
        return clientService.getClientDto(clientId);
    }

    @DeleteMapping(CLIENT_ID)
    public void deleteClient(@PathVariable Long clientId) {
        clientService.deleteClient(clientId);
    }
}
