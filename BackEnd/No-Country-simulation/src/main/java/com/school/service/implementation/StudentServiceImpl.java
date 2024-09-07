package com.school.service.implementation;

import com.school.persistence.entities.Student;
import com.school.persistence.repository.StudentRepository;
import com.school.persistence.repository.UserEntityRepository;
import com.school.service.dto.StudentRegistrationDto;
import com.school.utility.PasswordUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentServiceImpl {

    private final PasswordUtil passwordUtil;
    private final UserEntityServiceImpl userEntityService;
    private final UserEntityRepository userEntityRepository;
    private final StudentRepository studentRepository;
    private static final Logger logger = LoggerFactory.getLogger(StudentServiceImpl.class);

    public StudentServiceImpl(PasswordUtil passwordUtil,
                              UserEntityServiceImpl userEntityService,
                              UserEntityRepository userEntityRepository,
                              StudentRepository studentRepository) {

        this.passwordUtil = passwordUtil;
        this.userEntityService = userEntityService;
        this.userEntityRepository = userEntityRepository;
        this.studentRepository = studentRepository;
    }

//    @Override
//    public AuthResponse registerUser(AuthRegisterUserRequest request) {
//        logger.info("Parent registered successfully: {}", request.toString());
//
//        String rawPassword = passwordUtil.generatePassword(request.dni());
//
//        //TODO: Implement this method Student ver servicio ParentServiceImpl para referencia
//        userEntityService.registerUser(request, rawPassword);
//
//        return new AuthResponse( request.email(),rawPassword,"Student registered successfully",  "TBD", true);
//    }

    /*
    * Hice los cuatros metodos CRUD clasicos de una entidad
    * Hay que tomar los siguientes puntos a consideracion
    *
    * 1: El registro del usuario no tiene los componentes del anterior
    * registro de mas arriba porque no estoy familiarizado con el funcionamiento
    *
    * 2: Los metodos de buscar, editar y eliminar estudiantes, los realicé con ID, pero se pueden cambiar por el DNI
    * o en su defecto agregar otra serie de mismos metodos pero cambiando el ID por DNI*/
    public boolean studentRegistration(StudentRegistrationDto studentRegistrationDto){

        Student student = new Student();
        student.setName(studentRegistrationDto.getName());
        student.setLastName(studentRegistrationDto.getLastName());
        student.setDni(studentRegistrationDto.getDni());
        student.setPhoneNumber(studentRegistrationDto.getPhoneNumber());
        student.setEmail(studentRegistrationDto.getEmail());
        student.setAddress(studentRegistrationDto.getAddress());
        student.setDateOfBirth(studentRegistrationDto.getDateOfBirth());
        student.setEmergencyNumber(studentRegistrationDto.getEmergencyNumber());
        student.setEmergencyContactName(studentRegistrationDto.getEmergencyContactName());
        student.setMedicalInformation(studentRegistrationDto.getMedicalInformation());

        studentRepository.save(student);

        return true;
    }

    public Optional<Student> findStudentById(StudentRegistrationDto studentRegistrationDto) throws ChangeSetPersister.NotFoundException {

        Optional<Student> optionalStudent = studentRepository.findById(studentRegistrationDto.getId());

        if (optionalStudent.isPresent()){
            return optionalStudent;
        } else throw new ChangeSetPersister.NotFoundException();
    }

    public Optional<Student> updateStudentById(StudentRegistrationDto studentRegistrationDto) throws ChangeSetPersister.NotFoundException {

        Optional<Student> optionalStudent = studentRepository.findById(studentRegistrationDto.getId());

        if (optionalStudent.isPresent()) {
            Student existingStudent = optionalStudent.get();
            /*
              Aqui irian los campos a actualizar del estudiante
              no se como tendriamos pensado hacerlo.
              */
            return Optional.of(studentRepository.save(existingStudent));
        } else throw new ChangeSetPersister.NotFoundException();
    }

    public void deleteStudent(StudentRegistrationDto studentRegistrationDto) throws ChangeSetPersister.NotFoundException {

        Optional<Student> optionalStudent = studentRepository.findById(studentRegistrationDto.getId());

        if (optionalStudent.isPresent()){
            studentRepository.deleteById(studentRegistrationDto.getId());
        } else throw new ChangeSetPersister.NotFoundException();
    }
}
