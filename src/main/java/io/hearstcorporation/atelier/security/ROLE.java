package io.hearstcorporation.atelier.security;

import lombok.experimental.UtilityClass;

@UtilityClass
public class ROLE {

    public static final String SUPER_ADMIN = "SUPER_ADMIN";
    public static final String SUPER_ADMIN_AUTHORITY = "ROLE_SUPER_ADMIN";

    public static final String ADMIN = "ADMIN";
    public static final String ADMIN_AUTHORITY = "ROLE_ADMIN";

    public static final String EMPLOYEE = "EMPLOYEE";
    public static final String EMPLOYEE_AUTHORITY = "ROLE_EMPLOYEE";
}
