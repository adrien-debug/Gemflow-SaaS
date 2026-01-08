package io.hearstcorporation.atelier.dto.model.user;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class UpdateRolePermissionsDto {
    
    @NotNull
    private Long roleId;
    
    @NotNull
    private List<PermissionUpdate> permissions;
    
    @Data
    public static class PermissionUpdate {
        @NotNull
        private Long permissionId;
        
        @NotNull
        private Boolean granted;
    }
}


