package com.school.service.interfaces;

import com.school.exception.EmailServiceException;

public interface IEmailService {

    void sendPasswordRecoveryEmail(String email, String resetPasswordLink) throws EmailServiceException;

    void sendPasswordChangeConfirmationEmail(String email) throws EmailServiceException;
}
