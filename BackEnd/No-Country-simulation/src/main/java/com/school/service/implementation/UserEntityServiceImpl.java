package com.school.service.implementation;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.school.exception.EmailServiceException;
import com.school.exception.ExpiredJwtException;
import com.school.exception.InvalidTokenException;
import com.school.persistence.entities.*;
import com.school.persistence.repository.*;
import com.school.rest.request.AuthLoginRequest;
import com.school.rest.request.AuthRegisterUserRequest;
import com.school.rest.response.LoginAuthResponse;
import com.school.service.interfaces.IUserService;
import com.school.utility.JwtUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class UserEntityServiceImpl implements UserDetailsService, IUserService {

    private final ParentRepository parentRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final AdminRepository adminRepository;
    private final UserEntityRepository userEntityRepository;
    private final RoleEntityRepository roleEntityRepository;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(UserEntityServiceImpl.class);


    public UserEntityServiceImpl(ParentRepository parentRepository, TeacherRepository teacherRepository, StudentRepository studentRepository, UserEntityRepository userEntityRepository, RoleEntityRepository roleEntityRepository, JwtUtils jwtUtils, PasswordEncoder passwordEncoder,
                                 AdminRepository adminRepository) {
        this.parentRepository = parentRepository;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
        this.userEntityRepository = userEntityRepository;
        this.roleEntityRepository = roleEntityRepository;
        this.jwtUtils = jwtUtils;
        this.passwordEncoder = passwordEncoder;
        this.adminRepository = adminRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Buscar usuario por email de usuario
        UserEntity userEntity = userEntityRepository.findUserEntityByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        // Lista para almacenar las autoridades del usuario
        List<SimpleGrantedAuthority> authorityList = new ArrayList<>();

        // Añadir roles del usuario a las autoridades
        userEntity.getRoles().forEach(role -> authorityList.add(new SimpleGrantedAuthority("ROLE_".concat(role.getRoleEnum().name()))));

        // Añadir permisos de los roles del usuario a las autoridades
        userEntity.getRoles().stream()
                .flatMap(role -> role.getPermissionList().stream())
                .forEach(permission -> authorityList.add(new SimpleGrantedAuthority(permission.getName())));

        // Crear y devolver UserDetails con la información del usuario y sus autoridades
        return new User(userEntity.getEmail(), userEntity.getPassword(), userEntity.isEnable(), userEntity.isAcconutNonExpired(), userEntity.isCredentialsNonExpired(), userEntity.isAccountNonLocked(), authorityList);
    }

    private Authentication authenticate(String email, String password) {
        UserDetails userDetails = loadUserByUsername(email);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username or password");
        }

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails.getUsername(), userDetails.getPassword(), userDetails.getAuthorities());
    }

    @Transactional
    @Override
    public Long registerUser(AuthRegisterUserRequest registerUserRequest, String password) {
        String email = registerUserRequest.getEmail();
        logger.info("Registering user password: " + password);
        if (userEntityRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Username is already in use");
        }

        List<String> roles = registerUserRequest.getRoleRequest().getRoleListName();
        Set<RoleEntity> roleEntities = new HashSet<>(roleEntityRepository.findRoleEntitiesByRoleEnumIn(roles));
        if (roleEntities.isEmpty()) {
            throw new IllegalArgumentException("Role not found");
        }

        UserEntity userEntity = UserEntity.builder()
                .email(email)
                .username(registerUserRequest.getUsername())
                .password(passwordEncoder.encode(password))
                .passwordChanged(false)
                .roles(roleEntities)
                .isEnable(true)
                .accountNonLocked(true)
                .acconutNonExpired(true)
                .credentialsNonExpired(true)
                .build();

        UserEntity registeredUser = userEntityRepository.save(userEntity);

        String profileType = registerUserRequest.getProfileType().toUpperCase();
        logger.info("Profile type: " + profileType);
        switch (profileType.toUpperCase()) {
            case "STUDENT":
                Student student = new Student();
                student.setUser(registeredUser);
                studentRepository.save(student);
                break;
            case "PARENT":
                Parent parent = new Parent();
                parent.setUser(registeredUser);
                parentRepository.save(parent);
                break;
            case "TEACHER":
                Teacher teacher = new Teacher();
                teacher.setUser(registeredUser);
                teacherRepository.save(teacher);
                break;
            case "ADMIN":
                Admin admin = new Admin();
                admin.setUser(registeredUser);
                adminRepository.save(admin);
                break;
            default:
                throw new IllegalArgumentException("Invalid profile type");
        }

        ArrayList<SimpleGrantedAuthority> authorityList = new ArrayList<>();
        registeredUser.getRoles().forEach(role -> authorityList.add(new SimpleGrantedAuthority("ROLE_".concat(role.getRoleEnum().name()))));
        registeredUser.getRoles().stream()
                .flatMap(role -> role.getPermissionList().stream())
                .forEach(permission -> authorityList.add(new SimpleGrantedAuthority(permission.getName())));

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(registeredUser.getEmail(), registeredUser.getPassword(), authorityList);
        String refreshToken = jwtUtils.createRefreshToken(authentication);

        // Guardar el refreshToken en el usuario registrado
        registeredUser.setRefreshToken(refreshToken);
        userEntityRepository.save(registeredUser);

        return registeredUser.getId();
    }

    @Transactional
    @Override
    public void updatePasswordToken(String token, String email) throws EmailServiceException {
        Optional<UserEntity> optionalUsuario = userEntityRepository.findUserEntityByEmail(email);

        if (optionalUsuario.isPresent()) {
            UserEntity user = optionalUsuario.get();
            user.setResetPasswordToken(token);  // Asigna el token al usuario
            userEntityRepository.save(user);    // Guarda el usuario actualizado en la base de datos
        } else {
            throw new EmailServiceException("User not found with email: " + email);
        }
    }

    @Override
    public UserEntity get(String resetPasswordToken) throws EmailServiceException {
        if (resetPasswordToken == null) {
            throw new EmailServiceException("Token not provided. Please request a new token.");
        }

        Optional<UserEntity> optionalUsuario = userEntityRepository.findByResetPasswordToken(resetPasswordToken);

        if (optionalUsuario.isPresent()) {
            return optionalUsuario.get(); // Retorna el usuario si el token es válido
        } else {
            throw new EmailServiceException("Invalid or expired token. Please request a new token.");
        }
    }

    @Transactional
    @Override
    public void updatePassword(UserEntity user, String password) {
        user.setPassword(new BCryptPasswordEncoder().encode(password));
        user.setResetPasswordToken(null);
        user.setPasswordChanged(true);
        userEntityRepository.save(user);
    }

    @Transactional
    public LoginAuthResponse loginUser(AuthLoginRequest userRequest) {
        String email = userRequest.email();
        String password = userRequest.password();

        Authentication authentication = authenticate(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String accessToken = jwtUtils.createToken(authentication);
        String refreshToken = jwtUtils.createRefreshToken((UsernamePasswordAuthenticationToken) authentication); //definir createRefreshToken en JwtUtils

        // Actualizar el refreshToken en el usuario
        UserEntity userEntity = userEntityRepository.findUserEntityByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + email));
        userEntity.setRefreshToken(refreshToken);
        userEntityRepository.save(userEntity);

        return new LoginAuthResponse(userEntity.getUsername(), "Successful login", accessToken, refreshToken, userEntity.getPasswordChanged());
    }

    @Transactional
    public LoginAuthResponse refreshToken(String oldRefreshToken) throws InvalidTokenException, ExpiredJwtException {
        DecodedJWT decodedJWT = jwtUtils.validateRefreshToken(oldRefreshToken);
        String username = decodedJWT.getSubject();
        UserEntity userEntity = userEntityRepository.findUserEntityByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

        String currentRefreshToken = userEntity.getRefreshToken();
        if (oldRefreshToken.equals(currentRefreshToken)) {
            List<GrantedAuthority> authorities = new ArrayList<>();
            userEntity.getRoles().forEach(role -> {
                authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getRoleEnum().name()));
                role.getPermissionList().forEach(permission ->
                        authorities.add(new SimpleGrantedAuthority(permission.getName())));
            });

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
            String newAccessToken = jwtUtils.createToken(authentication);
            String newRefreshToken = jwtUtils.createRefreshToken(authentication);

            userEntity.setRefreshToken(newRefreshToken);
            userEntityRepository.save(userEntity);

            return new LoginAuthResponse(userEntity.getUsername(), "Token refreshed successfully", newAccessToken, newRefreshToken, true);
        } else {
            throw new InvalidTokenException("Invalid refresh token");
        }
    }

    @Override
    public UserEntity findUserByEmail(String email) {
        return userEntityRepository.findUserEntityByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));
    }
}
