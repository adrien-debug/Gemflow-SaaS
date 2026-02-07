package io.hearstcorporation.atelier.service.crm.impl;

import io.hearstcorporation.atelier.config.tenant.TenantContext;
import io.hearstcorporation.atelier.dto.mapper.crm.CrmContactMapper;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.crm.CrmContactDto;
import io.hearstcorporation.atelier.dto.model.crm.CrmContactRequestDto;
import io.hearstcorporation.atelier.dto.model.crm.CrmContactSearchCriteriaDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.administration.Client;
import io.hearstcorporation.atelier.model.crm.CrmContact;
import io.hearstcorporation.atelier.pagination.crm.CrmContactPaginationResolver;
import io.hearstcorporation.atelier.repository.crm.CrmContactRepository;
import io.hearstcorporation.atelier.service.administration.ClientService;
import io.hearstcorporation.atelier.service.crm.CrmContactService;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CrmContactServiceImpl implements CrmContactService {

    private final CrmContactRepository crmContactRepository;
    private final ClientService clientService;
    private final CrmContactPaginationResolver crmContactPaginationResolver;

    @Override
    @Transactional
    public CrmContactDto createContact(CrmContactRequestDto requestDto) {
        Client client = requestDto.getClientId() != null ? 
                clientService.getClient(requestDto.getClientId()) : null;
        Long tenantId = TenantContext.getTenantId();
        CrmContact contact = CrmContactMapper.toEntity(requestDto, tenantId, client);
        contact = crmContactRepository.save(contact);
        return CrmContactMapper.toDto(contact);
    }

    @Override
    @Transactional
    public CrmContactDto updateContact(Long contactId, CrmContactRequestDto requestDto) {
        CrmContact contact = getContact(contactId);
        Client client = requestDto.getClientId() != null ? 
                clientService.getClient(requestDto.getClientId()) : null;
        CrmContactMapper.updateEntity(contact, requestDto, client);
        contact = crmContactRepository.save(contact);
        return CrmContactMapper.toDto(contact);
    }

    @Override
    public CrmContactDto getContactDto(Long contactId) {
        return CrmContactMapper.toDto(getContact(contactId));
    }

    @Override
    public CrmContact getContact(Long contactId) {
        return crmContactRepository.findById(contactId)
                .orElseThrow(() -> new NotFoundException("Contact not found by id: " + contactId));
    }

    @Override
    public SearchDto<CrmContactDto> searchContacts(SearchRequestDto<CrmContactSearchCriteriaDto> searchRequest) {
        Pageable pageable = crmContactPaginationResolver.createPageable(
                searchRequest.getPage(),
                searchRequest.getSize(),
                searchRequest.getSorts()
        );
        Specification<CrmContact> spec = buildSpecification(searchRequest.getSearchCriteria());
        Page<CrmContact> page = crmContactRepository.findAll(spec, pageable);
        List<CrmContactDto> dtos = page.getContent().stream()
                .map(CrmContactMapper::toDto)
                .toList();
        return new SearchDto<>(
                dtos,
                page.getNumber(),
                page.getSize(),
                page.getTotalPages(),
                page.getTotalElements()
        );
    }

    @Override
    @Transactional
    public void deleteContact(Long contactId) {
        CrmContact contact = getContact(contactId);
        crmContactRepository.delete(contact);
    }

    private Specification<CrmContact> buildSpecification(CrmContactSearchCriteriaDto criteria) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            // Filter by tenant
            Long tenantId = TenantContext.getTenantId();
            if (tenantId != null) {
                predicates.add(cb.equal(root.get("tenantId"), tenantId));
            }

            if (criteria != null) {
                if (criteria.getSearch() != null && !criteria.getSearch().isBlank()) {
                    String search = "%" + criteria.getSearch().toLowerCase() + "%";
                    predicates.add(cb.or(
                            cb.like(cb.lower(root.get("email")), search),
                            cb.like(cb.lower(root.get("firstName")), search),
                            cb.like(cb.lower(root.get("lastName")), search),
                            cb.like(cb.lower(root.get("company")), search)
                    ));
                }
                if (criteria.getClientId() != null) {
                    predicates.add(cb.equal(root.get("client").get("id"), criteria.getClientId()));
                }
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}

