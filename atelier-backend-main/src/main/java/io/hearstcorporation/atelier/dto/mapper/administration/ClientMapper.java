package io.hearstcorporation.atelier.dto.mapper.administration;

import io.hearstcorporation.atelier.dto.mapper.setting.CountryMapper;
import io.hearstcorporation.atelier.dto.mapper.setting.CurrencyMapper;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.administration.ClientDto;
import io.hearstcorporation.atelier.dto.model.administration.ClientRequestDto;
import io.hearstcorporation.atelier.dto.model.administration.ClientShortDto;
import io.hearstcorporation.atelier.model.administration.Client;
import io.hearstcorporation.atelier.model.setting.Country;
import io.hearstcorporation.atelier.model.setting.Currency;
import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Page;

@UtilityClass
public class ClientMapper {

    public static ClientDto toClientDto(Client client) {
        if (client == null) {
            return null;
        }
        return ClientDto.builder()
                .id(client.getId())
                .name(client.getName())
                .email(client.getEmail())
                .address(client.getAddress())
                .city(client.getCity())
                .postalCode(client.getPostalCode())
                .vatNumber(client.getVatNumber())
                .country(CountryMapper.toCountryDto(client.getCountry()))
                .currency(CurrencyMapper.toCurrencyDto(client.getCurrency()))
                .build();
    }

    public static ClientShortDto toClientShortDto(Client client) {
        if (client == null) {
            return null;
        }
        return ClientShortDto.builder()
                .id(client.getId())
                .name(client.getName())
                .email(client.getEmail())
                .address(client.getAddress())
                .city(client.getCity())
                .postalCode(client.getPostalCode())
                .vatNumber(client.getVatNumber())
                .build();
    }

    public static SearchDto<ClientDto> toClientDtoPage(Page<Client> clientPage) {
        return new SearchDto<>(
                clientPage.getContent().stream()
                        .map(ClientMapper::toClientDto)
                        .toList(),
                clientPage.getNumber(),
                clientPage.getSize(),
                clientPage.getTotalPages(),
                clientPage.getTotalElements()
        );
    }

    public static void mapClient(Client client, ClientRequestDto clientRequestDto, Country country, Currency currency) {
        client.setName(clientRequestDto.getName());
        client.setEmail(clientRequestDto.getEmail());
        client.setAddress(clientRequestDto.getAddress());
        client.setCity(clientRequestDto.getCity());
        client.setPostalCode(clientRequestDto.getPostalCode());
        client.setVatNumber(clientRequestDto.getVatNumber());
        client.setCountry(country);
        client.setCurrency(currency);
    }
}
