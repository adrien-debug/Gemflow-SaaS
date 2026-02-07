package io.hearstcorporation.atelier.config.email;

import io.hearstcorporation.atelier.config.email.property.EmailProperties;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
@EnableConfigurationProperties(EmailProperties.class)
@ConditionalOnProperty(prefix = "email", name = "enable", havingValue = "true")
public class EmailConfig {

    private static final String SMTP_AUTH_PROPERTY = "mail.smtp.auth";
    private static final String SMTP_STARTTLS_ENABLE_PROPERTY = "mail.smtp.starttls.enable";

    @Bean
    public JavaMailSender javaMailSender(EmailProperties emailProperties) {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(emailProperties.getHost());
        mailSender.setPort(emailProperties.getPort());
        mailSender.setProtocol(emailProperties.getProtocol());

        mailSender.setUsername(emailProperties.getUsername());
        mailSender.setPassword(emailProperties.getPassword());

        Properties props = mailSender.getJavaMailProperties();
        props.put(SMTP_AUTH_PROPERTY, true);
        props.put(SMTP_STARTTLS_ENABLE_PROPERTY, true);

        return mailSender;
    }
}
