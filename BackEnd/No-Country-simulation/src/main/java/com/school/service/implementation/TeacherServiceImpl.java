package com.school.service.implementation;

import com.school.persistence.entities.Teacher;
import com.school.persistence.repository.TeacherRepository;
import com.school.service.dto.TeacherRegistrationDto;
import com.school.utility.PasswordUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TeacherServiceImpl{

    private final PasswordUtil passwordUtil;
    private final UserEntityServiceImpl userEntityService;
    private final TeacherRepository teacherRepository;
    private static final Logger logger = LoggerFactory.getLogger(TeacherServiceImpl.class);

    @Autowired
    public TeacherServiceImpl(PasswordUtil passwordUtil, UserEntityServiceImpl userEntityService, TeacherRepository teacherRepository) {
        this.passwordUtil = passwordUtil;
        this.userEntityService = userEntityService;
        this.teacherRepository = teacherRepository;
    }

//    @Override
//    public AuthResponse registerUser(AuthRegisterUserRequest request) {
//        logger.info("Parent registered successfully: {}", request.toString());
//
//        String rawPassword = passwordUtil.generatePassword(request.dni());
//
//        //TODO: Implement this method Teacher ver servicio ParentServiceImpl para referencia
//        userEntitylService.registerUser(request, rawPassword);
//
//        return new AuthResponse( request.email(),rawPassword,"Teacher registered successfully",  "TBD", true);
//    }


    /*
     * Hice los cuatros metodos CRUD clasicos de una entidad
     * Hay que tomar los siguientes puntos a consideracion
     *
     * 1: El registro del usuario no tiene los componentes del anterior
     * registro de mas arriba porque no estoy familiarizado con el funcionamiento
     *
     * 2: Los metodos de buscar, editar y eliminar profesores, los realicé con ID, pero se pueden cambiar por el DNI
     * O en su defecto agregar otra serie de mismos metodos pero cambiando el ID por DNI*/
    public boolean teacherRegistration(TeacherRegistrationDto teacherRegistrationDto){

        Teacher teacher = new Teacher();
        teacher.setName(teacherRegistrationDto.getName());
        teacher.setLastName(teacherRegistrationDto.getLastName());
        teacher.setDni(teacherRegistrationDto.getDni());
        teacher.setPhoneNumber(teacherRegistrationDto.getPhoneNumber());
        teacher.setEmail(teacherRegistrationDto.getEmail());
        teacher.setAddress(teacherRegistrationDto.getAddress());
        teacher.setDateOfBirth(teacherRegistrationDto.getDateOfBirth());
        teacher.setEmergencyNumber(teacherRegistrationDto.getEmergencyNumber());
        teacher.setEmergencyContactName(teacherRegistrationDto.getEmergencyContactName());
        teacher.setMedicalInformation(teacherRegistrationDto.getMedicalInformation());
        teacher.setProfesionalInformation(teacherRegistrationDto.getProfesionalInformation());

        teacherRepository.save(teacher);

        return true;
    }

    public Optional<Teacher> findTeacherById(long id) throws ChangeSetPersister.NotFoundException {

        Optional<Teacher> optionalTeacher = teacherRepository.findById(id);

        if (optionalTeacher.isPresent()){
            return optionalTeacher;
        } else throw new ChangeSetPersister.NotFoundException();
    }

    public Optional<Teacher> updateTeacherById(long id) throws ChangeSetPersister.NotFoundException {

        Optional<Teacher> optionalTeacher = teacherRepository.findById(id);

        if (optionalTeacher.isPresent()) {
            Teacher existingTeacher = optionalTeacher.get();
            /*
              Aqui irian los campos a actualizar del estudiante
              no se como tendriamos pensado hacerlo.
              */
            return Optional.of(teacherRepository.save(existingTeacher));
        } else throw new ChangeSetPersister.NotFoundException();
    }

    public void deleteTeacher(long id) throws ChangeSetPersister.NotFoundException {

        Optional<Teacher> optionalTeacher = teacherRepository.findById(id);

        if (optionalTeacher.isPresent()){
            teacherRepository.deleteById(id);
        } else throw new ChangeSetPersister.NotFoundException();
    }
}
