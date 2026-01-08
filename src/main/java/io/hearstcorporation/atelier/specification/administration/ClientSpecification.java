package io.hearstcorporation.atelier.specification.administration;

import io.hearstcorporation.atelier.dto.model.administration.ClientSearchCriteriaDto;
import io.hearstcorporation.atelier.model.administration.Client;
import io.hearstcorporation.atelier.model.administration.Client_;
import io.hearstcorporation.atelier.specification.PredicateBuilder;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

@UtilityClass
public class ClientSpecification {

    public static Specification<Client> create(ClientSearchCriteriaDto clientSearchCriteria) {
        return (root, query, cb) -> {

            PredicateBuilder<Client> clientBuilder = new PredicateBuilder<>(root, query, cb);

            if (clientSearchCriteria == null) {
                return clientBuilder.build();
            }

            if (StringUtils.isNotBlank(clientSearchCriteria.getSearchInput())) {
                clientBuilder.and(
                        clientBuilder.query().likeOr(Client_.name, clientSearchCriteria.getSearchInput())
                                .likeNumberOr(Client_.id, clientSearchCriteria.getSearchInput())
                                .build()
                );
            }

            return clientBuilder.build();
        };
    }
}
