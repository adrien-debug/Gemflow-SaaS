package io.hearstcorporation.atelier.config.security;

import io.hearstcorporation.atelier.config.keycloak.property.KeycloakProperties;
import io.hearstcorporation.atelier.controller.administration.ClientController;
import io.hearstcorporation.atelier.controller.administration.SupplierController;
import io.hearstcorporation.atelier.controller.dev.DevController;
import io.hearstcorporation.atelier.controller.file.AtelierFileController;
import io.hearstcorporation.atelier.controller.inventory.alloy.AlloyController;
import io.hearstcorporation.atelier.controller.inventory.alloy.AlloyPurchaseController;
import io.hearstcorporation.atelier.controller.inventory.alloyedmetal.AlloyedMetalController;
import io.hearstcorporation.atelier.controller.inventory.alloyedmetal.AlloyedMetalPurchaseController;
import io.hearstcorporation.atelier.controller.inventory.diamond.DiamondController;
import io.hearstcorporation.atelier.controller.inventory.gemstone.GemstoneController;
import io.hearstcorporation.atelier.controller.inventory.other.OtherMaterialController;
import io.hearstcorporation.atelier.controller.inventory.other.OtherMaterialTransactionController;
import io.hearstcorporation.atelier.controller.inventory.puremetal.PureMetalPurchaseController;
import io.hearstcorporation.atelier.controller.setting.CylinderController;
import io.hearstcorporation.atelier.controller.setting.DiamondShapeController;
import io.hearstcorporation.atelier.controller.setting.GemController;
import io.hearstcorporation.atelier.controller.setting.GlobalSettingController;
import io.hearstcorporation.atelier.controller.setting.LabourSettingController;
import io.hearstcorporation.atelier.controller.setting.MetalCaratageController;
import io.hearstcorporation.atelier.controller.setting.MetalController;
import io.hearstcorporation.atelier.controller.setting.ParameterController;
import io.hearstcorporation.atelier.controller.setting.PriceMetalNameController;
import io.hearstcorporation.atelier.controller.setting.PriceSettingController;
import io.hearstcorporation.atelier.controller.user.RoleController;
import io.hearstcorporation.atelier.controller.user.TokenController;
import io.hearstcorporation.atelier.controller.user.UserController;
import io.hearstcorporation.atelier.security.ROLE;
import io.hearstcorporation.atelier.security.service.AuthUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

@Slf4j
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfig {

    private final static String ALL_REGEX = "/**";
    private final static String ACTUATOR_HEALTH = "/actuator/health";
    private final static String API_DOCS_v3 = "/v3/api-docs" + ALL_REGEX;
    private final static String SWAGGER_UI = "/swagger-ui" + ALL_REGEX;

    @Bean
    public AuthUserJwtTokenConverter authenticationConverter(AuthUserService authUserService,
                                                             KeycloakProperties keycloakProperties) {
        return new AuthUserJwtTokenConverter(authUserService, keycloakProperties);
    }

    @Bean
    public SecurityFilterChain resourceServerSecurityFilterChain(HttpSecurity http,
                                                                 AuthUserJwtTokenConverter authenticationConverter,
                                                                 CorsConfigurationSource corsConfigurationSource,
                                                                 DelegatedAccessDeniedHandler delegatedAccessDeniedHandler) throws Exception {
        // ⚠️ SÉCURITÉ DÉSACTIVÉE - DÉVELOPPEMENT LOCAL UNIQUEMENT ⚠️
        log.warn("⚠️ AUTHENTICATION DISABLED - All endpoints are publicly accessible. DO NOT USE IN PRODUCTION!");
        
        http.oauth2ResourceServer(resourceServer ->
                resourceServer.jwt(jwtDecoder -> jwtDecoder.jwtAuthenticationConverter(authenticationConverter)));

        http.sessionManagement(sessions ->
                        sessions.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .csrf(AbstractHttpConfigurer::disable)
                .cors(corsConfigurer -> corsConfigurer.configurationSource(corsConfigurationSource));

        http.authorizeHttpRequests(requests -> {
            // Actuator
            requests.requestMatchers(HttpMethod.GET, ACTUATOR_HEALTH).permitAll()

                    // Spring Docs
                    .requestMatchers(API_DOCS_v3, SWAGGER_UI).permitAll()

                    // Dev Controller
                    .requestMatchers(DevController.BASE_URL + ALL_REGEX).permitAll()

                    // Token Controller
                    .requestMatchers(HttpMethod.GET, TokenController.BASE_URL + TokenController.CHECK_TOKEN).permitAll()

                    // User Controller
                    .requestMatchers(HttpMethod.POST, UserController.BASE_URL + UserController.PASSWORD_RESTORE).permitAll()
                    .requestMatchers(HttpMethod.POST, UserController.BASE_URL + UserController.PASSWORD_RESET).permitAll()
                    .requestMatchers(HttpMethod.POST, UserController.BASE_URL).permitAll()
                    .requestMatchers(HttpMethod.PUT, UserController.BASE_URL + UserController.USER_ID).permitAll()
                    .requestMatchers(HttpMethod.DELETE, UserController.BASE_URL + UserController.USER_ID).permitAll()
                    .requestMatchers(HttpMethod.PATCH, UserController.BASE_URL + UserController.ACTIVATE).permitAll()

                    // Administration Controllers
                    .requestMatchers(HttpMethod.POST, SupplierController.BASE_URL).permitAll()
                    .requestMatchers(HttpMethod.PUT, SupplierController.BASE_URL + SupplierController.SUPPLIER_ID).permitAll()
                    .requestMatchers(HttpMethod.DELETE, SupplierController.BASE_URL + SupplierController.SUPPLIER_ID).permitAll()

                    .requestMatchers(HttpMethod.POST, ClientController.BASE_URL).permitAll()
                    .requestMatchers(HttpMethod.PUT, ClientController.BASE_URL + ClientController.CLIENT_ID).permitAll()
                    .requestMatchers(HttpMethod.DELETE, ClientController.BASE_URL + ClientController.CLIENT_ID).permitAll()

                    // Role Controller
                    .requestMatchers(HttpMethod.GET, RoleController.BASE_URL).permitAll()

                    // Setting Controllers
                    .requestMatchers(HttpMethod.GET, GlobalSettingController.BASE_URL).permitAll()
                    .requestMatchers(HttpMethod.PUT, CylinderController.BASE_URL).permitAll()
                    .requestMatchers(HttpMethod.PUT, LabourSettingController.BASE_URL + LabourSettingController.HOURLY_RATE).permitAll()
                    .requestMatchers(HttpMethod.PUT, LabourSettingController.BASE_URL + LabourSettingController.COSTS).permitAll()
                    .requestMatchers(HttpMethod.PUT, MetalController.BASE_URL).permitAll()
                    .requestMatchers(HttpMethod.PUT, MetalCaratageController.BASE_URL).permitAll()
                    .requestMatchers(HttpMethod.PUT, PriceMetalNameController.BASE_URL).permitAll()
                    .requestMatchers(HttpMethod.PUT, PriceSettingController.BASE_URL).permitAll()
                    .requestMatchers(HttpMethod.PUT, DiamondShapeController.BASE_URL).permitAll()
                    .requestMatchers(HttpMethod.PUT, GemController.BASE_URL).permitAll()
                    .requestMatchers(HttpMethod.PUT, ParameterController.BASE_URL).permitAll()

                    // Files
                    .requestMatchers(HttpMethod.GET, AtelierFileController.BASE_URL + AtelierFileController.DOWNLOAD_FILE).permitAll()

                    //Inventory controllers
                    .requestMatchers(HttpMethod.POST, DiamondController.BASE_URL).permitAll()
                    .requestMatchers(HttpMethod.PUT, DiamondController.BASE_URL + DiamondController.DIAMOND_ID).permitAll()
                    .requestMatchers(HttpMethod.PATCH, DiamondController.BASE_URL + DiamondController.DIAMOND_ID + ALL_REGEX).permitAll()
                    .requestMatchers(HttpMethod.DELETE, DiamondController.BASE_URL + DiamondController.DIAMOND_ID).permitAll()

                    .requestMatchers(HttpMethod.POST, GemstoneController.BASE_URL).permitAll()
                    .requestMatchers(HttpMethod.PUT, GemstoneController.BASE_URL + GemstoneController.GEMSTONE_ID).permitAll()
                    .requestMatchers(HttpMethod.PATCH, GemstoneController.BASE_URL + GemstoneController.GEMSTONE_ID + ALL_REGEX).permitAll()
                    .requestMatchers(HttpMethod.DELETE, GemstoneController.BASE_URL + GemstoneController.GEMSTONE_ID).permitAll()

                    .requestMatchers(HttpMethod.POST, PureMetalPurchaseController.BASE_URL).permitAll()
                    .requestMatchers(HttpMethod.PUT, PureMetalPurchaseController.BASE_URL + PureMetalPurchaseController.PURE_METAL_PURCHASE_ID).permitAll()
                    .requestMatchers(HttpMethod.DELETE, PureMetalPurchaseController.BASE_URL + PureMetalPurchaseController.PURE_METAL_PURCHASE_ID).permitAll()

                    .requestMatchers(HttpMethod.POST, AlloyController.BASE_URL).permitAll()
                    .requestMatchers(HttpMethod.PUT, AlloyController.BASE_URL + AlloyController.ALLOY_ID).permitAll()
                    .requestMatchers(HttpMethod.DELETE, AlloyController.BASE_URL + AlloyController.ALLOY_ID).permitAll()

                    .requestMatchers(HttpMethod.POST, AlloyPurchaseController.BASE_URL).permitAll()
                    .requestMatchers(HttpMethod.PUT, AlloyPurchaseController.BASE_URL + AlloyPurchaseController.ALLOY_PURCHASE_ID).permitAll()
                    .requestMatchers(HttpMethod.DELETE, AlloyPurchaseController.BASE_URL + AlloyPurchaseController.ALLOY_PURCHASE_ID).permitAll()

                    .requestMatchers(HttpMethod.POST, AlloyedMetalController.BASE_URL).permitAll()
                    .requestMatchers(HttpMethod.PUT, AlloyedMetalController.BASE_URL + AlloyedMetalController.ALLOYED_METAL_ID).permitAll()
                    .requestMatchers(HttpMethod.DELETE, AlloyedMetalController.BASE_URL + AlloyedMetalController.ALLOYED_METAL_ID).permitAll()

                    .requestMatchers(HttpMethod.POST, AlloyedMetalPurchaseController.BASE_URL).permitAll()
                    .requestMatchers(HttpMethod.PUT, AlloyedMetalPurchaseController.BASE_URL + AlloyedMetalPurchaseController.ALLOYED_METAL_PURCHASE_ID).permitAll()
                    .requestMatchers(HttpMethod.DELETE, AlloyedMetalPurchaseController.BASE_URL + AlloyedMetalPurchaseController.ALLOYED_METAL_PURCHASE_ID).permitAll()

                    .requestMatchers(HttpMethod.POST, OtherMaterialController.BASE_URL).permitAll()
                    .requestMatchers(HttpMethod.PUT, OtherMaterialController.BASE_URL + OtherMaterialController.OTHER_MATERIAL_ID).permitAll()
                    .requestMatchers(HttpMethod.DELETE, OtherMaterialController.BASE_URL + OtherMaterialController.OTHER_MATERIAL_ID).permitAll()

                    .requestMatchers(HttpMethod.POST, OtherMaterialTransactionController.BASE_URL).permitAll()
                    .requestMatchers(HttpMethod.PUT, OtherMaterialTransactionController.BASE_URL + OtherMaterialTransactionController.OTHER_MATERIAL_TRANSACTION_ID).permitAll()
                    .requestMatchers(HttpMethod.DELETE, OtherMaterialTransactionController.BASE_URL + OtherMaterialTransactionController.OTHER_MATERIAL_TRANSACTION_ID).permitAll()

                    // Any Request - DÉSACTIVÉ POUR DEV LOCAL
                    .anyRequest().permitAll();
        });

        http.exceptionHandling(exception ->
                exception.accessDeniedHandler(delegatedAccessDeniedHandler));

        return http.build();
    }
}
