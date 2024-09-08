package com.school.service.implementation;

import com.school.persistence.entities.Parent;
import com.school.persistence.repository.ParentRepository;
import com.school.persistence.repository.UserEntityRepository;
import com.school.service.dto.ParentRegistrationDto;
import com.school.utility.PasswordUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ParentServiceImpl{

    private final UserEntityRepository userEntityRepository;
    private final ParentRepository parentRepository;
    private final PasswordUtil passwordUtil;
    private final UserEntityServiceImpl userEntityService;
    private static final Logger logger = LoggerFactory.getLogger(ParentServiceImpl.class);

    @Autowired
    public ParentServiceImpl(UserEntityRepository userEntityRepository, ParentRepository parentRepository,
                             PasswordUtil passwordUtil, UserEntityServiceImpl userEntityService) {
        this.userEntityRepository = userEntityRepository;
        this.parentRepository = parentRepository;
        this.passwordUtil = passwordUtil;
        this.userEntityService = userEntityService;
    }

//    @Override
//    public AuthResponse registerUser(AuthRegisterUserRequest request) {
//        logger.info("Parent registered successfully: {}", request.toString());
//
//        // Generar contraseña
//        String rawPassword = passwordUtil.generatePassword(request.dni());
//
//        // Registrar usuario y obtener ID
//        Long idUser = userEntityService.registerUser(request, rawPassword);
//
//        // Buscar el Parent asociado al usuario registrado
//        Parent parent = parentRepository.findByUser(userEntityRepository.findById(idUser)
//                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + idUser)));
//
//        //TODO: Implement this method Parent
//        // Establecer teléfono de emergencia (Ejemplo de como setear un campo restantes)
//        parent.setEmergencyPhone("1165437777");
//
//        // Guardar cambios del Parent
//        parentRepository.save(parent);
//
//        // Retornar respuesta de autenticación
//        return new AuthResponse( request.email(),rawPassword,"Parent registered successfully",  "TBD", true);
//    }


    /*
     * Hice los cuatros metodos CRUD clasicos de una entidad
     * Hay que tomar los siguientes puntos a consideracion
     *
     * 1: El registro del usuario no tiene los componentes del anterior
     * registro de mas arriba porque no estoy familiarizado con el funcionamiento
     *
     * 2: Los metodos de buscar, editar y eliminar padres, los realicé con ID, pero se pueden cambiar por el DNI
     * O en su defecto agregar otra serie de mismos metodos pero cambiando el ID por DNI*/
    public boolean parentRegistration(ParentRegistrationDto parentRegistrationDto){

        Parent parent = new Parent();
        parent.setName(parentRegistrationDto.getName());
        parent.setLastName(parentRegistrationDto.getLastName());
        parent.setDni(parentRegistrationDto.getDni());
        parent.setPhoneNumber(parentRegistrationDto.getPhoneNumber());
        parent.setEmail(parentRegistrationDto.getEmail());
        parent.setAddress(parentRegistrationDto.getAddress());
        parent.setDateOfBirth(parentRegistrationDto.getDateOfBirth());
        parent.setEmergencyNumber(parentRegistrationDto.getEmergencyNumber());
        parent.setEmergencyContactName(parentRegistrationDto.getEmergencyContactName());

        parentRepository.save(parent);

        return true;
    }

    public Optional<Parent> findParentById(long id) throws ChangeSetPersister.NotFoundException {

        Optional<Parent> optionalParent = parentRepository.findById(id);

        if (optionalParent.isPresent()){
            return optionalParent;
        } else throw new ChangeSetPersister.NotFoundException();
    }

    public Optional<Parent> updateParentById(long id) throws ChangeSetPersister.NotFoundException {

        Optional<Parent> optionalParent = parentRepository.findById(id);

        if (optionalParent.isPresent()) {
            Parent existingStudent = optionalParent.get();
            /*
              Aqui irian los campos a actualizar del padre
              no se como tendriamos pensado hacerlo.
              */
            return Optional.of(parentRepository.save(existingStudent));
        } else throw new ChangeSetPersister.NotFoundException();
    }

    public void deleteParent(long id) throws ChangeSetPersister.NotFoundException {

        Optional<Parent> optionalParent = parentRepository.findById(id);

        if (optionalParent.isPresent()){
            parentRepository.deleteById(id);
        } else throw new ChangeSetPersister.NotFoundException();
    }
}
