package io.hearstcorporation.atelier.service.aiagent.impl;

import io.hearstcorporation.atelier.dto.request.AiAgentQueryDto;
import io.hearstcorporation.atelier.dto.request.ExternalOrderImportDto;
import io.hearstcorporation.atelier.dto.response.AiAgentResponseDto;
import io.hearstcorporation.atelier.dto.response.ExternalPriceDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.administration.Client;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.repository.administration.ClientRepository;
import io.hearstcorporation.atelier.repository.order.OrderRepository;
import io.hearstcorporation.atelier.service.aiagent.AiAgentService;
import io.hearstcorporation.atelier.service.aiagent.ExternalPriceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AiAgentServiceImpl implements AiAgentService {

    private final OrderRepository orderRepository;
    private final ClientRepository clientRepository;
    private final ExternalPriceService externalPriceService;

    @Override
    @Transactional(readOnly = true)
    public AiAgentResponseDto processQuery(AiAgentQueryDto queryDto) {
        log.info("Processing AI query: {}", queryDto.getQuery());
        
        String query = queryDto.getQuery().toLowerCase();
        String context = queryDto.getContext();
        
        // Simple rule-based processing (can be enhanced with LLM later)
        if (query.contains("order") || query.contains("commande")) {
            return handleOrderQuery(query);
        } else if (query.contains("price") || query.contains("prix")) {
            return handlePriceQuery(query);
        } else if (query.contains("client")) {
            return handleClientQuery(query);
        } else if (query.contains("stats") || query.contains("statistique")) {
            return analyzePlatform();
        } else {
            return AiAgentResponseDto.builder()
                    .response("Je peux vous aider avec les commandes, les prix des métaux, les clients et les statistiques. " +
                            "Que souhaitez-vous savoir ?")
                    .type("info")
                    .suggestions(List.of(
                            "Combien de commandes actives ?",
                            "Prix actuels des métaux ?",
                            "Statistiques de la plateforme ?"
                    ))
                    .build();
        }
    }

    @Override
    @Transactional
    public AiAgentResponseDto importExternalOrder(ExternalOrderImportDto importDto) {
        log.info("Importing external order: {} from {}", importDto.getExternalOrderId(), importDto.getSource());
        
        try {
            // Verify client exists
            Client client = clientRepository.findById(importDto.getClientId())
                    .orElseThrow(() -> new NotFoundException("Client not found: " + importDto.getClientId()));
            
            // Create order
            Order order = new Order();
            order.setName(importDto.getName());
            order.setDescription(importDto.getDescription());
            order.setClient(client);
            order.setCreatedDate(LocalDate.now());
            order.setDueDate(importDto.getDueDate());
            
            // Save order
            Order saved = orderRepository.save(order);
            
            Map<String, Object> data = new HashMap<>();
            data.put("orderId", saved.getId());
            data.put("orderName", saved.getName());
            data.put("externalOrderId", importDto.getExternalOrderId());
            data.put("source", importDto.getSource());
            
            return AiAgentResponseDto.builder()
                    .response(String.format("Commande externe #%s importée avec succès depuis %s. " +
                            "Nouvelle commande #%d créée.", 
                            importDto.getExternalOrderId(), importDto.getSource(), saved.getId()))
                    .type("info")
                    .data(data)
                    .suggestions(List.of(
                            "Voir la commande importée",
                            "Importer une autre commande"
                    ))
                    .build();
                    
        } catch (NotFoundException e) {
            log.error("Import failed: {}", e.getMessage());
            return AiAgentResponseDto.builder()
                    .response("Échec de l'import : " + e.getMessage())
                    .type("alert")
                    .build();
        }
    }

    @Override
    @Transactional(readOnly = true)
    public AiAgentResponseDto analyzePlatform() {
        log.info("Analyzing platform data");
        
        long totalOrders = orderRepository.count();
        long totalClients = clientRepository.count();
        
        // Get recent orders (last 30 days)
        LocalDate thirtyDaysAgo = LocalDate.now().minusDays(30);
        long recentOrders = orderRepository.findAll().stream()
                .filter(o -> o.getCreatedDate() != null && o.getCreatedDate().isAfter(thirtyDaysAgo))
                .count();
        
        Map<String, Object> data = new HashMap<>();
        data.put("totalOrders", totalOrders);
        data.put("totalClients", totalClients);
        data.put("recentOrders", recentOrders);
        
        StringBuilder response = new StringBuilder();
        response.append("📊 Analyse de la plateforme :\n\n");
        response.append(String.format("• Total des commandes : %d\n", totalOrders));
        response.append(String.format("• Total des clients : %d\n", totalClients));
        response.append(String.format("• Commandes récentes (30 jours) : %d\n", recentOrders));
        
        return AiAgentResponseDto.builder()
                .response(response.toString())
                .type("data")
                .data(data)
                .suggestions(List.of(
                        "Voir les recommandations de prix",
                        "Afficher les commandes récentes"
                ))
                .build();
    }

    @Override
    public AiAgentResponseDto getPriceRecommendations() {
        log.info("Getting price recommendations");
        
        List<ExternalPriceDto> prices = externalPriceService.fetchAllMetalPrices();
        
        Map<String, Object> data = new HashMap<>();
        data.put("prices", prices);
        data.put("timestamp", new Date());
        
        StringBuilder response = new StringBuilder();
        response.append("💰 Prix actuels des métaux :\n\n");
        
        for (ExternalPriceDto price : prices) {
            response.append(String.format("• %s : $%.2f/%s", 
                    price.getMetal(), 
                    price.getPrice(), 
                    price.getUnit()));
            
            if (price.getChange24h() != null) {
                String changeIndicator = price.getChange24h().compareTo(BigDecimal.ZERO) > 0 ? "📈" : "📉";
                response.append(String.format(" (%s %.2f%%)", changeIndicator, price.getChange24h()));
            }
            response.append("\n");
        }
        
        response.append(String.format("\nSource : %s", prices.isEmpty() ? "N/A" : prices.get(0).getSource()));
        
        return AiAgentResponseDto.builder()
                .response(response.toString())
                .type("data")
                .data(data)
                .suggestions(List.of(
                        "Mettre à jour les prix des métaux",
                        "Analyser l'impact sur les coûts"
                ))
                .build();
    }

    // Private helper methods
    
    private AiAgentResponseDto handleOrderQuery(String query) {
        if (query.contains("combien") || query.contains("count") || query.contains("total")) {
            long count = orderRepository.count();
            
            Map<String, Object> data = new HashMap<>();
            data.put("totalOrders", count);
            
            return AiAgentResponseDto.builder()
                    .response(String.format("Il y a actuellement %d commandes dans la plateforme.", count))
                    .type("info")
                    .data(data)
                    .suggestions(List.of(
                            "Voir les commandes récentes",
                            "Créer une nouvelle commande"
                    ))
                    .build();
        }
        
        // Default order response
        return AiAgentResponseDto.builder()
                .response("Je peux vous renseigner sur le nombre de commandes, les commandes récentes, etc.")
                .type("info")
                .suggestions(List.of("Combien de commandes ?", "Commandes récentes ?"))
                .build();
    }
    
    private AiAgentResponseDto handlePriceQuery(String query) {
        return getPriceRecommendations();
    }
    
    private AiAgentResponseDto handleClientQuery(String query) {
        if (query.contains("combien") || query.contains("count") || query.contains("total")) {
            long count = clientRepository.count();
            
            Map<String, Object> data = new HashMap<>();
            data.put("totalClients", count);
            
            return AiAgentResponseDto.builder()
                    .response(String.format("Il y a actuellement %d clients dans la plateforme.", count))
                    .type("info")
                    .data(data)
                    .suggestions(List.of(
                            "Voir la liste des clients",
                            "Ajouter un nouveau client"
                    ))
                    .build();
        }
        
        return AiAgentResponseDto.builder()
                .response("Je peux vous renseigner sur les clients de la plateforme.")
                .type("info")
                .suggestions(List.of("Combien de clients ?", "Qui sont les principaux clients ?"))
                .build();
    }
}
