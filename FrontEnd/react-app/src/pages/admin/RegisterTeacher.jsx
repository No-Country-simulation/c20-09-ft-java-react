import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { registerTeacher } from "../../services/adminService";

const RegisterTeacher = () => {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subjects: [{ subjectCode: "", subjectName: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      // Preparar la dirección
      const address = {
        state: data.state,
        city: data.city,
        zipCode: data.zipCode,
        country: data.country,
        streetNameNumberDepartmentFloorAndNumber:
          data.streetNameNumberDepartmentFloorAndNumber,
      };

      // Preparar la información profesional
      const professionalInformation = {
        professorId: data.professorId,
        academicTitles: data.academicTitles,
        subjectCodeNameMap: data.subjects.reduce((acc, subject) => {
          if (subject.subjectCode && subject.subjectName) {
            acc[subject.subjectCode] = subject.subjectName;
          }
          return acc;
        }, {}),
        workingHours: data.workingHours,
        tutorship: data.tutorship === true,
        extracurricularClasses: data.extracurricularClasses === true,
      };

      // Preparar el objeto final
      const finalData = {
        name: data.nombre,
        lastName: data.apellido,
        dni: data.dni,
        phoneNumber: data.phoneNumber,
        email: data.email,
        emergencyContactName: data.emergencyContactName,
        emergencyNumber: data.emergencyNumber,
        address,
        dateOfBirth: data.dateOfBirth,
        professionalInformation,
      };

      // Llamar al servicio de registro y obtener la respuesta
      const response = await registerTeacher(finalData);

      // Asumir que la respuesta contiene la contraseña generada
      setPassword(response.password || data.password); // Ajusta esto si la estructura es diferente
      setRegistrationSuccess(true); // Marca el registro como exitoso

      toast({
        title: "Éxito",
        description: "Profesor registrado con éxito.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "No se pudo registrar al profesor.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setRegistrationSuccess(false); // Marca el registro como fallido
    }
  };

  return (
    <Container maxW="container.lg" py={8}>
      <Box
        bg="#f4f4f4"
        p={6}
        borderRadius="xl"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.9)"
      >
        <Heading as="h1" mb={6} textAlign="center" color="orange.500">
          Registro de Profesor
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap={4}
            mb={6}
          >
            {/* Información Personal */}
            <GridItem colSpan={2}>
              <Heading as="h3" size="md" mb={2} color="#34495e">
                Información Personal
              </Heading>
              <Divider mb={4} sx={{ borderBottom: "2px solid #E67E22" }} />
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.nombre} isRequired>
                <FormLabel htmlFor="nombre">Nombre/s</FormLabel>
                <Input
                  id="nombre"
                  type="text"
                  placeholder=""
                  {...register("nombre", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.nombre && (
                  <Text color="red.500">{errors.nombre.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.apellido} isRequired>
                <FormLabel htmlFor="apellido">Apellido/s</FormLabel>
                <Input
                  id="apellido"
                  type="text"
                  placeholder=""
                  {...register("apellido", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.apellido && (
                  <Text color="red.500">{errors.apellido.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.dateOfBirth} isRequired>
                <FormLabel htmlFor="dateOfBirth">Fecha de Nacimiento</FormLabel>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.dateOfBirth && (
                  <Text color="red.500">{errors.dateOfBirth.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.dni} isRequired>
                <FormLabel htmlFor="dni">DNI</FormLabel>
                <Input
                  id="dni"
                  type="text"
                  placeholder=""
                  {...register("dni", {
                    required: "Este campo es obligatorio",
                    pattern: {
                      value: /^[0-9]{8}$/,
                      message: "El DNI debe tener exactamente 8 dígitos",
                    },
                  })}
                />
                {errors.dni && (
                  <Text color="red.500">{errors.dni.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.phoneNumber} isRequired>
                <FormLabel htmlFor="phoneNumber">Celular:</FormLabel>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Ejemplo 1187693452"
                  {...register("phoneNumber", {
                    required: "Este campo es obligatorio",
                    maxLength: {
                      value: 10,
                      message:
                        "El número de teléfono no puede tener más de 10 dígitos",
                    },
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message:
                        "El número de teléfono debe tener exactamente 10 dígitos",
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <Text color="red.500">{errors.phoneNumber.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.email} isRequired>
                <FormLabel htmlFor="email">Correo electrónico</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder=""
                  {...register("email", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.email && (
                  <Text color="red.500">{errors.email.message}</Text>
                )}
              </FormControl>
            </GridItem>

            {/* Dirección */}
            <GridItem colSpan={2}>
              <Divider my={4} />
              <Heading as="h3" size="md" mb={2} color="#34495e">
                Dirección
              </Heading>
              <Divider mb={4} sx={{ borderBottom: "2px solid #E67E22" }} />
            </GridItem>
            <GridItem>
              <FormControl
                isInvalid={errors.streetNameNumberDepartmentFloorAndNumber}
                isRequired
              >
                <FormLabel htmlFor="streetNameNumberDepartmentFloorAndNumber">
                  Calle
                </FormLabel>
                <Input
                  id="streetNameNumberDepartmentFloorAndNumber"
                  type="text"
                  placeholder="Ej: Av. Corrientes 1234, Piso 2, Dpto A"
                  {...register("streetNameNumberDepartmentFloorAndNumber", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.streetNameNumberDepartmentFloorAndNumber && (
                  <Text color="red.500">
                    {errors.streetNameNumberDepartmentFloorAndNumber.message}
                  </Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.city} isRequired>
                <FormLabel htmlFor="city">Ciudad</FormLabel>
                <Input
                  id="city"
                  type="text"
                  placeholder=""
                  {...register("city", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.city && (
                  <Text color="red.500">{errors.city.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.state} isRequired>
                <FormLabel htmlFor="state">Provincia</FormLabel>
                <Input
                  id="state"
                  type="text"
                  placeholder=""
                  {...register("state", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.state && (
                  <Text color="red.500">{errors.state.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.zipCode} isRequired>
                <FormLabel htmlFor="zipCode">Código Postal</FormLabel>
                <Input
                  id="zipCode"
                  type="text"
                  placeholder=""
                  {...register("zipCode", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.zipCode && (
                  <Text color="red.500">{errors.zipCode.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.country} isRequired>
                <FormLabel htmlFor="country">País</FormLabel>
                <Input
                  id="country"
                  type="text"
                  placeholder=""
                  {...register("country", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.country && (
                  <Text color="red.500">{errors.country.message}</Text>
                )}
              </FormControl>
            </GridItem>

            {/* Información Profesional */}
            <GridItem colSpan={2}>
              <Divider my={4} />
              <Heading as="h3" size="md" mb={2} color="#34495e">
                Información Profesional
              </Heading>
              <Divider mb={4} sx={{ borderBottom: "2px solid #E67E22" }} />
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.professorId} isRequired>
                <FormLabel htmlFor="professorId">Matricula:</FormLabel>
                <Input
                  id="professorId"
                  type="text"
                  placeholder="MAT-2024-00123"
                  {...register("professorId", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.professorId && (
                  <Text color="red.500">{errors.professorId.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.academicTitles} isRequired>
                <FormLabel htmlFor="academicTitles">
                  Títulos Académicos:
                </FormLabel>
                <Input
                  id="academicTitles"
                  type="text"
                  placeholder=""
                  {...register("academicTitles", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.academicTitles && (
                  <Text color="red.500">{errors.academicTitles.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              {/* Materias */}
              {fields.map((field, index) => (
                <Box
                  key={field.id}
                  mb={4}
                  borderWidth={1}
                  borderRadius="md"
                  p={4}
                >
                  <FormLabel htmlFor={`subjects.${index}.subjectCode`}>
                    Asignatura/s que Imparte:
                  </FormLabel>
                  <Grid templateColumns="1fr 1fr" gap={4}>
                    <GridItem>
                      <FormControl
                        isInvalid={errors.subjects?.[index]?.subjectCode}
                      >
                        <FormLabel
                          htmlFor={`subjects.${index}.subjectCode`}
                        ></FormLabel>
                        <Input
                          id={`subjects.${index}.subjectCode`}
                          type="text"
                          placeholder="MAT-101, HIS-202"
                          {...register(`subjects.${index}.subjectCode`, {
                            required: "Este campo es obligatorio",
                          })}
                        />
                        {errors.subjects?.[index]?.subjectCode && (
                          <Text color="red.500">
                            {errors.subjects[index].subjectCode.message}
                          </Text>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl
                        isInvalid={errors.subjects?.[index]?.subjectName}
                      >
                        <FormLabel
                          htmlFor={`subjects.${index}.subjectName`}
                        ></FormLabel>
                        <Input
                          id={`subjects.${index}.subjectName`}
                          type="text"
                          placeholder=""
                          {...register(`subjects.${index}.subjectName`, {
                            required: "Este campo es obligatorio",
                          })}
                        />
                        {errors.subjects?.[index]?.subjectName && (
                          <Text color="red.500">
                            {errors.subjects[index].subjectName.message}
                          </Text>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <IconButton
                        aria-label="Eliminar materia"
                        icon={<CloseIcon />}
                        onClick={() => remove(index)}
                        colorScheme="orange"
                      />
                    </GridItem>
                  </Grid>
                </Box>
              ))}
              <Button
                mt={4}
                leftIcon={<AddIcon />}
                colorScheme="orange"
                onClick={() => append({ subjectCode: "", subjectName: "" })}
              >
                Añadir otra asignatura
              </Button>
            </GridItem>

            {/* Datos de Emergencia */}
            <Box>
              <Heading as="h3" size="md" mb={2}>
                Datos de Emergencia
              </Heading>
              <Divider mb={4} sx={{ borderBottom: "2px solid #E67E22" }} />
              <Grid
                templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                gap={4}
              >
                <GridItem colSpan={1}>
                  <FormControl isInvalid={errors.emergencyContactName}>
                    <FormLabel htmlFor="emergencyContactName">
                      Nombre del Contacto (emergencias):
                    </FormLabel>
                    <Input
                      id="emergencyContactName"
                      type="text"
                      placeholder=""
                      {...register("emergencyContactName")}
                    />
                    {errors.emergencyContactName && (
                      <Text color="red.500">
                        {errors.emergencyContactName.message}
                      </Text>
                    )}
                  </FormControl>
                </GridItem>

                <GridItem colSpan={1}>
                  <FormControl isInvalid={errors.emergencyNumber} isRequired>
                    <FormLabel htmlFor="emergencyNumber">
                      Celular (emergencias):
                    </FormLabel>
                    <Input
                      id="emergencyNumber"
                      type="tel"
                      placeholder="Ejemplo 1187693452"
                      {...register("emergencyNumber", {
                        required: "Este campo es obligatorio",
                        maxLength: {
                          value: 10,
                          message:
                            "El número de teléfono no puede tener más de 10 dígitos",
                        },
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message:
                            "El número de teléfono debe tener exactamente 10 dígitos",
                        },
                      })}
                    />
                    {errors.emergencyNumber && (
                      <Text color="red.500">
                        {errors.emergencyNumber.message}
                      </Text>
                    )}
                  </FormControl>
                </GridItem>
              </Grid>
            </Box>

            {/* Información Adicional */}
            <GridItem colSpan={2}>
              <Divider my={2} />
              <Heading as="h3" size="md" mb={2} color="#34495e">
                Información Adicional
              </Heading>
              <Divider mb={4} sx={{ borderBottom: "2px solid #E67E22" }} />
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.workingHours} isRequired>
                <FormLabel htmlFor="workingHours">Horas de Trabajo:</FormLabel>
                <Input
                  id="workingHours"
                  type="text"
                  placeholder=""
                  {...register("workingHours", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.workingHours && (
                  <Text color="red.500">{errors.workingHours.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormLabel htmlFor="workingHours">Disponibilidad:</FormLabel>
              <Checkbox id="tutorship" {...register("tutorship")}>
                Tutorías
              </Checkbox>

              <Checkbox
                id="extracurricularClasses"
                {...register("extracurricularClasses")}
              >
                Clases Extracurriculares
              </Checkbox>
            </GridItem>
          </Grid>
          <Button type="submit" colorScheme="orange" width="full" mt={4}>
            Registrar Profesor
          </Button>
        </form>
        {registrationSuccess && password && (
          <Box
            mt={4}
            p={4}
            borderWidth={1}
            borderRadius="md"
            borderColor="green.500"
            bg="green.50"
          >
            <Text color="green.800">
              ¡Registro exitoso! La contraseña generada es:{" "}
              <strong>{password}</strong>
            </Text>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default RegisterTeacher;
