package io.hearstcorporation.atelier.config.email;

import lombok.experimental.UtilityClass;

@UtilityClass
public class EmailTemplates {

    public static final String NEW_USER_EMAIL_SUBJECT = "Welcome to Atelier!";
    public static final String NEW_USER_EMAIL_TEMPLATE = """
            Hello %1$s %2$s!
            
            Thanks for joining Ateliery SaaS!
            Please, click the link below to proceed to a page where you'll be able to create your password:
            %3$s
            
            This link will only be valid for 24 hours. If it expires, please ask platform admin to resend it.
            
            Ateliery SaaS team
            """;

    public static final String RESTORE_PASSWORD_EMAIL_SUBJECT = "Restore Password";
    public static final String RESTORE_PASSWORD_EMAIL_TEMPLATE = """
            Hello %1$s %2$s!
            
            We received a request to reset your password. Please, click the link below to specify a new one:
            %3$s
            
            This link will only be valid for 24 hours. If it expires you can request a new one from Restore Password page.
            
            If you received this email by mistake you can safely ignore it. Your password won't be changed.
            
            Ateliery SaaS team
            """;
}
