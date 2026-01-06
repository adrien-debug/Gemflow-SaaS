package io.hearstcorporation.atelier.service.email.impl;

import io.hearstcorporation.atelier.config.email.EmailTemplates;
import io.hearstcorporation.atelier.config.email.property.EmailProperties;
import io.hearstcorporation.atelier.exception.EmailException;
import io.hearstcorporation.atelier.service.email.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
@ConditionalOnBean(JavaMailSender.class)
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final EmailProperties emailProperties;

    @Override
    public void sendNewUserEmail(String email, String firstName, String lastName, String link) {
        String text = EmailTemplates.NEW_USER_EMAIL_TEMPLATE.formatted(firstName, lastName, link);
        sendEmail(email, EmailTemplates.NEW_USER_EMAIL_SUBJECT, text);
    }

    @Override
    public void sendRestorePasswordEmail(String email, String firstName, String lastName, String link) {
        String text = EmailTemplates.RESTORE_PASSWORD_EMAIL_TEMPLATE.formatted(firstName, lastName, link);
        sendEmail(email, EmailTemplates.RESTORE_PASSWORD_EMAIL_SUBJECT, text);
    }

    private void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(emailProperties.getSender());
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        try {
            mailSender.send(message);
        } catch (Exception e) {
            String errorMessage = "Error sending email";
            log.error(errorMessage, e);
            throw new EmailException(errorMessage);
        }
    }
}
