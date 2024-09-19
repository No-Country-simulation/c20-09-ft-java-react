package com.school.data;

import com.school.security.RoleSetup;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class DataLoader {
    private final RoleSetup roleSetup;

    public DataLoader(RoleSetup roleSetup) {
        this.roleSetup = roleSetup;
    }

    @Bean
    public ApplicationRunner init() {
        return args -> roleSetup.setupRoles();
    }
}
