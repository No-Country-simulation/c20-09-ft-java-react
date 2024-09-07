package com.school.service.implementation;

import com.school.exception.EmailServiceException;
import com.school.service.interfaces.IEmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.UnsupportedEncodingException;

@Service
public class EmailServiceImpl implements IEmailService {
    private static final Logger log = LoggerFactory.getLogger(EmailServiceImpl.class);
    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    public EmailServiceImpl(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    @Value("spring.mail.username")
    private String emailSender;

    @Override
    public void sendPasswordRecoveryEmail(String email, String resetPasswordLink) throws EmailServiceException {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(emailSender, "Support");
            helper.setTo(email);
            helper.setSubject("Password Recovery Request");

            Context context = new Context();
            context.setVariable("resetPasswordLink", resetPasswordLink);
            String htmlContent = templateEngine.process("password-recovery", context);

            helper.setText(htmlContent, true);
            javaMailSender.send(message);
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new EmailServiceException("Failed to send password recovery email", e);
        }
    }

    @Override
    public void sendPasswordChangeConfirmationEmail(String email) throws EmailServiceException {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(emailSender, "Support");
            helper.setTo(email);
            helper.setSubject("Password Change Confirmation");

            Context context = new Context();
            context.setVariable("email", email);
            String htmlContent = templateEngine.process("password-change-confirmation", context);

            helper.setText(htmlContent, true);
            javaMailSender.send(message);
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new EmailServiceException("Failed to send password change confirmation email", e);
        }
    }
}
