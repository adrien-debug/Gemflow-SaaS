package io.hearstcorporation.atelier.service.email.impl;

import io.hearstcorporation.atelier.service.email.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@ConditionalOnMissingBean(JavaMailSender.class)
public class EmailServiceStub implements EmailService {

    @Override
    public void sendNewUserEmail(String email, String firstName, String lastName, String link) {
        log.info("Send new user email: email={}, firstName={}, lastName={}, link={}", email, firstName, lastName, link);
    }

    @Override
    public void sendRestorePasswordEmail(String email, String firstName, String lastName, String link) {
        log.info("Send restore password email: email={}, firstName={}, lastName={}, link={}", email, firstName, lastName, link);
    }
}
