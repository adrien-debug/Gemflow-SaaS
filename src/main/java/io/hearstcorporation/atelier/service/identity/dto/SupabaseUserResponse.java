package io.hearstcorporation.atelier.service.identity.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record SupabaseUserResponse(String id, String email) {
}
