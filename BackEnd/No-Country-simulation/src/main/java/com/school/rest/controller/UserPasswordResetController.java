package com.school.rest.controller;

import com.school.rest.request.PasswordRecoveryRequest;
import com.school.rest.response.PasswordRecoveryResponse;
import com.school.rest.request.PasswordResetRequest;
import com.school.persistence.entities.UserEntity;
import com.school.exception.EmailServiceException;
import com.school.service.interfaces.IEmailService;
import com.school.service.interfaces.IUserService;
import jakarta.validation.Valid;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserPasswordResetController {
    private final IEmailService emailServiceImpl;
    private final IUserService userServiceImpl;

    @Value("${frontend.url}")
    private String frontendUrl;

    public UserPasswordResetController(IEmailService emailServiceImpl, IUserService userServiceImpl) {
        this.emailServiceImpl = emailServiceImpl;
        this.userServiceImpl = userServiceImpl;
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<PasswordRecoveryResponse> initiatePasswordRecovery(@Valid @RequestBody PasswordRecoveryRequest request) {
        String token = RandomString.make(45);
        try {
            userServiceImpl.updatePasswordToken(token, request.email());
            String resetPasswordLink = frontendUrl + "/reset_password?token=" + token;
            emailServiceImpl.sendPasswordRecoveryEmail(request.email(), resetPasswordLink);
            return ResponseEntity.ok(new PasswordRecoveryResponse("Password recovery email sent."));
        } catch (EmailServiceException e) {
            throw new RuntimeException("Error processing password recovery request", e);
        }
    }

    @GetMapping("/reset_password")
    public ResponseEntity<PasswordRecoveryResponse> processResetPassword(@RequestParam(value = "token") String token) {
        try {
            UserEntity user = userServiceImpl.get(token);
            if (user == null) {
                return ResponseEntity.badRequest().body(new PasswordRecoveryResponse("Invalid token. Please request a new one."));
            }
            return ResponseEntity.ok(new PasswordRecoveryResponse("Valid token. You may proceed to reset your password.", token));
        } catch (EmailServiceException e) {
            throw new RuntimeException("Error processing reset password request", e);
        }
    }

    @PostMapping("/reset_password")
    public ResponseEntity<PasswordRecoveryResponse> finalizePasswordReset(@Valid @RequestBody PasswordResetRequest request) {
        try {
            UserEntity user = userServiceImpl.get(request.token());
            if (user == null) {
                return ResponseEntity.badRequest().body(new PasswordRecoveryResponse("Invalid token."));
            }
            userServiceImpl.updatePassword(user, request.password());
            emailServiceImpl.sendPasswordChangeConfirmationEmail(user.getEmail());
            return ResponseEntity.ok(new PasswordRecoveryResponse("Password successfully changed. You can now log in."));
        } catch (EmailServiceException e) {
            throw new RuntimeException("Error finalizing password reset", e);
        }
    }
}
