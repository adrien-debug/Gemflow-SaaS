package io.hearstcorporation.atelier.dto.model.billing;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class CheckoutSessionDto {
    String id;
    String url;
}


