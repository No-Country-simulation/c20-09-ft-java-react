package com.school.confing;

import com.school.service.dto.AdminRegistrationDto;
import com.school.service.implementation.AdminServiceImpl;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class AppInitializer {
    private final AdminServiceImpl adminService;
    private static final Logger logger = LoggerFactory.getLogger(AppInitializer.class);

    public AppInitializer(AdminServiceImpl adminService) {
        this.adminService = adminService;
    }

    @PostConstruct
    public void init() {

        AdminRegistrationDto adminDto = new AdminRegistrationDto();
        adminDto.setName("Super Admin");
        adminDto.setDni("12345678");
        adminDto.setEmail("admin@gmail.com");

        try {
            adminService.create(adminDto);
        } catch (Exception e) {
            logger.info("creating the default admin: {} {}", adminDto.getDni(), e.getMessage());

        }
    }
}
