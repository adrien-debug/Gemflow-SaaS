package io.hearstcorporation.atelier.service.email;

public interface EmailService {

    void sendNewUserEmail(String email, String firstName, String lastName, String link);

    void sendRestorePasswordEmail(String email, String firstName, String lastName, String link);
}
